<template>
  <div
    v-if="!isLoading && currentServiceRequest.name"
    class="h-auto bg-white dark:bg-slate-800 dark:text-white py-5 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8"
  >
    <div class="sm:flex sm:items-top mb-6">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Remove deployment resources
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          v-if="currentServiceRequest.status !== Status.PendingDelete"
          type="button"
          class="btn-outline btn-blue"
          :class="!isReadyRemove? 'opacity-50 cursor-not-allowed' : ''"
          :disabled="!isReadyRemove"
          @click="isDeleteConfirmationDialogOpen = true"
        >
          Remove
          <ArrowDownOnSquareIcon class="ml-3 h-5 w-5" />
        </button>
      </div>
    </div>

    <div class="pb-2">
      <div class="sm:flex-auto">
        <p class="text-gray-700 dark:text-gray-200">
          Name
        </p>
        <h3 class="text-base font-semibold">
          {{ currentServiceRequest.name }}
        </h3>
      </div>
    </div>
    <div v-if="currentServiceRequest.currentRequestOwner" class="my-4">
      <p class="text-gray-500 dark:text-gray-200">
        Owner
      </p>
      <div class="flex items-center mt-1">
        <img
          v-if="currentServiceRequest.currentRequestOwner?.profilePictureLarge"
          class="h-16 w-16 rounded-full mr-2"
          :src="currentServiceRequest.currentRequestOwner?.profilePictureLarge"
          alt="user avatar"
        >
        <div class="flex-auto">
          <p class="font-bold">
            {{ currentServiceRequest.currentRequestOwner?.firstName }} {{ currentServiceRequest.currentRequestOwner?.lastName }}
          </p>
          <a
            :href="`mailto:${currentServiceRequest.currentRequestOwner?.email}`"
            class="text-blue-600 dark:text-blue-300 text-xs underline"
          >{{ currentServiceRequest.currentRequestOwner?.email }}</a>
        </div>
      </div>
    </div>
    <div class="flex my-6">
      <div>
        <p class="text-gray-700 dark:text-gray-200">
          Status
        </p>
        <h4 class="text-medium font-semibold">
          {{ DisplayText.getStatusDisplayText(currentServiceRequest.status) }}
        </h4>
      </div>
      <div class="ml-14">
        <p class="text-gray-700 dark:text-gray-200">
          Pending state
        </p>
        <h4 class="text-medium font-semibold">
          {{ currentServiceRequest.pendingState }}
        </h4>
      </div>
      <div class="ml-14">
        <p class="text-gray-700 dark:text-gray-200">
          Expiration
        </p>
        <h4 class="text-medium font-semibold">
          {{ currentServiceRequest.expirationDateUtc === null ? 'Never' : DateTime.fromISO(currentServiceRequest.expirationDateUtc).toLocaleString(DateTime.DATE_FULL) }}
        </h4>
      </div>
    </div>

    <div v-if="currentServiceRequest.requestedResources.length > 0" class="my-4">
      <h4 class="text-gray-700 dark:text-gray-200 mb-2">
        Requested resources
      </h4>
      <div class="mt-2">
        <span
          v-for="(resource, index) in currentServiceRequest.requestedResources"
          :key="index"
          class="relative mx-2"
          @click="openDetailDialog(index, 'requested')"
        >
          <span
            class="rounded-md px-3 py-1 italic bg-slate-400 text-slate-50 text-sm cursor-pointer relative"
          >
            {{ resource.resourceType }}
          </span>
        </span>
      </div>
    </div>

    <div v-if="currentServiceRequest.deployedResources.length > 0" class="mt-6 w-[750px]">
      <h4 class="text-gray-700 dark:text-gray-200 mb-2">
        Deployed resources
      </h4>
      <ul>
        <li v-for="(resource, index) in currentServiceRequest.deployedResources" :key="index">
          <div class="max-w-sm w-full lg:max-w-full lg:flex mb-4 border border-gray-400 lg:border-t lg:border-gray-400">
            <div class="h-42 w-32 flex items-center justify-center p-6">
              <img :src="getResourceImage(resource.resourceType)">
            </div>
            <div class=" bg-white dark:bg-slate-800 rounded-b flex-1 lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div class="mb-2">
                <div class="text-gray-900 dark:text-gray-200 font-bold text-xl">
                  {{ resource.name }}
                </div>
                <p v-if="resource.description" class="text-gray-700 dark:text-gray-200 text-base">
                  {{ resource.description }}
                </p>
              </div>
              <template v-if="resource.removedDateUtc">
                <div
                  class="text-xs inline-flex w-fit items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full mb-3"
                >
                  Removed
                </div>
              </template>
              <template v-else>
                <div class="flex mb-2">
                  <div class="flex items-center h-5">
                    <input
                      id="helper-checkbox"
                      v-model="confirmRemove[index]"
                      aria-describedby="helper-checkbox-text"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                      @change="handleRemoveResource(resource.id!)"
                    >
                  </div>
                  <div class="ml-2 text-sm">
                    <label for="helper-checkbox" class="font-medium text-gray-900 dark:text-gray-300">Confirm to remove</label>
                    <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">
                      I have removed this resource or verified it is still required
                    </p>
                  </div>
                </div>
              </template>
              <div class="flex items-center justify-between">
                <div class="text-xs">
                  <p class="text-gray-500 dark:text-gray-200 leading-none">
                    {{ resource.removedDateUtc? `by ${resource.removedBy?.email}` : `Deployed by ${resource.deployedBy?.email}` }}
                  </p>
                  <p class="text-gray-500 dark:text-gray-200">
                    {{ resource.removedDateUtc? DateTime.fromISO(resource.removedDateUtc).toRelative(): DateTime.fromISO(resource.createdDateUtc).toRelative() }}
                  </p>
                </div>
                <div>
                  <button class="cursor-pointer underline text-blue-600 dark:text-gray-200" @click="openDetailDialog(index, 'deployed')">
                    View details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <span v-if="isLoading" />
    <span v-else>Service request not found</span>
  </div>

  <DetailResourceDialog
    :open="isRequestedDialogOpen"
    :resources="currentServiceRequest.requestedResources"
    :detail-key="detailResourceKey"
    @close="isRequestedDialogOpen = false"
  />
  <DeployedResourceDialog
    :open="isDeployedDialogOpen"
    :readonly="true"
    :resource="currentServiceRequest.deployedResources[detailResourceKey]"
    @close="isDeployedDialogOpen = false"
    @updated="isDeployedDialogOpen = false"
  />
  <DeleteConfirmationDialog
    message="delete this service request"
    :open="isDeleteConfirmationDialogOpen"
    @close="isDeleteConfirmationDialogOpen = false"
    @deleted="handleSaveSR"
  />
</template>

<script setup lang="ts">
import { ArrowDownOnSquareIcon } from "@heroicons/vue/24/outline"
import { onMounted, ref, computed } from "vue"
import { DateTime } from "luxon"
import { useRouter } from "vue-router"

import DeployedResourceDialog from "@/components/dialogs/DeployedResource.vue"
import DeleteConfirmationDialog from "@/components/dialogs/DeleteConfirmation.vue"
import { useServiceStore } from "@/stores/serviceRequest"
import useApp from "@/composables/useApp"
import useService from "@/composables/useService"
import { Status, PendingState } from "@/models/serviceRequests/serviceRequestDetail"
import { DisplayText } from "@/services/displayText"
import { ResourceType } from "@/models/policies/policyDetail"
import DetailResourceDialog from "@/components/dialogs/DetailResource.vue"

const detailResourceKey = ref<number>(-1)
const isDeployedDialogOpen = ref(false)
const isDeleteConfirmationDialogOpen = ref(false)

const isRequestedDialogOpen = ref(false)

const confirmRemove = ref<boolean[]>([])
const { fetchServiceRequestById, recordResourceRemoved, changeStatus } = useServiceStore()
const { currentServiceRequest } = useService()
const { isLoading } = useApp()
const router = useRouter()

const props = defineProps<{
  id: string
}>()

onMounted(() => {
  fetchServiceRequestById(props.id).then(() => {
    if (currentServiceRequest.value.status !== Status.ReadyToRemove && currentServiceRequest.value.status !== Status.Expired) router.push("/service-requests")
    for (const resource of currentServiceRequest.value.deployedResources) {
      if (resource.removedDateUtc) { confirmRemove.value.push(true) } else confirmRemove.value.push(false)
    }
  })
})

const openDetailDialog = (index: number, type: string) :void => {
  detailResourceKey.value = index
  if (type === "requested") {
    isRequestedDialogOpen.value = true
  } else {
    isDeployedDialogOpen.value = true
  }
}
const handleRemoveResource = (resourceId: string) => {
  recordResourceRemoved(currentServiceRequest.value.id, resourceId)
  isDeleteConfirmationDialogOpen.value = false
}

const handleSaveSR = () => {
  isDeleteConfirmationDialogOpen.value = false
  changeStatus(currentServiceRequest.value.id, Status.PendingDelete, PendingState.None).then(() => {
    router.push("/deployments/ready-to-remove")
  })
}

const isReadyRemove = computed(() => {
  for (const value of confirmRemove.value) {
    if (!value) return false
  }
  return true
})

const getResourceImage = (resourceType: ResourceType | null) :string => {
  if (resourceType === null) {
    return "/images/resources/file-circle-question.svg"
  }
  switch (resourceType) {
    case ResourceType.Analytics: return "/images/resources/chart-mixed.svg"
    case ResourceType.Blockchain: return "/images/resources/bitcoin-sign.svg"
    case ResourceType.Compute: return "/images/resources/server.svg"
    case ResourceType.Container: return "/images/resources/docker.svg"
    case ResourceType.Database: return "/images/resources/database.svg"
    case ResourceType.DeveloperTool: return "/images/resources/code.svg"
    case ResourceType.DevOps: return "/images/resources/terminal.svg"
    case ResourceType.Email: return "/images/resources/envelope.svg"
    case ResourceType.Identity: return "/images/resources/fingerprint.svg"
    case ResourceType.Integration: return "/images/resources/object-intersect.svg"
    case ResourceType.ManagementTool: return "/images/resources/toolbox.svg"
    case ResourceType.Media: return "/images/resources/photo-film-music.svg"
    case ResourceType.Migration: return "/images/resources/truck-moving.svg"
    case ResourceType.Networking: return "/images/resources/network-wired.svg"
    case ResourceType.Security: return "/images/resources/lock-keyhole.svg"
    case ResourceType.Software: return "/images/resources/binary.svg"
    case ResourceType.Storage: return "/images/resources/container-storage.svg"
    case ResourceType.Web: return "/images/resources/browser.svg"
    case ResourceType.Other: return "/images/resources/file-circle-question.svg"
    default: return "/images/resources/file-circle-question.svg"
  }
}

</script>
