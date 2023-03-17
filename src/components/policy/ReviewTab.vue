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
            class="px-10 py-3 mb-2 rounded-sm  hover:text-white hover:bg-slate-400"
            :class="selected ? 'bg-slate-400 text-white' : 'bg-slate-200 text-gray-600'"
          >
            {{ tab }}
          </button>
        </Tab>
      </TabList>
      <TabPanels class="grow border border-dashed border-slate-400 rounded px-4 py-3">
        <TabPanel v-for="panel in tabPanelList" :key="panel">
          <div v-for="(requirement, index) in currentPolicy.requiredReviews[panel].reviewRequirements" :key="index">
            <div v-if="index > 0" class="ml-9">
              <label :for="`evaluationSelect-${index}`" class="block mt-3">Evaluation</label>
              <select
                :id="`evaluationSelect-${index}`"
                v-model="currentPolicy.requiredReviews[panel].evaluation"
                placeholder="Evaluation"
                :name="`evaluationSelect-${index}`"
                class="peer h-[38px] w-[75px] border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 mb-3 px-2"
              >
                <option value="And">
                  And
                </option>
                <option value="Or">
                  Or
                </option>
              </select>
            </div>
            <div class="flex items-center">
              <div class="mr-4 mt-4">
                <button class="p-1 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none border bg-gray-200 border-gray-300 dark:bg-gray-600 dark:border-gray-700 rounded-full" @click="removeRequirement(panel, index)">
                  <XMarkIcon class="h-3 w-3 text-red-500" />
                </button>
              </div>
              <ReviewFields
                :review-requirement="requirement"
                :index="index"
                :selectable-sources="selectableSources[panel]"
              />
            </div>
          </div>
          <div class="mt-5">
            <button
              class="border flex justify-center hover:bg-slate-600 text-slate-500 dark:hover:bg-slate-400 border-slate-500 dark:border-slate-400 rounded bg-white
                hover:text-white dark:text-slate-200 dark:bg-slate-600 dark:hover:text-slate-100 px-4 py-2 mt-1 "
              @click.prevent="addRequirement(panel)"
            >
              <PlusCircleIcon class="w-5 h-5 mr-1" /> Add
            </button>
          </div>
        </TabPanel>
      </tabpanels>
    </div>
  </TabGroup>
</template>

<script setup lang="ts">
import { computed, watch } from "vue"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import ReviewFields from "./ReviewFields.vue"
import { PlusCircleIcon, XMarkIcon } from "@heroicons/vue/20/solid"
import { ReviewRequirement, ReviewSourceMapper } from "@/models/policies/policyDetail"
import { filter, keys, pluck } from "ramda"
import usePolicy from "@/composables/usePolicy"

const emit = defineEmits(["review-requirements-changed"])

// Composable:
const { currentPolicy }: {currentPolicy: any} = usePolicy()

// Data:
const tabList = [
  "Create",
  "Extend",
  "Modify",
  "Transfer"
]
const tabPanelList = [
  "creationReviews",
  "extensionReviews",
  "modificationReviews",
  "transferReviews"
]

const selectableSources = computed(() => {
  const currentCreationSelect = pluck("reviewSource", currentPolicy.value.requiredReviews.creationReviews.reviewRequirements)
  const currentExtensionSelect = pluck("reviewSource", currentPolicy.value.requiredReviews.extensionReviews.reviewRequirements)
  const currentModificationSelect = pluck("reviewSource", currentPolicy.value.requiredReviews.modificationReviews.reviewRequirements)
  const currentTransferSelect = pluck("reviewSource", currentPolicy.value.requiredReviews.transferReviews.reviewRequirements)
  return {
    creationReviews: filter(key => !currentCreationSelect.includes(key), keys(ReviewSourceMapper)),
    extensionReviews: filter(key => !currentExtensionSelect.includes(key), keys(ReviewSourceMapper)),
    modificationReviews: filter(key => !currentModificationSelect.includes(key), keys(ReviewSourceMapper)),
    transferReviews: filter(key => !currentTransferSelect.includes(key), keys(ReviewSourceMapper))
  }
})

const addRequirement = (reviewType: string) => {
  currentPolicy.value.requiredReviews[reviewType].reviewRequirements.push(
    new ReviewRequirement()
  )
}

const removeRequirement = (reviewType: string, index: number) => {
  if (currentPolicy.value.requiredReviews[reviewType].reviewRequirements.length > 0) {
    currentPolicy.value.requiredReviews[reviewType].reviewRequirements.splice(index, 1)
  }
}

watch(currentPolicy, (newValue) => {
  emit("review-requirements-changed", newValue)
}, { deep: true })
</script>
