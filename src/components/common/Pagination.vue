<template>
  <nav
    class="px-2 py-1.5 flex items-center justify-between border-t border-gray-200 sm:px-6 bg-white dark:bg-gray-800"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm ">
        Showing
        <span class="font-medium"> {{ Math.min(pagination.eachPage * pagination.currentPage, pagination.totalItems ) }} </span>
        of
        <span class="font-medium"> {{ pagination.totalItems }} </span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <div class="relative inline-flex mr-4 items-baseline">
        <label for="pageSelection" class="text-sm font-medium pl-3 pr-2 py-2">Page size</label>
        <select
          id="pageSelection"
          :value="pagination.eachPage"
          class="border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-700 text-xs form-select form-select-sm focus:ring-blue-500 focus:border-blue-500 focus:ring-0 rounded-md"
          @change="$emit('changePageSize', $event.target.value)"
        >
          <option value="5">
            5
          </option>
          <option value="10">
            10
          </option>
          <option value="20">
            20
          </option>
        </select>
      </div>
      <button
        type="button"
        :disabled="pagination.currentPage === 1"
        class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @click="$emit('previous')"
      >
        <ChevronLeftIcon class="w-5 mr-1" />
        Previous
      </button>
      <button
        type="button"
        :disabled="pagination.currentPage === pagination.lastPage"
        class="inline-flex items-center ml-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @click="$emit('next')"
      >
        Next
        <ChevronRightIcon class="w-5 ml-1" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline"

defineEmits(["next", "previous", "changePageSize"])
defineProps({
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      eachPage: 10,
      totalItems: 0,
      lastPage: 1
    })
  }
})

</script>
