<template>
  <TabGroup>
    <TabList
      class="-mb-px flex space-x-12 border-b border-gray-200 dark:border-gray-400"
    >
      <Tab
        v-slot="{selected}"
        as="template"
        class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
      >
        <button
          :class="
            selected
              ? 'border-blue-500 text-blue-600 dark:text-blue-300'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
          "
        >
          <DocumentChartBarIcon class="-ml-0.5 mr-2 h-5 w-5" />
          <span>My reports</span>
        </button>
      </Tab>
      <Tab
        v-slot="{selected}"
        as="template"
        class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
      >
        <button
          :class="
            selected
              ? 'border-blue-500 text-blue-600 dark:text-blue-300'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'
          "
        >
          <Bars4Icon class="-ml-0.5 mr-2 h-5 w-5" />
          <span>Public reports</span>
        </button>
      </Tab>
    </TabList>
    <TabPanels class="pt-6">
      <TabPanel>
        <div>
          <div v-if="!isAppLoading && myReportList.length > 0" class="shadow ring-1 ring-black ring-opacity-5 md:rounded">
            <div class="overflow-x-auto custom-scroll">
              <table class="min-w-full divide-y divide-gray-300 whitespace-nowrap">
                <thead class="bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <tr>
                    <th
                      class="px-3 py-3 text-left text-xs font-medium tracking-wide"
                    >
                      <span class="cursor-pointer" @click="updateSorter('name')">
                        Name
                        <template v-if="sortByField === 'name'">
                          <ArrowUpIcon v-if="orderBy === 'asc'" class="w-3 inline-block ml-1 translate-y-[1px] absolute" />
                          <ArrowDownIcon v-else class="w-3 inline-block ml-1 absolute translate-y-[1px]" />
                        </template>
                      </span>
                    </th>
                    <th
                      class="px-3 py-3 text-left text-xs font-medium tracking-wide"
                    >
                      <span class="cursor-pointer" @click="updateSorter('reportType')">
                        Report Type
                        <template v-if="sortByField === 'reportType'">
                          <ArrowUpIcon v-if="orderBy === 'asc'" class="w-3 inline-block ml-1 translate-y-[1px] absolute" />
                          <ArrowDownIcon v-else class="w-3 inline-block ml-1 absolute translate-y-[1px]" />
                        </template>
                      </span>
                    </th>
                    <th
                      class="px-3 py-3 text-left text-xs font-medium tracking-wide"
                    >
                      <span class="cursor-pointer">
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:bg-slate-700">
                  <tr v-for="(item, index) in myReportList" :key="index">
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <router-link :to="buildUrlWithReportType(item)!" class="text-blue-500 cursor-pointer">
                        {{ item.name }}
                      </router-link>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      {{ getReportType(item.reportType) }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <XCircleIcon class="cursor-pointer -ml-0.5 mr-2 h-5 w-5 text-rose-500 hover:text-rose-600" @click="deleteReport(item.id, index)" />
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
          <div v-if="!isAppLoading && myReportList.length === 0">
            <p>No reports available to display</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <div v-if="!isAppLoading && publicReportList.length > 0" class="shadow ring-1 ring-black ring-opacity-5 md:rounded">
            <div class="overflow-x-auto custom-scroll">
              <table class="min-w-full divide-y divide-gray-300 whitespace-nowrap">
                <thead class="bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <tr>
                    <th
                      class="px-3 py-3 text-left text-xs font-medium tracking-wide"
                    >
                      <span class="cursor-pointer" @click="updateSorter('name')">
                        Name
                        <template v-if="sortByField === 'name'">
                          <ArrowUpIcon v-if="orderBy === 'asc'" class="w-3 inline-block ml-1 translate-y-[1px] absolute" />
                          <ArrowDownIcon v-else class="w-3 inline-block ml-1 absolute translate-y-[1px]" />
                        </template>
                      </span>
                    </th>
                    <th
                      class="px-3 py-3 text-left text-xs font-medium tracking-wide"
                    >
                      <span class="cursor-pointer" @click="updateSorter('reportType')">
                        Report Type
                        <template v-if="sortByField === 'reportType'">
                          <ArrowUpIcon v-if="orderBy === 'asc'" class="w-3 inline-block ml-1 translate-y-[1px] absolute" />
                          <ArrowDownIcon v-else class="w-3 inline-block ml-1 absolute translate-y-[1px]" />
                        </template>
                      </span>
                    </th>
                    <th
                      class="px-3 py-3 text-left text-xs font-medium tracking-wide"
                    >
                      <span class="cursor-pointer">
                        CreatedByEmail
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:bg-slate-700">
                  <tr v-for="(item, index) in publicReportList" :key="index">
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <router-link :to="buildUrlWithReportType(item)!" class="text-blue-500 cursor-pointer">
                        {{ item.name }}
                      </router-link>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      {{ getReportType(item.reportType) }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <a :href="`mailto:${item.createdBy.email}`" class="text-blue-500 cursor-pointer">
                        {{ item.createdBy.email }}
                      </a>
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
          <div v-if="!isAppLoading && publicReportList.length === 0">
            <p>No reports available to display</p>
          </div>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import {
  DocumentChartBarIcon, Bars4Icon, XCircleIcon
  , ArrowDownIcon, ArrowUpIcon
} from "@heroicons/vue/24/outline"
import { prop, sortWith, descend, ascend, splitEvery, path } from "ramda"
import { useToast } from "vue-toastification"
import Pagination from "@/components/common/Pagination.vue"
import reportApi from "@/apiResources/reportApi"
import { useAppStore } from "@/stores/app"
import type { MyReport } from "@/models/reports/myReport"
import useUser from "@/composables/useUser"

const toast = useToast()
const { userInfo } = useUser()
const { setLoading, isAppLoading } = useAppStore()
// Data:
const sortByField = ref("reportType")
const orderBy = ref("asc")

const myReportsState = ref<MyReport[]>([])

const pagination = ref({
  currentPage: 1,
  eachPage: 20,
  totalItems: 1,
  lastPage: 1
})

onMounted(async () => {
  setLoading(true)
  const { data } = await reportApi.getMyReport()
  myReportsState.value = data
  setLoading(false)
})

// Computed:
const myReportList = computed(() => {
  const reportsData : MyReport[] = myReportsState.value.filter(item => item.createdBy.id === userInfo.value.id)
  if (reportsData.length === 0) {
    return reportsData
  }
  return toSorted(reportsData)
})

const publicReportList = computed(() => {
  const reportsData : MyReport[] = myReportsState.value.filter(item => item.isPublic && item.createdBy.id !== userInfo.value.id)
  if (reportsData.length === 0) {
    return reportsData
  }
  return toSorted(reportsData)
})

// Methods:

const getReportType = (reportType: string) => {
  switch (reportType) {
    case "ServiceRequest":
      return "Service Request"
    case "DeployedResource":
      return "Deployed Resource"
    case "ResourceCost":
      return "Resource Cost"
    default:
      return reportType
  }
}

const toSorted = (reportsData: MyReport[]) => {
  let orderFunction = null
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
}

const buildUrlWithReportType = (report: MyReport) => {
  let url = "#"

  const params = new URLSearchParams()
  if (report.top !== null) {
    params.append("top", report.top.toString())
  }
  if (report.groupBy !== null) {
    params.append("groupBy", report.groupBy)
  }
  if (report.orderBy !== null) {
    params.append("orderBy", report.orderBy)
    if (report.descending) {
      params.append("orderByDesc", report.orderBy)
    }
  }
  if (report.filters !== null) {
    for (let index = 0; index < report.filters.length; index++) {
      const f = report.filters[index]
      params.append("filter", `${f.field} -${f.comparison} '${f.value}'`)
    }
  }
  if (report.columns !== null) {
    params.append("columns", report.columns.join(","))
  }
  switch (report.reportType) {
    case "ServiceRequest":
      url = report.groupBy ? `/reports/service-requests?${params.toString()}` : `/reports/service-requests/detail?${params.toString()}`
      break
    case "DeployedResource":
      url = report.groupBy ? `/reports/deployed-resources?${params.toString()}` : `/reports/deployed-resources/detail?${params.toString()}`
      break
    case "Charge":
      url = report.groupBy ? `/reports/resource-charges?${params.toString()}` : `/reports/resource-charges/detail?${params.toString()}`
      break
    default:
      break
  }
  return url
}

const deleteReport = async (id: string, index: number) => {
  try {
    await reportApi.deleteReport(id)
    myReportsState.value.splice(index, 1)
    toast.success("Removed successfully")
  } catch (error) {
    toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
  }
}

const updateSorter = (key: string) => {
  sortByField.value = key
  orderBy.value = orderBy.value === "asc" ? "desc" : "asc"
}
</script>
