<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Service Requests
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="btn-outline btn-gray mr-2" @click="sidebarOpen=true">
          Options
          <CogIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          type="button"
          class="btn-outline btn-blue mr-2"
          :class="!groupBy? 'opacity-50 cursor-not-allowed' : ''"
          :disabled="!groupBy"
          @click="viewData"
        >
          View
          <DocumentChartBarIcon class="ml-3 h-5 w-5" />
        </button>
        <button
          type="button"
          class="btn-outline btn-green mr-2"
          :class="!groupBy? 'opacity-50 cursor-not-allowed' : ''"
          :disabled="!groupBy"
          @click="handleExport"
        >
          Export
          <DocumentArrowDownIcon class="ml-3 h-5 w-5" />
        </button>
        <SaveReportNav :group-by="groupBy" :detail="false" @save-report="saveReport" />
      </div>
    </div>
    <div v-if="(readyToView || reportItems.length > 0) && copyGroupBy" class="mt-14">
      <div class="max-w-lg m-auto">
        <ReportSummaryPieChart
          :items="reportItems"
          :group-by="copyGroupBy"
          data-key="itemCount"
        />
      </div>
      <div class="mt-8">
        <GroupView
          :table-columns="columns"
          :items="reportItems"
          :group-by="copyGroupBy"
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
                          <Form @submit="viewData">
                            <div class="flex items-center">
                              <label for="top" class="w-24 shrink-0 text-gray-500 dark:text-gray-200">Top</label>
                              <Field
                                id="top"
                                v-model="top"
                                name="top"
                                placeholder="10"
                                type="number"
                                class="block w-full pl-3 h-10 pr-10 bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                              />
                            </div>
                            <div class="flex items-center mt-4">
                              <label for="groupBy" class="w-24 shrink-0 text-gray-500 dark:text-gray-200">Group by</label>
                              <Field
                                id="groupBy"
                                v-model="groupBy"
                                name="groupBy"
                                as="select"
                                rules="required"
                                class="block w-full pl-3 h-10 pr-10 bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                              >
                                <option value="">
                                  None
                                </option>
                                <option v-for="col in groupbyColumns" :key="col.value" :value="col.value">
                                  {{ col.label }}
                                </option>
                              </Field>
                            </div>
                            <ErrorMessage name="groupBy" class="text-red-700 text-xs font-medium" />
                            <div class="flex items-center mt-4">
                              <label for="orderBy" class="w-24 shrink-0 text-gray-500 dark:text-gray-200">Order by</label>
                              <Field
                                id="orderBy"
                                v-model="orderBy"
                                name="orderBy"
                                as="select"
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
                                <option value="expirationDate">
                                  Expiration date
                                </option>
                                <option value="policy">
                                  Policy
                                </option>
                                <option value="status">
                                  Status
                                </option>
                                <option value="pendingState">
                                  Pending state
                                </option>
                                <option value="requestedResources">
                                  Requested resources
                                </option>
                                <option value="deployedResources">
                                  Deployed resources
                                </option>
                              </Field>
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
                                <ReportFilterView report-type="reportsServiceRequest" @add="addFilter" />
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
                                        {{ DisplayText.getComparisonDisplayText(filter.comparison?.toString()) }}
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
                            <div class="flex items-center mt-8">
                              <button
                                class="btn-outline btn-blue"
                                :class="!groupBy? 'opacity-50 cursor-not-allowed' : ''"
                                :disabled="!groupBy"
                                type="submit"
                              >
                                View
                                <DocumentChartBarIcon class="ml-3 h-5 w-5" />
                              </button>
                            </div>
                          </Form>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, SwitchGroup, SwitchLabel, Switch } from "@headlessui/vue"
import { XMarkIcon, DocumentArrowDownIcon, DocumentChartBarIcon, CogIcon } from "@heroicons/vue/24/outline"
import { Field, Form, ErrorMessage, useForm, useField } from "vee-validate"
import { DisplayText } from "@/services/displayText"
import { useToast } from "vue-toastification"
import { path } from "ramda"
import ReportApi from "@/apiResources/reportApi"
import { ReportFilter } from "@/models/reports/reportFilter"
import ReportFilterView from "@/components/report/ReportFilter.vue"
import GroupView from "@/components/report/GroupView.vue"
import type { ReportColumn } from "@/models/reports/reportColumn"
import SaveReportNav from "@/components/report/SaveReportNav.vue"
import ReportSummaryPieChart from "@/components/charts/ReportSummaryPie.vue"
import { ServiceRequestGroupbyColumns as groupbyColumns } from "@/models/reports/reportColumn"

const toast = useToast()
const route = useRoute()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sidebarOpen = ref(false)

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
    checked: true
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
    value: "expirationDateUtc",
    name: "Expiration date",
    checked: false
  },
  {
    value: "expirationDateSet",
    name: "Expiration date set",
    checked: false
  },
  {
    value: "policy",
    name: "Policy",
    checked: false
  },
  {
    value: "status",
    name: "Status",
    checked: true
  },
  {
    value: "pendingState",
    name: "Pending state",
    checked: false
  },
  {
    value: "requestedResourceCount",
    name: "Requested resources",
    checked: false
  },
  {
    value: "deployedResourceCount",
    name: "Deployed resources",
    checked: false
  }
])

const { handleSubmit } = useForm()
const { value: groupBy } = useField<string>("groupBy", undefined, {
  initialValue: ""
})
const { value: orderBy } = useField<string>("orderBy")
const { value: top } = useField<number | null>("top")

const copyGroupBy = ref<string>()

const reportItems = ref([])

onMounted(() => {
  updateFromQueryString()
  if (readyToView.value) {
    fetchServiceRequests()
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

  await ReportApi.getServiceRequestFile(top.value, groupBy.value, orderBy.value, orderValue, filtersValue, cols, "csv")
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

const fetchServiceRequests = async () => {
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

  const { data } = await ReportApi.getServiceRequests(top.value, groupBy.value, orderBy.value, orderValue, filtersValue, cols)
  if (typeof data !== "undefined" && data.length > 0) {
    reportItems.value = data
    copyGroupBy.value = groupBy.value
  }
  sidebarOpen.value = false
}

const viewData = handleSubmit(() => {
  fetchServiceRequests()
})

const addFilter = (newFilter: any) => {
  filters.value.push(newFilter)
}
const removeFilter = (index: number) => {
  filters.value.splice(index, 1)
}

const readyToView = computed(() => {
  return route.query.filter || route.query.groupBy || route.query.orderBy || route.query.orderByDesc || route.query.top || route.query.columns
})

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
