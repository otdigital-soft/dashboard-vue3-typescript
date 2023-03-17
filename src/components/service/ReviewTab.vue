<template>
  <TabGroup vertical>
    <div class="flex">
      <TabList class="flex flex-col mr-10">
        <Tab
          v-for="(tab, index) in tabList"
          v-slot="{selected}"
          :key="index"
          as="template"
        >
          <button
            class="px-10 py-3 mb-2 rounded-sm hover:text-white hover:bg-slate-400"
            :class="selected ? 'bg-slate-400 text-white' : 'bg-slate-200 text-gray-600'"
          >
            {{ tab }}
          </button>
        </Tab>
      </TabList>
      <TabPanels class="grow border border-dashed border-slate-400 rounded px-4 py-3">
        <TabPanel>
          <div class="mt-1">
            <ReviewDisplay :responses="reviewerResponses.creationReviewerResponses" />
          </div>
        </TabPanel>
        <TabPanel>
          <div class="mt-1">
            <ReviewDisplay :responses="reviewerResponses.extensionReviewerResponses" />
          </div>
        </TabPanel>
        <TabPanel>
          <div class="mt-1">
            <ReviewDisplay :responses="reviewerResponses.modificationReviewerResponses" />
          </div>
        </TabPanel>
        <TabPanel>
          <div class="mt-1">
            <ReviewDisplay :responses="reviewerResponses.transferReviewerResponses" />
          </div>
        </TabPanel>
      </tabpanels>
    </div>
  </TabGroup>
  <div />
</template>

<script setup lang="ts">
import type { ReviewResponseCollection } from "@/models/serviceRequests/deployedServiceRequest"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import ReviewDisplay from "./ReviewDisplay.vue"

const tabList = [
  "Create",
  "Extend",
  "Modify",
  "Transfer"
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    reviewerResponses: ReviewResponseCollection
}>()

</script>
