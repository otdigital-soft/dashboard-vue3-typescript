<template>
  <div
    v-if="!isLoading && currentServiceRequest.name"
    class="h-auto bg-white dark:bg-slate-800 dark:text-white py-5 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8"
  >
    <div class="sm:flex sm:items-top mb-6">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Manage deployment
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          class="btn-outline btn-blue"
          type="button"
          @click="handleSubmit"
        >
          Save
          <ArrowDownOnSquareIcon class="ml-3 h-5 w-5" />
        </button>
      </div>
    </div>

    <div>
      <div class="sm:flex-auto text-gray-500 dark:text-gray-200">
        <p>Name</p>
        <h3 class="text-base font-semibold">
          {{ currentServiceRequest.name }}
        </h3>
      </div>
    </div>
    <div class="my-10">
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
    <div class="flex my-10">
      <div>
        <p class="text-gray-500 dark:text-gray-200">
          Status
        </p>
        <Field
          id="status"
          v-model="currentServiceRequest.status"
          name="status"
          as="select"
          rules="required"
          class="mt-1 block w-full pl-3 h-10 pr-10 bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="" disabled>
            Select
          </option>
          <option value="DeploymentInProgress">
            Deployment in progress
          </option>
          <option value="DeploymentComplete">
            Deployment complete
          </option>
        </Field>
      </div>
      <div class="ml-14">
        <p class="text-gray-500 dark:text-gray-200">
          Pending state
        </p>
        <h4 class="text-medium font-semibold">
          {{ currentServiceRequest.pendingState }}
        </h4>
      </div>
      <div class="ml-14">
        <p class="text-gray-500 dark:text-gray-200">
          Expiration
        </p>
        <h4 class="text-medium font-semibold">
          {{ getExpirationDisplay() }}
        </h4>
      </div>
    </div>

    <div v-if="currentServiceRequest.requestedResources.length > 0" class="mt-4">
      <p class="text-gray-500 dark:text-gray-200">
        Requested resources
      </p>
      <div class="mt-2">
        <span
          v-for="(resource, index) in currentServiceRequest.requestedResources"
          :key="index"
          class="relative mx-2"
          @click="openDetailDialog(index)"
        >
          <span
            class="rounded-md px-3 py-1 italic bg-slate-400 text-slate-50 text-sm cursor-pointer relative"
          >
            {{ resource.resourceType }}
          </span>
        </span>
      </div>
    </div>
    <div class="mt-6">
      <TabGroup
        :selected-index="1"
      >
        <TabList
          class="-mb-px flex space-x-12 border-b border-gray-200 dark:border-gray-400"
        >
          <Tab
            v-slot="{selected}"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="
                selected
                  ? 'border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
              "
            >
              <ClipboardDocumentListIcon class="-ml-0.5 mr-2 h-5 w-5" />
              <span>Review Status</span>
            </button>
          </Tab>
          <Tab
            v-slot="{selected}"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="
                selected
                  ? 'border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
              "
            >
              <CircleStackIcon class="-ml-0.5 mr-2 h-5 w-5" />
              <span>Deployed Resources</span>
            </button>
          </Tab>
          <Tab
            v-slot="{selected}"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="
                selected
                  ? 'border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
              "
            >
              <CalendarIcon class="-ml-0.5 mr-2 h-5 w-5" />
              <span>Events</span>
            </button>
          </Tab>
          <Tab
            v-slot="{selected}"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="
                selected
                  ? 'border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
              "
            >
              <DocumentChartBarIcon class="-ml-0.5 mr-2 h-5 w-5" />
              <span>History</span>
            </button>
          </Tab>
        </TabList>
        <TabPanels class="pt-4">
          <TabPanel>
            <ReviewTab
              :reviewer-responses="currentServiceRequest.reviewResponses"
            />
          </TabPanel>
          <TabPanel>
            <ResourcesDisplay
              :id="currentServiceRequest.id"
              :readonly="false"
              :resources="currentServiceRequest.deployedResources"
              @update="updateDeployedResource"
              @remove="removeDeployedResource"
            />
            <button
              class="mt-6 border flex justify-center hover:bg-gray-600 text-gray-500 dark:hover:bg-gray-400 border-gray-500 dark:border-gray-400 rounded bg-white
          hover:text-white dark:text-gray-200 dark:bg-gray-600 dark:hover:text-gray-100 px-3 py-1"
              @click.prevent="isAddResourceDialogOpen = true"
            >
              <PlusCircleIcon class="w-5 h-5 mr-1" /> Add deployed resource
            </button>
          </TabPanel>
          <TabPanel>
            <EventDisplay :events="currentServiceRequest.events" />
          </TabPanel>
          <TabPanel>
            <ChangeListDisplay
              :changes="currentServiceRequest.changeList"
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
  <div v-else>
    <span v-if="isLoading" />
    <span v-else>Service request not found</span>
  </div>
  <DetailResourceDialog
    :open="isDetailDialogOpen"
    :resources="currentServiceRequest.requestedResources"
    :detail-key="detailResourceKey"
    @close="isDetailDialogOpen = false"
  />
  <CreateDeployedResourceDialog
    :open="isAddResourceDialogOpen"
    @close="isAddResourceDialogOpen = false"
    @created="addDeployedResource"
  />
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { ClipboardDocumentListIcon, CircleStackIcon, PlusCircleIcon, DocumentChartBarIcon, CalendarIcon, ArrowDownOnSquareIcon } from "@heroicons/vue/24/outline"
import { Field } from "vee-validate"
import ReviewTab from "@/components/service/ReviewTab.vue"
import EventDisplay from "@/components/service/EventDisplay.vue"
import ResourcesDisplay from "@/components/service/ResourcesDisplay.vue"
import ChangeListDisplay from "@/components/service/ChangeListDisplay.vue"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import DetailResourceDialog from "@/components/dialogs/DetailResource.vue"
import CreateDeployedResourceDialog from "@/components/dialogs/CreateDeployedResource.vue"
import { useServiceStore } from "@/stores/serviceRequest"
import useApp from "@/composables/useApp"
import useService from "@/composables/useService"
import { Status } from "@/models/serviceRequests/serviceRequestDetail"
import { DateTime } from "luxon"
import { findIndex } from "ramda"
import type { DeployedResource } from "@/models/serviceRequests/deployedServiceRequest"

const detailResourceKey = ref<number>(-1)
const isDetailDialogOpen = ref(false)
const isAddResourceDialogOpen = ref(false)
const { fetchServiceRequestById, changeStatus, updateServiceRequest } = useServiceStore()
const { currentServiceRequest } = useService()
const { isLoading } = useApp()
const router = useRouter()

const props = defineProps<{
  id: string
}>()

onMounted(() => {
  fetchServiceRequestById(props.id).then(() => {
    if (currentServiceRequest.value.status === Status.ApprovalsComplete) {
      changeStatus(props.id, Status.DeploymentInProgress, currentServiceRequest.value.pendingState)
      currentServiceRequest.value.status = Status.DeploymentInProgress
    }
  })
})

const removeDeployedResource = (id: string) => {
  const resourceIndex = findIndex(u => u.id === id, currentServiceRequest.value.deployedResources)
  currentServiceRequest.value.deployedResources.splice(resourceIndex, 1)
}

const updateDeployedResource = (resource: DeployedResource) => {
  const resourceIndex = findIndex(u => u.id === resource.id, currentServiceRequest.value.deployedResources)
  currentServiceRequest.value.deployedResources[resourceIndex] = resource
}

const openDetailDialog = (index: number) => {
  detailResourceKey.value = index
  isDetailDialogOpen.value = true
}

const getExpirationDisplay = (): string => {
  if (currentServiceRequest.value.expirationDateSet) {
    if (currentServiceRequest.value.expirationDateUtc) {
      return DateTime.fromISO(currentServiceRequest.value.expirationDateUtc).toLocaleString(DateTime.DATE_FULL)
    } else {
      return "Never"
    }
  } else {
    return "Not Set"
  }
}

const addDeployedResource = (resource: DeployedResource) => {
  isAddResourceDialogOpen.value = false
  currentServiceRequest.value.deployedResources.push(resource)
}

const handleSubmit = () => {
  updateServiceRequest(currentServiceRequest.value.id, currentServiceRequest.value).then(() => {
    if (currentServiceRequest.value.status === Status.DeploymentComplete) {
      router.push("/deployments/pending")
    }
  })
}
</script>
