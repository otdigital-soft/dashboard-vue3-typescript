<template>
  <div v-cloak class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Service requests
        </h1>
      </div>
    </div>
    <div v-if="activeRequests.length === 0" class="mt-10">
      <p>
        No Service Requests found. Would you like to
        <router-link :to="{ name: 'create-service-request' }" class="text-blue-600 dark:text-blue-400 underline">create one</router-link>?
      </p>
    </div>
    <div class="grid grid-cols-autofill gap-4 mt-10">
      <div
        v-for="request in activeRequests"
        :key="request.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700 transition-shadow p-5 cursor-pointer"
      >
        <router-link class="flex flex-col items-center h-full justify-end" :to="{ name: 'detail-service-request', params: { id: request.id }}">
          <service-request-icon :service-request="request" />
          <service-request-status :service-request="request" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from "@/stores/serviceRequest"
import useService from "@/composables/useService"
import { onMounted, computed, ref } from "vue"
import { useAppStore } from "@/stores/app"
import ServiceRequestIcon from "@/components/service/ServiceRequestIcon.vue"
import ServiceRequestStatus from "@/components/service/ServiceRequestStatus.vue"
import { useRoute } from "vue-router"
import { Status } from "@/models/serviceRequests/serviceRequestDetail"
import { DateTime } from "luxon"

const { fetchServiceRequests } = useServiceStore()
const { serviceRequestList } = useService()
const { setLoading } = useAppStore()
const route = useRoute()
const status = ref<Status|null>(null)
const expires = ref<number | null>(null)

const activeRequests = computed(() => {
  let active = serviceRequestList.value.filter(
    request => request.status !== Status.ReadyToRemove &&
    request.status !== Status.PendingDelete)

  if (status.value) {
    active = active.filter(request => request.status === status.value)
  }
  if (expires.value !== null) {
    const dateVal = DateTime.utc().plus({ days: expires.value })
    active = active.filter(request => request.expirationDateUtc !== null && DateTime.fromISO(request.expirationDateUtc) < dateVal)
  }

  return active
})

onMounted(async () => {
  if (route.query.status) {
    updateStatus(route.query.status as string)
  }

  if (route.query.expires) {
    expires.value = parseInt(route.query.expires as string)
  }
  setLoading(true)
  await fetchServiceRequests()
  setLoading(false)
})

const updateStatus = (val:string) => {
  if (val) {
    switch (val.toLowerCase()) {
      case "draft":
        status.value = Status.Draft
        break
      case "submitted":
        status.value = Status.Submitted
        break
      case "returnedforquestions":
        status.value = Status.ReturnedForQuestions
        break
      case "waitingforapprovals":
        status.value = Status.WaitingForApprovals
        break
      case "approvalscomplete":
        status.value = Status.ApprovalsComplete
        break
      case "deploymentinprogress":
        status.value = Status.DeploymentInProgress
        break
      case "deploymentcomplete":
        status.value = Status.DeploymentComplete
        break
      case "expired":
        status.value = Status.Expired
        break
      case "readytoremove":
        status.value = Status.ReadyToRemove
        break
      case "pendingdelete":
        status.value = Status.PendingDelete
        break
      default:
        status.value = null
        break
    }
  }
}

</script>
