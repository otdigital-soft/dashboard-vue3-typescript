<template>
  <div
    v-if="!isLoading && currentServiceRequest.name"
    class="bg-white dark:bg-slate-800 dark:text-white px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6"
  >
    <div class="sm:flex sm:items-top mb-6">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Manage Service Request
        </h1>
      </div>
      <div v-if="isInRole('AccountAdmin') || isInRole('AccountOwner') || isInRole('Deployer') || currentServiceRequest.currentRequestOwner?.id == userInfo.id" class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          v-if="currentServiceRequest.status === Status.Draft"
          class="btn-outline btn-blue mr-2"
          type="button"
          @click="$router.push({ name: 'edit-service-request', params: { id } })"
        >
          Edit
          <PencilSquareIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          v-if="currentServiceRequest.status === Status.Draft"
          class="btn-outline btn-red mr-2"
          type="button"
          @click="isDeleteConfirmationDialogOpen = true"
        >
          Delete
          <TrashIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          v-if="currentServiceRequest.status === Status.WaitingForApprovals"
          class="btn-outline btn-warning mr-2"
          type="button"
          @click="isCancelReviewDialogOpen = true"
        >
          Cancel Review
          <XCircleIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          v-if="currentServiceRequest.status === 'DeploymentComplete'"
          class="btn-outline btn-blue mr-2"
          type="button"
          @click="isExtendDialogOpen = true"
        >
          Extend
          <ClockIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          v-if="currentServiceRequest.status === 'DeploymentComplete'"
          class="btn-outline btn-gray mr-2"
          type="button"
          @click="$router.push({ name: 'modify-service-request', params: { id } })"
        >
          Modify
          <PencilSquareIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          v-if="currentServiceRequest.status === 'DeploymentComplete'"
          class="btn-outline btn-gray mr-2"
          type="button"
          @click="isTransferDialogOpen = true"
        >
          Transfer
          <PaperAirplaneIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          v-if="currentServiceRequest.status === 'DeploymentComplete'"
          class="btn-outline btn-red"
          type="button"
          @click="isReleaseConfirmationDialogOpen = true"
        >
          Release
          <ScissorsIcon class="ml-3 h-5 w-5" />
        </button>
      </div>
    </div>

    <div class="mt-10 mb-8">
      <div class="sm:flex-auto text-gray-500 dark:text-gray-200">
        Name

        <h3 class="text-base font-semibold">
          {{ currentServiceRequest.name }}
        </h3>
      </div>
    </div>
    <div v-if="currentServiceRequest.currentRequestOwner" class="my-8">
      <p class="text-gray-500 dark:text-gray-200">
        Owner
      </p>
      <div class="flex items-center mt-1">
        <img
          v-if="currentServiceRequest.currentRequestOwner.profilePictureLarge"
          class="h-16 w-16 rounded-full mr-2"
          :src="currentServiceRequest.currentRequestOwner.profilePictureLarge"
          alt="user avatar"
        >
        <div class="flex-auto">
          <p class="font-bold">
            {{ currentServiceRequest.currentRequestOwner.firstName }} {{ currentServiceRequest.currentRequestOwner.lastName }}
          </p>
          <a
            :href="`mailto:${currentServiceRequest.currentRequestOwner.email}`"
            class="text-blue-600 dark:text-blue-300 text-xs underline"
          >{{ currentServiceRequest.currentRequestOwner.email }}</a>
        </div>
      </div>
    </div>

    <div class="flex my-8">
      <div>
        <p class="text-gray-500 dark:text-gray-200">
          Status
        </p>
        <h4 class="text-medium font-semibold">
          {{ DisplayText.getStatusDisplayText(currentServiceRequest.status) }}
        </h4>
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

    <div v-if="currentServiceRequest.requestedResources.length > 0" class="my-6">
      <p class="text-gray-500 dark:text-gray-200">
        Resources
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

    <TabGroup>
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
            :readonly="true"
            :resources="currentServiceRequest.deployedResources"
          />
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
  <div v-else>
    <div v-if="isLoading" />
    <div v-else>
      <h1 class="text-xl font-semibold">
        Service Request Not Found
      </h1>
      <p class="my-6">
        An active service request could not be found for this identifier.
      </p>
      <router-link to="/dashboard" class="btn-outline btn-blue">
        Back to dashboard
      </router-link>
    </div>
  </div>
  <DetailResourceDialog
    :open="isDetailDialogOpen"
    :resources="currentServiceRequest.requestedResources"
    :detail-key="detailResourceKey"
    @close="isDetailDialogOpen = false"
  />

  <CancelReviewDialog
    :open="isCancelReviewDialogOpen"
    @close="isCancelReviewDialogOpen = false"
    @cancel-review="cancelReview"
  />

  <DeleteConfirmationDialog
    message="delete this service request"
    :open="isDeleteConfirmationDialogOpen"
    @close="isDeleteConfirmationDialogOpen = false"
    @deleted="deleteRequest"
  />

  <ExtendServiceRequestDialog
    :open="isExtendDialogOpen"
    :unlimited-resource-lifetime="currentPolicy.unlimitedResourceLifetime"
    :resource-lifetime="currentPolicy.resourceLifetime"
    @close="isExtendDialogOpen = false"
    @extend="updateLifetime"
  />

  <TransferServiceRequestDialog
    :open="isTransferDialogOpen"
    @close="isTransferDialogOpen = false"
    @transfer="transferRequest"
  />

  <ReleaseServiceRequestDialog
    :open="isReleaseConfirmationDialogOpen"
    @close="isReleaseConfirmationDialogOpen = false"
    @released="releaseRequest"
  />
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import {
  PencilSquareIcon, ClockIcon, ScissorsIcon, ClipboardDocumentListIcon,
  TrashIcon, PaperAirplaneIcon, DocumentChartBarIcon, CalendarIcon, CircleStackIcon, XCircleIcon
} from "@heroicons/vue/24/outline"
import ReviewTab from "@/components/service/ReviewTab.vue"
import EventDisplay from "@/components/service/EventDisplay.vue"
import ResourcesDisplay from "@/components/service/ResourcesDisplay.vue"
import ChangeListDisplay from "@/components/service/ChangeListDisplay.vue"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { DisplayText } from "@/services/displayText"

import CancelReviewDialog from "@/components/dialogs/CancelReview.vue"
import DetailResourceDialog from "@/components/dialogs/DetailResource.vue"
import DeleteConfirmationDialog from "@/components/dialogs/DeleteConfirmation.vue"
import ExtendServiceRequestDialog from "@/components/dialogs/ExtendServiceRequest.vue"
import ReleaseServiceRequestDialog from "@/components/dialogs/ReleaseServiceRequest.vue"
import TransferServiceRequestDialog from "@/components/dialogs/TransferServiceRequest.vue"
import { useServiceStore } from "@/stores/serviceRequest"
import { usePolicyStore } from "@/stores/policy"
import useUser from "@/composables/useUser"
import useApp from "@/composables/useApp"
import useService from "@/composables/useService"
import usePolicy from "@/composables/usePolicy"
import { PendingState, Status } from "@/models/serviceRequests/serviceRequestDetail"
import type { LifetimeUpdate } from "@/models/policies/policyDetail"
import type { SimpleUser } from "@/models/simpleUser"
import { useToast } from "vue-toastification"
import { DateTime } from "luxon"

const router = useRouter()
const detailResourceKey = ref<number>(-1)
const isDetailDialogOpen = ref(false)
const isDeleteConfirmationDialogOpen = ref(false)
const isExtendDialogOpen = ref(false)
const isTransferDialogOpen = ref(false)
const isCancelReviewDialogOpen = ref(false)
const isReleaseConfirmationDialogOpen = ref(false)
const { fetchServiceRequestById, changeStatus, updateServiceRequest, cancelServiceRequestReview } = useServiceStore()
const { getPolicyById } = usePolicyStore()
const { currentServiceRequest } = useService()
const { currentPolicy } = usePolicy()
const { isLoading } = useApp()
const toast = useToast()
const { userInfo } = useUser()

const props = defineProps<{
  id: string
}>()

onMounted(() => {
  fetchServiceRequestById(props.id).then(() => {
    if (currentServiceRequest.value.activePolicy) {
      getPolicyById(currentServiceRequest.value.activePolicy.id)
    }
  })
})

const openDetailDialog = (index: number) => {
  detailResourceKey.value = index
  isDetailDialogOpen.value = true
}

const deleteRequest = () => {
  changeStatus(props.id, Status.PendingDelete, PendingState.None).then(() => {
    router.push("/service-requests")
  })
}

const transferRequest = (e: SimpleUser) => {
  isTransferDialogOpen.value = false
  if (e !== null && e.id !== currentServiceRequest.value.currentRequestOwner?.id) {
    currentServiceRequest.value.pendingRequestOwner = e
    currentServiceRequest.value.status = Status.Submitted
    currentServiceRequest.value.pendingState = PendingState.Transfer
    updateServiceRequest(props.id, currentServiceRequest.value)
  } else {
    toast.error("You must select a different user")
  }
}

const releaseRequest = () => {
  changeStatus(props.id, Status.ReadyToRemove, PendingState.None).then(() => {
    router.push("/service-requests")
  })
}

const cancelReview = () => {
  isCancelReviewDialogOpen.value = false
  cancelServiceRequestReview(currentServiceRequest.value.id).then(() => {
    router.push("/service-requests")
  })
}

const isInRole = (role: string):boolean => userInfo.value.roles.includes(role)

const updateLifetime = (e: LifetimeUpdate) => {
  isExtendDialogOpen.value = false
  currentServiceRequest.value.unlimitedLifetimeRequested = e.unlimitedResourceLifetime
  currentServiceRequest.value.lifetimeRequested = e.resourceLifetime
  currentServiceRequest.value.status = Status.Submitted
  currentServiceRequest.value.pendingState = PendingState.Extend
  updateServiceRequest(props.id, currentServiceRequest.value)
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

</script>
