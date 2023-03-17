<template>
  <div class="w-56">
    <Popover v-slot="{open}" class="relative">
      <div>
        <PopoverButton
          class="border hover:bg-gray-600 text-gray-500 dark:hover:bg-gray-400 border-gray-300 dark:border-gray-500 rounded bg-white
          hover:text-white dark:text-gray-200 dark:bg-gray-600 dark:hover:text-gray-100"
        >
          <span class="flex w-full justify-center px-3 py-1 items-center text-sm" @click="resetFilter">
            <PlusCircleIcon class="w-5 h-5 mr-1" aria-hidden="true" />
            Add filter
          </span>
        </PopoverButton>
      </div>

      <div v-if="open && !isFilterClosed">
        <PopoverPanel
          static
          class="absolute z-10 w-[450px] rounded-md bg-white px-1 py-2 shadow-lg dark:bg-gray-800
        border-gray-300 dark:border-gray-500 border "
        >
          <!-- Step 1: Select a filter field -->
          <template v-if="selectedFilterField === null">
            <div v-for="(filter, key) in filters[`${reportType}`]" :key="key">
              <div
                class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-500"
                @click="selectedFilterField = key"
              >
                {{ filter.name }}
              </div>
            </div>
          </template>
          <!-- Step 2: Select comparison operator -->
          <template v-else-if="selectedFilterComparison === null">
            <div
              v-for="(operator, key) in ReportComparisonMapper"
              :key="key"
              class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-600
              hover:text-white cursor-pointer dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-500"
              @click="selectFilterComparison(key)"
            >
              {{ operator }}
            </div>
          </template>

          <!-- Step 3: Type in filter value -->
          <div v-else-if="selectedFilterComparison !== null" class="px-3 py-3 text-center">
            <Form class="relative" @submit="submitFilter">
              <div class="flex items-center w-full">
                <span class="mr-2 font-bold text-gray-900 dark:text-gray-200">{{ DisplayText.getTypeDisplayText(selectedFilterField) }}</span>
                <span class="mr-2 italic text-gray-900 dark:text-gray-200">{{ DisplayText.getComparisonDisplayText(selectedFilterComparison) }}</span>

                <div>
                  <Field
                    id="filterValue"
                    v-model="filterValue"
                    name="filterValue"
                    rules="required"
                    type="text"
                    class="peer h-10 w-full border border-gray-300 dark:border-gray-500 px-3 rounded-sm focus:outline-none
                    focus:border-blue-600 mt-1 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  />
                  <ErrorMessage name="filterValue" class="text-red-700 text-xs font-medium block absolute" />
                </div>
              </div>
              <button class="mt-4 btn-blue btn-outline-sm">
                Add
              </button>
            </Form>
          </div>
        </PopoverPanel>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { PlusCircleIcon } from "@heroicons/vue/20/solid"
import { computed, ref } from "vue"
import { ReportComparisonMapper, ReportComparison } from "@/models/policies/policyDetail"
import { DisplayText } from "@/services/displayText"
import { filtersMapper } from "@/models/filtersMapper"
import { ReportFilter } from "@/models/reports/reportFilter"

const emit = defineEmits(["add"])
defineProps<{
  reportType: string
}>()

// Data:
const selectedFilterType = ref(null)
const selectedRequestType = ref(null)
const selectedFilterField = ref(null)
const selectedFilterComparison = ref(null)
const filterValue = ref(null)
const isFilterClosed = ref(false)
const filters = computed(() => {
  const filterList = { ...filtersMapper }
  return filterList
})
const noNeedValue = ["IsNull", "IsNotNull"]

// Methods:
const resetFilter = () => {
  selectedFilterType.value = null
  selectedRequestType.value = null
  selectedFilterField.value = null
  selectedFilterComparison.value = null
  filterValue.value = null
  isFilterClosed.value = false
}

const submitFilter = () => {
  if (filterValue.value !== null || (selectedFilterComparison.value && noNeedValue.includes(selectedFilterComparison.value))) {
    const newFilter: ReportFilter = new ReportFilter()
    newFilter.comparison = selectedFilterComparison.value
    newFilter.field = selectedFilterField.value
    newFilter.value = filterValue.value

    emit("add", newFilter)
    resetFilter()
    isFilterClosed.value = true
  }
}

const selectFilterComparison = (operator: ReportComparison) => {
  selectedFilterComparison.value = operator

  if (noNeedValue.includes(operator)) {
    submitFilter()
  }
}

</script>
