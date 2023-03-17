<template>
  <h3 class="text-base capitalize font-medium mb-3 text-center truncate overflow-hidden w-full">
    {{ serviceRequest.name }}
  </h3>
  <div class="relative" :title="DisplayText.getStatusDisplayText(serviceRequest.status)">
    <DocumentTextIcon class="w-14 h-14 text-blue-600 dark:text-blue-400" />
    <ExclamationCircleIcon v-if="serviceRequest.status === Status.Draft" class="w-6 h-6 text-yellow-500 absolute -top-1 right-0 z-10" />
    <ClockIcon v-if="serviceRequest.status === Status.WaitingForApprovals" class="w-6 h-6 text-orange-500 absolute -top-1 right-0 z-10" />
    <ShieldCheckIcon v-if="serviceRequest.status === Status.ApprovalsComplete" class="w-6 h-6 text-cyan-500 absolute -top-1 right-0 z-10" />
    <CircleStackIcon v-if="serviceRequest.status === Status.DeploymentInProgress" class="w-6 h-6 text-indigo-500 absolute -top-1 right-0 z-10" />
    <CheckCircleIcon v-if="serviceRequest.status === Status.DeploymentComplete" class="w-6 h-6 text-green-500 absolute -top-1 right-0 z-10" />
    <ExclamationCircleIcon v-if="serviceRequest.status === Status.Expired" class="w-6 h-6 text-red-500 absolute -top-1 right-0 z-10" />
    <XCircleIcon v-if="serviceRequest.status === Status.ReadyToRemove" class="w-6 h-6 text-red-700 absolute -top-1 right-0 z-10" />
  </div>

  <span v-if="serviceRequest.resourceCount===0" class="mt-3">
    No resources
  </span>
  <span v-else class="mt-3">
    {{ serviceRequest.resourceCount }} {{ serviceRequest.resourceCount === 1 ? 'resource' : 'resources' }}
  </span>
</template>

<script setup lang="ts">
import type { ServiceRequestSummary } from "@/models/serviceRequests/serviceRequestSummary.js"
import { DocumentTextIcon } from "@heroicons/vue/24/outline"
import { ExclamationCircleIcon, CheckCircleIcon, ClockIcon, CircleStackIcon, ShieldCheckIcon, XCircleIcon } from "@heroicons/vue/20/solid"
import { Status } from "@/models/serviceRequests/serviceRequestDetail"
import { DisplayText } from "@/services/displayText"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    serviceRequest: ServiceRequestSummary
}>()

</script>

<style scoped>

</style>
