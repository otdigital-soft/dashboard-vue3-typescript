<template>
  <div v-if="changes.length !== 0">
    <Disclosure
      v-for="(change, index) in changes"
      :key="index"
      v-slot="{open}"
    >
      <DisclosureButton class="py-2 flex">
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-slate-500 mr-2"
        />
        Requested on {{ DateTime.fromISO(change.createdDateUtc).toLocaleString() }}
      </DisclosureButton>
      <DisclosurePanel class="pl-7">
        <ul class="pl-4">
          <li v-for="source in change.changes" :key="source.id" class="list-disc pb-1 text-gray-700 dark:text-gray-300">
            {{ source.property }} of {{ source.resourceType }}: {{ source.oldValue }} -> {{ source.newValue }}
          </li>
        </ul>
      </DisclosurePanel>
    </disclosure>
  </div>
  <div v-else>
    <p class="text-gray-700 dark:text-gray-200 mt-2">
      No modifications have been made to this service request.
    </p>
  </div>
</template>

<script setup lang="ts">

import type { ChangeEvent } from "@/models/serviceRequests/deployedServiceRequest"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from "@headlessui/vue"
import { DateTime } from "luxon"
import { ChevronUpIcon } from "@heroicons/vue/20/solid"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    changes: ChangeEvent[]
}>()
</script>

<style scoped>

</style>
