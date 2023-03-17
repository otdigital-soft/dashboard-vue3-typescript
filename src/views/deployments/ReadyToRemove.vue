<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Ready to remove
        </h1>
      </div>
    </div>

    <div v-if="serviceRequestList.length === 0" class="mt-10">
      <p>
        No Service Requests found that are ready to remove.
      </p>
    </div>
    <div class="grid grid-cols-autofill gap-4 mt-10">
      <div
        v-for="serviceRequest in serviceRequestList"
        :key="serviceRequest.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700 transition-shadow p-5 cursor-pointer"
      >
        <router-link class="flex flex-col items-center place-content-center" :to="{ name: 'remove-service-request', params: { id: serviceRequest.id }}">
          <service-request-icon :service-request="serviceRequest" />
          <div v-if="serviceRequest.status === Status.ReadyToRemove" class="font-medium mt-2 text-xs text-green-600">
            Ready to Remove
          </div>
          <div v-else>
            <div v-if="serviceRequest.expirationDateUtc !== null">
              <div
                v-if="DateTime.fromISO(serviceRequest.expirationDateUtc) > DateTime.now()"
                class="font-medium mt-2 text-xs"
                :class="{'text-red-600': DateTime.fromISO(serviceRequest.expirationDateUtc) < DateTime.now().plus({ days: 5 }), 'text-yellow-600': DateTime.fromISO(serviceRequest.expirationDateUtc!) < DateTime.now().plus({ days: 15 }) }"
              >
                Expires
                {{ DateTime.fromISO(serviceRequest.expirationDateUtc).toRelative() }}
              </div>
              <div
                v-else
                class="font-medium mt-2 text-xs text-red-600"
              >
                Expired
                {{ DateTime.fromISO(serviceRequest.expirationDateUtc).toRelative() }}
              </div>
            </div>
          </div>
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
import { DateTime } from "luxon"
import { Status } from "@/models/serviceRequests/serviceRequestDetail"

const { fetchReadyToRemove } = useServiceStore()
const { serviceRequestList } = useService()

onMounted(() => {
  fetchReadyToRemove()
})
</script>
