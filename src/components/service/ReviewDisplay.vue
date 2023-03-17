<template>
  <div v-if="responses.length === 0">
    No review responses found
  </div>
  <div v-else>
    <div v-for="(response, index) in responses" :key="index" class="mb-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 w-[450px] my-2 pb-2">
      <div class="flex justify-between">
        <div class="flex mb-1 justify-start">
          <check-circle-icon v-if="response.approved" class="h-5 w-5 text-green-500 mr-1" />
          <x-circle-icon v-if="!response.approved" class="h-5 w-5 text-red-500 mr-1" />
          <div><a :href="`mailto:${response.reviewer.email}`" class="text-blue-600 dark:text-blue-400 underline">{{ response.reviewer.email }}</a></div>
        </div>
        <div>{{ DateTime.fromISO(response.responseDateUtc).toRelative() }}</div>
      </div>

      <div v-if="response.comment" class="mb-2">
        {{ response.comment }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { ReviewerResponse } from "@/models/serviceRequests/deployedServiceRequest"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/20/solid"
import { DateTime } from "luxon"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    responses: ReviewerResponse[]
}>()

</script>

<style scoped>

</style>
