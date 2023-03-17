<template>
  <div v-if="shouldDisplayData" class="shadow ring-1 ring-black ring-opacity-5 md:rounded">
    <div class="responsive-table overflow-x-auto custom-scroll">
      <table class="min-w-full divide-y divide-gray-300 whitespace-nowrap">
        <thead class="bg-gray-100 dark:bg-slate-800 rounded-lg">
          <tr>
            <th
              v-for="column in visibleColumns"
              :key="column.value!"
              class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide"
            >
              <span class="cursor-pointer" @click="updateSorter(column.key!)">
                {{ column.name }}
                <template v-if="sortByField === column.key">
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
              <CellDisplay :index="rowIndex" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
import CellDisplay from "./CellDisplay.vue"
import type { ReportColumn } from "@/models/reports/reportColumn"

const props = defineProps<{
    tableColumns: ReportColumn[],
    items: any[],
}>()

// Composable:

// Data:
const sortByField = ref("requestName")
const orderBy = ref("asc")

const reportsState = toRef(props, "items")

const pagination = ref({
  currentPage: 1,
  eachPage: 20,
  totalItems: 1,
  lastPage: 1
})

const visibleColumns = computed(() => {
  if (props.items.length === 0) {
    return []
  }
  const checkedColumns = props.tableColumns.filter(col => col.checked)

  const keys = Object.keys(props.items[0])
  const cols:ReportColumn[] = []

  for (let i = 0; i < keys.length; i++) {
    cols.push({ ...checkedColumns[i], key: keys[i] })
  }
  return cols
})

const shouldDisplayData = computed<boolean>(() => {
  if (visibleColumns.value.length === 0) {
    return false
  }
  if (props.items.length === 0) {
    return false
  }
  const dataSize = Object.keys(props.items[0]).length

  if (dataSize === visibleColumns.value.length) {
    return true
  }

  return false
})

// Computed:
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
  sortByField.value = key
  orderBy.value = orderBy.value === "asc" ? "desc" : "asc"
}
</script>

<style scoped>
.responsive-table::-webkit-scrollbar {
  display: block;
  background: white;
  height: 8px;
}
.responsive-table::-webkit-scrollbar-thumb {
  background: gainsboro;
}
</style>
