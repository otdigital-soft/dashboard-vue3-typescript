ServiceRequestDetail<template>
  <Loader :loading="loading" />
  <div
    v-if="!loading && serviceRequest.name"
    v-cloak
    class="bg-white dark:bg-slate-800 dark:text-white px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6"
  >
    <div class="sm:flex sm:items-top mb-6">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Review Service Request
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button class="btn-outline btn-green mr-2" type="button" @click="handleReviewClick(true)">
          Approve
          <CheckIcon class="ml-3 h-5 w-5" />
        </button>
        <button class="btn-outline btn-red" type="button" @click="handleReviewClick(false)">
          Reject
          <NoSymbolIcon class="ml-3 h-5 w-5" />
        </button>
      </div>
    </div>

    <div class="sm:flex sm:items-center mt-10 mb-8">
      <div class="sm:flex-auto text-gray-500 dark:text-gray-200">
        Name

        <h3 class="text-base font-semibold">
          {{ serviceRequest.name }}
        </h3>
      </div>
      <div class="sm:flex-none" />
    </div>
    <div class="my-8">
      <p class="text-gray-500 dark:text-gray-200">
        Owner
      </p>
      <div class="flex items-center mt-1">
        <img
          v-if="serviceRequest.currentRequestOwner?.profilePictureLarge"
          class="h-16 w-16 rounded-full mr-2"
          :src="serviceRequest.currentRequestOwner?.profilePictureLarge"
          alt="user avatar"
        >
        <div class="flex-auto">
          <p class="font-bold">
            {{ serviceRequest.currentRequestOwner?.firstName }} {{ serviceRequest.currentRequestOwner?.lastName }}
          </p>
          <a
            :href="`mailto:${serviceRequest.currentRequestOwner?.email}`"
            class="text-blue-600 dark:text-blue-400 text-xs underline"
          >{{ serviceRequest.currentRequestOwner?.email }}</a>
        </div>
      </div>
    </div>
    <div class="flex my-6">
      <div>
        <p class="text-gray-500 dark:text-gray-200">
          Status
        </p>
        <h4 class="text-medium font-semibold">
          {{ DisplayText.getStatusDisplayText(serviceRequest.status) }}
        </h4>
      </div>
      <div class="ml-14">
        <p class="text-gray-500 dark:text-gray-200">
          Pending state
        </p>
        <h4 class="text-medium font-semibold">
          {{ serviceRequest.pendingState }}
        </h4>
      </div>
      <div class="ml-14">
        <p class="text-gray-500 dark:text-gray-200">
          Requested lifetime
        </p>
        <h4 class="text-medium font-semibold">
          <span v-if="serviceRequest.unlimitedLifetimeRequested === true">No end date</span>
          <span v-else>{{ serviceRequest.lifetimeRequested?.duration }} {{ serviceRequest.lifetimeRequested?.lifetimeType }}</span>
        </h4>
      </div>
    </div>

    <div class="my-4">
      <p class="text-gray-500 dark:text-gray-200">
        Resources
      </p>
      <div class="mt-2">
        <span
          v-for="(resource, index) in serviceRequest.requestedResources"
          :key="index"
          class="relative mx-2"
          @click="openDetailDialog(index)"
        >
          <span
            class="rounded-md px-3 py-1 italic bg-slate-400 dark:bg-slate-600 hover:bg-slate-500 hover:dark:bg-slate-500 text-slate-50 text-sm cursor-pointer relative"
          >
            {{ resource.resourceType }}
          </span>
        </span>
      </div>
    </div>
    <SubmitCommentDialog :is-open="isSubmitCommentDialogOpen" @send-message="sendMessage" @close="isSubmitCommentDialogOpen = false" />
  </div>
  <div v-else>
    <span v-if="loading" />
    <span v-else>Service request not found</span>
  </div>
  <DetailResourceDialog
    :open="isDetailDialogOpen"
    :resources="serviceRequest.requestedResources"
    :detail-key="detailResourceKey"
    @close="isDetailDialogOpen = false"
  />
</template>

<script setup lang="ts">
import { CheckIcon, NoSymbolIcon } from "@heroicons/vue/24/outline"
import { ref, onMounted, defineAsyncComponent } from "vue"
import { useToast } from "vue-toastification"
import { useRouter } from "vue-router"
import { DeployedServiceRequest } from "@/models/serviceRequests/deployedServiceRequest"
import serviceRequestApi from "@/apiResources/serviceRequestApi"
import Loader from "@/components/common/Loader.vue"
import DetailResourceDialog from "@/components/dialogs/DetailResource.vue"
import { DisplayText } from "@/services/displayText"
import { path } from "ramda"

const SubmitCommentDialog = defineAsyncComponent(() =>
  import("@/components/dialogs/SubmitComment.vue")
)

const toast = useToast()
const serviceRequest = ref(new DeployedServiceRequest()) // eslint-disable-line
const isSubmitCommentDialogOpen = ref(false)
const reviewType = ref(true)
const loading = ref(true)
const isDetailDialogOpen = ref(false)
const detailResourceKey = ref<number>(-1)
const router = useRouter()

const props = defineProps<{
  id: string
}>()

onMounted(() => {
  fetchData(props.id).then(() => {
    if (serviceRequest.value.status !== "WaitingForApprovals") {
      router.replace({ name: "review-complete" })
    }
  })
})

const handleReviewClick = (actionType : boolean) => {
  isSubmitCommentDialogOpen.value = true
  reviewType.value = actionType
}

const openDetailDialog = (index: number) => {
  detailResourceKey.value = index
  isDetailDialogOpen.value = true
}

const fetchData = async (id: string) => {
  try {
    const { data } = await serviceRequestApi.get(id)
    serviceRequest.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}

const sendMessage = async (comment:string) => {
  try {
    await serviceRequestApi.review(props.id, reviewType.value, comment)
    if (reviewType.value) {
      toast.success("You have approved this service request")
    } else {
      toast.success("You have rejected this service request")
    }
    router.push("/dashboard")
  } catch (error) {
    toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
  } finally {
    isSubmitCommentDialogOpen.value = false
  }
}
</script>
