<template>
  <div v-if="items.length > 0" class="overflow-y-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-100 dark:bg-slate-800 rounded-lg">
        <tr>
          <th v-for="(celVal, rowIndex) in Object.keys(reportsState[0])" :key="rowIndex" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide">
            <span class="cursor-pointer" @click="updateSorter(celVal)">
              {{ celVal }}
              <template v-if="sortByField === celVal">
                <ArrowUpIcon v-if="orderBy === 'asc'" class="w-3 inline-block ml-1 translate-y-[1px] absolute" />
                <ArrowDownIcon v-else class="w-3 inline-block ml-1 absolute translate-y-[1px]" />
              </template>
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white dark:bg-slate-700">
        <tr v-for="(item, index) in reportList" :key="index">
          <td v-for="(celVal, rowIndex) in Object.keys(item)" :key="rowIndex" class="whitespace-nowrap px-3 py-4 text-sm">
            <GroupCellDisplay :index="rowIndex" :item="item" report-type="Charge" />
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :pagination="pagination"
      @next="pagination.currentPage += 1"
      @previous="pagination.currentPage -= 1"
      @change-page-size="pagination.eachPage = $event"
    />
  </div>
  <div v-else>
    <p class="my-3">Data is not ready to be displayed.</p>
    <p class="my-3">
      Press the View button to refresh the data.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from "vue"
import { prop, sortWith, descend, ascend, splitEvery } from "ramda"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/24/outline"
import Pagination from "@/components/common/Pagination.vue"
import GroupCellDisplay from "./GroupCellDisplay.vue"
import type { ReportColumn } from "@/models/reports/reportColumn"

const props = defineProps<{
      tableColumns: ReportColumn[],
      items: any[],
      groupBy: string
  }>()

// Composable:

// Data:
const sortByField = ref("amount")
const orderBy = ref("desc")

const reportsState = toRef(props, "items")

const pagination = ref({
  currentPage: 1,
  eachPage: 20,
  totalItems: 1,
  lastPage: 1
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const columnHeader = computed(() => {
  return props.tableColumns.find(({ value }) => value === props.groupBy)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reportList = computed(() => {
  let orderFunction = null
  // eslint-disable-next-line no-undef
  const reportsData = reportsState.value

  switch (orderBy.value) {
    case "desc":
      // @ts-ignore
      orderFunction = descend(prop(sortByField.value))
      break
    case "asc":
    default:
      // @ts-ignore
      orderFunction = ascend(prop(sortByField.value))
      break
  }

  if (orderFunction) {
    // @ts-ignore
    const data: Array = sortWith([orderFunction], reportsData)

    // paginate:
    const splittedData = splitEvery(pagination.value.eachPage, data)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    pagination.value.totalItems = data.length
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    pagination.value.lastPage = splittedData.length

    return splittedData[pagination.value.currentPage - 1]
  }

  return reportsData
})

// Methods:

const updateSorter = (key: string) => {
  console.log("updateSorter", key)
  sortByField.value = key
  orderBy.value = orderBy.value === "asc" ? "desc" : "asc"
}
</script>

  <style>
  .tagify {
    --tag-bg: rgb(220 252 231 / var(--tw-bg-opacity));
    --tag-text-color: rgb(22 101 52 / var(--tw-text-opacity));
  }
  </style>
