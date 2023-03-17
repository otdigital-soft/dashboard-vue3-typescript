<template>
  <div v-cloak class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-top">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Expiring service requests
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        Days
        <select
          v-model="days"
          class="mt-1 w-20 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
          @change="daysChanged"
        >
          <option v-for="n in 30" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="serviceRequestList.length === 0" class="mt-10">
      <p v-if="days===1">
        No Service Requests are expiring within the next day.
      </p>
      <p v-else>
        No Service Requests are expiring within the next {{ days }} days.
      </p>
    </div>
    <div class="grid grid-cols-autofill gap-4 mt-10">
      <div
        v-for="request in serviceRequestList"
        :key="request.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700 transition-shadow p-5 cursor-pointer"
      >
        <router-link class="flex flex-col items-center place-content-center" :to="{ name: 'detail-service-request', params: { id: request.id }}">
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
import { onMounted, ref } from "vue"
import ServiceRequestIcon from "@/components/service/ServiceRequestIcon.vue"
import ServiceRequestStatus from "@/components/service/ServiceRequestStatus.vue"

const { fetchExpiringSoon } = useServiceStore()
const { serviceRequestList } = useService()
const days = ref(14)

onMounted(() => {
  fetchExpiringSoon(days.value)
})

const daysChanged = () => {
  fetchExpiringSoon(days.value)
}
</script>
