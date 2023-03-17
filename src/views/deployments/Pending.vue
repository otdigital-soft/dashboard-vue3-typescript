<template>
  <div v-cloak class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Service requests awaiting deployment
        </h1>
      </div>
    </div>

    <div v-if="serviceRequestList.length === 0" class="mt-10">
      <p>
        No Service Requests found awaiting deployment.
      </p>
    </div>
    <div class="grid grid-cols-autofill gap-4 mt-10">
      <div
        v-for="request in serviceRequestList"
        :key="request.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700 transition-shadow p-5 cursor-pointer"
      >
        <router-link class="flex flex-col items-center place-content-center" :to="{ name: 'manage-deployment-resources', params: { id: request.id }}">
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
import { onMounted } from "vue"
import ServiceRequestIcon from "@/components/service/ServiceRequestIcon.vue"
import ServiceRequestStatus from "@/components/service/ServiceRequestStatus.vue"
import { useAppStore } from "@/stores/app"

const { fetchAwaitingDeployment } = useServiceStore()
const { serviceRequestList } = useService()

const { setLoading } = useAppStore()

onMounted(async () => {
  setLoading(true)
  await fetchAwaitingDeployment()
  setLoading(false)
})
</script>
