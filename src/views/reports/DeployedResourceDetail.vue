<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Deployed Resource Detail
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="btn-outline btn-gray mr-2" @click="sidebarOpen=true">
          Options
          <CogIcon class="ml-3 h-5 w-5" />
        </button>
        <button type="button" class="btn-outline btn-blue mr-2" @click="handleView">
          View
          <DocumentChartBarIcon class="ml-3 h-5 w-5" />
        </button>
        <button type="button" class="btn-outline btn-green mr-2" @click="handleExport">
          Export
          <DocumentArrowDownIcon class="ml-3 h-5 w-5" />
        </button>
        <SaveReportNav :group-by="groupBy" :detail="false" @save-report="saveReport" />
      </div>
    </div>
    <div class="mt-14">
      <NonGroupView
        v-if="(readyToView || reportItems.length > 0)"
        :table-columns="columns"
        :items="reportItems"
      />
    </div>
  </div>

  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-10" @close="sidebarOpen = false">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                <div class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-800 py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-700 dark:text-gray-200">
                        Report options
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 dark:text-gray-200 dark:hover:bg-gray-500 dark:bg-gray-600 dark:border-gray-600
                         hover:text-gray-500 focus:outline-none"
                          @click="sidebarOpen = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="absolute inset-0 px-4 sm:px-6">
                      <div class="h-full border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 text-sm" aria-hidden="true">
                        <div class="flex items-center">
                          <label for="top" class="w-24 shrink-0 text-gray-500 dark:text-gray-200">Top</label>
                          <input
                            id="top"
                            v-model="top"
                            name="top"
                            placeholder="10"
                            type="number"
                            class="block w-full pl-3 h-10 pr-10 bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                          >
                        </div>
                        <div class="flex items-center mt-4">
                          <label for="orderBy" class="w-24 shrink-0 text-gray-500 dark:text-gray-200">Order by</label>
                          <select
                            id="orderBy"
                            v-model="orderBy"
                            name="orderBy"
                            class="block w-full pl-3 h-10 pr-10 bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                          >
                            <option value="">
                              None
                            </option>
                            <option value="email">
                              Request id
                            </option>
                            <option value="title">
                              Request name
                            </option>
                            <option value="firstName">
                              Owner first name
                            </option>
                            <option value="lastName">
                              Owner last name
                            </option>
                            <option value="email">
                              Owner email
                            </option>
                            <option value="title">
                              Owner title
                            </option>
                            <option value="department">
                              Owner department
                            </option>
                            <option value="city">
                              Owner city
                            </option>
                            <option value="state">
                              Owner state
                            </option>
                            <option value="postalCode">
                              Owner postal code
                            </option>
                            <option value="country">
                              Owner country
                            </option>
                            <option value="officeLocation">
                              Owner office location
                            </option>
                            <option value="usageLocation">
                              Owner usage location
                            </option>
                            <option value="location">
                              Resource location
                            </option>
                            <option value="regionOrZone">
                              Resource region or zone
                            </option>
                            <option value="monthlyCost">
                              Resource monthly cost
                            </option>
                            <option value="internalAssetId">
                              Resource internal asset id
                            </option>
                            <option value="resourceGroup">
                              Resource resource group
                            </option>
                            <option value="resourceType">
                              Resource type
                            </option>
                            <option value="subscription">
                              Resource subscription
                            </option>
                          </select>
                          <div class="shrink-0 flex">
                            <SwitchGroup>
                              <SwitchLabel class="ml-5 mr-3 text-gray-500 dark:text-gray-200">
                                Desc:
                              </SwitchLabel>
                              <Switch
                                v-model="orderDesc"
                                :class="orderDesc ? 'bg-blue-600':'bg-gray-200 dark:bg-gray-400'"
                                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <span
                                  class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                  :class="orderDesc ? 'translate-x-5' : 'translate-x-0'"
                                >
                                  <span
                                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                    :class="orderDesc ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                                    aria-hidden="true"
                                  />
                                  <span
                                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                    :class="orderDesc ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Switch>
                            </SwitchGroup>
                          </div>
                        </div>
                        <div class="flex items-center mt-4">
                          <label for="filters" class="w-24 shrink-0 text-gray-500 dark:text-gray-200">Filters</label>
                          <div class="grow border border-dashed border-slate-400 rounded px-4 py-3">
                            <ReportFilterView report-type="reportsDeployedResource" @add="addFilter" />
                            <div class="mt-4">
                              <div v-for="(filter, index) in filters" :key="index" class="inline-block mt-1 mr-4">
                                <div
                                  class="bg-gray-100 rounded border-gray-200 border divide-x divide-gray-300 flex
                                        dark:border-gray-500 dark:divide-gray-500 text-xs dark:text-gray-200
                                        dark:bg-gray-700 dark:hover:text-gray-100"
                                >
                                  <div class="mr-2 pl-2 py-2">
                                    {{ DisplayText.getTypeDisplayText(filter.field!) }}
                                  </div>
                                  <div class="mr-2 pl-2 py-2 italic">
                                    {{ DisplayText.getComparisonDisplayText(filter.comparison) }}
                                  </div>
                                  <div v-if="filter.value" class="mr-2 pl-2 py-2 font-medium">
                                    {{ filter.value }}
                                  </div>
                                  <div
                                    class="px-2 py-2 cursor-pointer hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500 dark:hover:text-gray-100"
                                    @click="removeFilter(index)"
                                  >
                                    <XMarkIcon class="w-4 h-4 text-red-500" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center mt-4">
                          <label for="Columns" class="w-24 shrink-0 text-gray-500 dark:text-gray-200">
                            Columns
                          </label>
                          <div class="grow">
                            <Popover v-slot="{ open }" class="relative">
                              <PopoverButton
                                :class="open ? '' : 'text-opacity-90'"
                                class="group inline-flex items-center rounded-md bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-3 py-2 text-base text-gray-500 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                              >
                                <span>Select</span>
                                <ChevronDownIcon
                                  :class="open ? '' : 'text-opacity-70'"
                                  class="ml-2 h-5 w-5 text-gray-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
                                  aria-hidden="true"
                                />
                              </PopoverButton>

                              <transition
                                enter-active-class="transition duration-200 ease-out"
                                enter-from-class="translate-y-1 opacity-0"
                                enter-to-class="translate-y-0 opacity-100"
                                leave-active-class="transition duration-150 ease-in"
                                leave-from-class="translate-y-0 opacity-100"
                                leave-to-class="translate-y-1 opacity-0"
                              >
                                <PopoverPanel
                                  class="absolute w-full left-0 z-10 mt-3 px-4 sm:px-0"
                                >
                                  <div
                                    class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                                  >
                                    <div class="flex items-center gap-3 mt-2 pl-3">
                                      <button
                                        class="btn-outline-sm btn-gray border-gray-300"
                                        @click="updateAllColumns(true)"
                                      >
                                        Select All
                                      </button>
                                      <button
                                        class="btn-outline-sm btn-gray border-gray-300"
                                        @click="updateAllColumns(false)"
                                      >
                                        Deselect All
                                      </button>
                                    </div>
                                    <div class="relative flex flex-col bg-white p-2">
                                      <div
                                        v-for="item in columns"
                                        :key="item.name"
                                        class="flex items-center rounded-lg py-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <div
                                          class="flex h-4 w-auto shrink-0 items-center justify-center text-white sm:h-6 "
                                        >
                                          <Checkbox v-model="item.checked" :label-text="item.name!" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </PopoverPanel>
                              </transition>
                            </Popover>
                          </div>
                        </div>
                        <div class="flex items-center mt-8">
                          <button class="btn-outline btn-blue" @click="handleView">
                            View
                            <DocumentChartBarIcon class="ml-3 h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- /End replace -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, SwitchGroup, SwitchLabel, Switch, Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import { XMarkIcon, DocumentArrowDownIcon, DocumentChartBarIcon, CogIcon } from "@heroicons/vue/24/outline"
import { ChevronDownIcon } from "@heroicons/vue/20/solid"
import Checkbox from "@/components/common/Checkbox.vue"

import { path } from "ramda"
import NonGroupView from "@/components/report/NonGroupView.vue"
import { DisplayText } from "@/services/displayText"
import ReportApi from "@/apiResources/reportApi"
import { ReportFilter } from "@/models/reports/reportFilter"
import ReportFilterView from "@/components/report/ReportFilter.vue"
import type { ReportColumn } from "@/models/reports/reportColumn"
import { useToast } from "vue-toastification"
import SaveReportNav from "@/components/report/SaveReportNav.vue"

const route = useRoute()
const toast = useToast()

const sidebarOpen = ref(false)
const top = ref<number | null>(null)
const groupBy = ref<string>("")
const orderBy = ref<string>("")
const orderDesc = ref<boolean>(false)
const filters = ref<ReportFilter[]>([])
const columns = ref<ReportColumn[]>([
  {
    value: "id",
    name: "Request id",
    checked: true
  },
  {
    value: "serviceRequestName",
    name: "Service Request name",
    checked: true
  },
  {
    value: "firstName",
    name: "Owner first name",
    checked: false
  },
  {
    value: "lastName",
    name: "Owner last name",
    checked: false
  },
  {
    value: "title",
    name: "Owner title",
    checked: false
  },
  {
    value: "profilePicture",
    name: "Owner profile picture",
    checked: false
  },
  {
    value: "email",
    name: "Owner email",
    checked: false
  },
  {
    value: "department",
    name: "Owner department",
    checked: false
  },
  {
    value: "city",
    name: "Owner city",
    checked: false
  },
  {
    value: "state",
    name: "Owner state",
    checked: false
  },
  {
    value: "postalCode",
    name: "Owner postal code",
    checked: false
  },
  {
    value: "country",
    name: "Owner country",
    checked: false
  },
  {
    value: "officeLocation",
    name: "Owner office location",
    checked: false
  },
  {
    value: "usageLocation",
    name: "Owner usage location",
    checked: false
  },
  {
    value: "resourceName",
    name: "Resource name",
    checked: false
  },
  {
    value: "description",
    name: "Resource description",
    checked: false
  },
  {
    value: "createdDateUtc",
    name: "Resource created date",
    checked: false
  },
  {
    value: "deployedBy",
    name: "Deployed by email",
    checked: false
  },
  {
    value: "removedDateUtc",
    name: "Resource removed date",
    checked: false
  },
  {
    value: "removedBy",
    name: "Removed by email",
    checked: false
  },
  {
    value: "internalAssetId",
    name: "Internal asset id",
    checked: false
  },
  {
    value: "location",
    name: "Location",
    checked: true
  },
  {
    value: "monthlyCost",
    name: "Monthly cost",
    checked: true
  },
  {
    value: "regionOrZone",
    name: "Region or zone",
    checked: false
  },
  {
    value: "resourceGroup",
    name: "Resource group",
    checked: false
  },
  {
    value: "resourceType",
    name: "Resource type",
    checked: true
  },
  {
    value: "subscription",
    name: "Subscription",
    checked: false
  },
  {
    value: "url",
    name: "Url",
    checked: false
  }
])

const reportItems = ref([])

onMounted(() => {
  console.log("onMounted")
  updateFromQueryString()
  if (readyToView.value) {
    handleView()
  }
})

const handleExport = async () => {
  let orderValue: string | null
  if (orderDesc.value) {
    orderValue = orderBy.value
  } else {
    orderValue = null
  }

  const selectedCols: (string|null)[] = columns.value.filter(c => c.checked).map(c => c.value)
  let cols: string| null = null

  if (selectedCols.length === 0) {
    cols = null
  } else {
    cols = selectedCols.join(",")
  }

  let filtersValue: string[] | null = null
  if (filters.value.length > 0) {
    filtersValue = []
    for (const filter of filters.value) {
      filtersValue.push(filter.toString())
    }
  }

  await ReportApi.getDeployedResourceFile(top.value, groupBy.value, orderBy.value, orderValue, filtersValue, cols, "csv")
}

const updateFromQueryString = () => {
  if (route.query.top) {
    top.value = parseInt(route.query.top as string)
  } else {
    top.value = null
  }
  if (route.query.groupBy) {
    groupBy.value = route.query.groupBy as string
  } else {
    groupBy.value = ""
  }
  if (route.query.orderBy) {
    orderBy.value = route.query.orderBy as string
    orderDesc.value = false
  } else {
    if (!route.query.orderDesc) {
      orderBy.value = ""
    }
  }
  if (route.query.orderByDesc) {
    orderBy.value = route.query.orderByDesc as string
    orderDesc.value = true
  } else {
    if (!route.query.orderBy) {
      orderBy.value = ""
    }
  }
  if (route.query.filter) {
    const filterVals = route.query.filter
    filters.value = []

    if (Array.isArray(filterVals)) {
      for (const filterVal:string of filterVals) {
        const reportFilter: ReportFilter = ReportFilter.parse(filterVal)
        filters.value.push(reportFilter)
      }
    } else {
      const reportFilter: ReportFilter = ReportFilter.parse(filterVals)
      filters.value.push(reportFilter)
    }
  } else {
    filters.value = []
  }

  if (route.query.columns) {
    for (let index = 0; index < columns.value.length; index++) {
      const c = columns.value[index]
      c.checked = false
    }

    const columnVals:string[] = (route.query.columns as string).split(",")

    for (const column of columnVals) {
      const columnItem = columns.value.find(c => c.value === column)
      if (columnItem) {
        const idx = columns.value.indexOf(columnItem)
        columns.value[idx].checked = true
      }
    }
  } else {
    // Need to set default for all columns... how?
  }
}

const handleView = async () => {
  let orderValue: string | null
  if (orderDesc.value) {
    orderValue = orderBy.value
  } else {
    orderValue = null
  }

  const selectedCols: (string|null)[] = columns.value.filter(c => c.checked).map(c => c.value)
  let cols: string| null = null

  if (selectedCols.length === 0) {
    cols = null
  } else {
    cols = selectedCols.join(",")
  }

  let filtersValue: string[] | null = null
  if (filters.value.length > 0) {
    filtersValue = []
    for (const filter of filters.value) {
      filtersValue.push(filter.toString())
    }
  }

  const { data } = await ReportApi.getDeployedResources(top.value, groupBy.value, orderBy.value, orderValue, filtersValue, cols)
  reportItems.value = data
  sidebarOpen.value = false
}

const addFilter = (newFilter: ReportFilter) => {
  filters.value.push(newFilter)
}
const removeFilter = (index: number) => {
  filters.value.splice(index, 1)
}

const readyToView = computed(() => {
  return route.query.filter || route.query.orderBy || route.query.orderByDesc || route.query.top || route.query.columns
})

const updateAllColumns = (value: boolean) => {
  columns.value = columns.value.map(col => {
    col.checked = value
    return col
  })
}

const saveReport = async ({ name, isPublic }: {name: string, isPublic: boolean}) => {
  try {
    const selectedCols: (string|null)[] = columns.value.filter(c => c.checked).map(c => c.value)
    await ReportApi.createReport({
      name,
      isPublic,
      groupBy: groupBy.value,
      aggregateBy: null,
      orderBy: orderBy.value,
      descending: false,
      columns: selectedCols,
      filters: filters.value,
      reportType: "ServiceRequest",
      top: top.value
    })
    toast.success("Saved to My Reports successfully")
  } catch (error) {
    toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
  }
}

</script>
