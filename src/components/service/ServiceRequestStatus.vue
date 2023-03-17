<template>
  <div v-if="serviceRequest.expirationDateSet === false" class="font-medium mt-2 text-xs">
    Not set
  </div>
  <div v-else-if="serviceRequest.expirationDateUtc === null" class="font-medium mt-2 text-xs">
    No expiration
  </div>
  <div
    v-else-if="DateTime.fromISO(serviceRequest.expirationDateUtc) > DateTime.now()"
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
</template>

<script setup lang="ts">
import type { ServiceRequestSummary } from "@/models/serviceRequests/serviceRequestSummary"
import { DateTime } from "luxon"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    serviceRequest: ServiceRequestSummary
}>()
</script>

<style scoped>

</style>
