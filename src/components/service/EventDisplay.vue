<template>
  <div v-if="events.length === 0" class="mt-2">
    No events found for this service request.
  </div>
  <div v-else>
    <div v-for="(event, index) in events" :key="index" class="mb-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 w-[450px] my-2 pb-2">
      <div class="flex justify-between">
        <div v-if="event.statusType !== null" class="font-medium">
          {{ DisplayText.getStatusDisplayText(event.statusType) }}
        </div>
        <div>{{ DateTime.fromISO(event.statusDateTimeUtc).toRelative() }}</div>
      </div>

      <div v-if="event.message" class="">
        {{ event.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatusEvent } from "@/models/serviceRequests/deployedServiceRequest"
import { DisplayText } from "@/services/displayText"
import { DateTime } from "luxon"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    events: StatusEvent[]
}>()

</script>

<style scoped>

</style>
