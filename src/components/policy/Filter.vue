<template>
  <div class="w-56">
    <Popover v-slot="{open}" class="relative">
      <div>
        <PopoverButton
          class="border hover:bg-gray-600 text-gray-500 dark:hover:bg-gray-400 border-gray-500 dark:border-gray-400 rounded bg-white
          hover:text-white dark:text-gray-200 dark:bg-gray-600 dark:hover:text-gray-100"
        >
          <span class="flex w-full justify-center px-3 py-1 items-center text-sm" @click="resetFilter">
            <PlusCircleIcon class="w-5 h-5 mr-1" aria-hidden="true" />
            Add filter
          </span>
        </PopoverButton>
      </div>

      <div v-if="open && !isFilterClosed">
        <PopoverPanel static class="absolute z-10 w-[450px] rounded-md bg-white px-1 py-2 shadow-lg dark:bg-gray-800 ">
          <!-- Step 1: Select a filter type -->
          <template v-if="selectedFilterType === null">
            <div
              class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-600
              hover:text-white cursor-pointer dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-500"
              @click="selectedFilterType = 'serviceRequest'"
            >
              Service requests
            </div>
            <div
              class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-600
              hover:text-white cursor-pointer dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-500"
              @click="selectedFilterType = 'users'"
            >
              Users
            </div>
          </template>
          <template v-else>
            <!-- Step 2: Select a filter field -->
            <template v-if="selectedFilterField === null">
              <div v-for="(filter, key) in filters[selectedFilterType]" :key="key">
                <div
                  v-if="key !== 'GroupMembership' || userInfo.azureId"
                  class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-500"
                  @click="selectedFilterField = key"
                >
                  {{ filter.name }}
                </div>
              </div>
            </template>
            <!-- Step 3: Select comparison operator -->
            <template v-else-if="selectedFilterComparison === null">
              <div v-if="selectedFilterField === 'GroupMembership'">
                <TypeAhead
                  :search-function="searchADGroup"
                  display-field="displayName"
                  placeholder="Search group by name"
                  @selected-value="selectADGroup"
                />
              </div>
              <template v-else>
                <div
                  v-for="(operator, key) in ComparisonMapper"
                  :key="key"
                  class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-500"
                  @click="selectFilterComparison(key)"
                >
                  {{ operator }}
                </div>
              </template>
            </template>

            <!-- Step 4: Type in filter value -->
            <div v-else-if="selectedFilterComparison !== null" class="px-3 py-3 text-center">
              <Form class="relative" @submit="submitFilter">
                <div class="flex items-center w-full">
                  <span class="mr-2 font-bold">{{ DisplayText.getTypeDisplayText(selectedFilterField) }}</span>
                  <span class="mr-2 italic">{{ ComparisonMapper[selectedFilterComparison] }}</span>

                  <div>
                    <select
                      v-if="selectedFilterType === 'serviceRequest'"
                      v-model="filterValue"
                      class="group flex w-full items-center cursor-pointer capitalize ml-1 border-gray-300 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md px-2 py-2 border dark:bg-gray-800 dark:border-gray-600"
                    >
                      <template v-if="selectedFilterField === 'ResourceType'">
                        <option :value="null" disabled>
                          Select
                        </option>
                        <optgroup label="Popular">
                          <option value="Compute">
                            Compute
                          </option>
                          <option value="Database">
                            Database
                          </option>
                          <option value="Email">
                            Email
                          </option>
                          <option value="Software">
                            Software
                          </option>
                          <option value="Storage">
                            Storage
                          </option>
                          <option value="Web">
                            Web
                          </option>
                        </optgroup>
                        <optgroup label="Others">
                          <option value="Analytics">
                            Analytics
                          </option>
                          <option value="Blockchain">
                            Blockchain
                          </option>
                          <option value="Container">
                            Container
                          </option>
                          <option value="DeveloperTool">
                            Developer tool
                          </option>
                          <option value="DevOps">
                            DevOps
                          </option>
                          <option value="Identity">
                            Identity
                          </option>
                          <option value="Integration">
                            Integration
                          </option>
                          <option value="ManagementTool">
                            Management tool
                          </option>
                          <option value="Media">
                            Media
                          </option>
                          <option value="Migration">
                            Migration
                          </option>
                          <option value="Networking">
                            Networking
                          </option>
                          <option value="Security">
                            Security
                          </option>
                          <option value="Other">
                            Other
                          </option>
                        </optgroup>
                      </template>

                      <template v-else>
                        <option :value="null" selected disabled>
                          Select
                        </option>
                        <option
                          v-for="(filter, index) in filters.serviceRequest[selectedFilterField].options"
                          :key="index"
                          :value="filter"
                        >
                          {{ filter }}
                        </option>
                      </template>
                    </select>
                    <Field
                      v-else
                      id="filterValue"
                      v-model="filterValue"
                      name="filterValue"
                      rules="required"
                      type="text"
                      class="peer h-10 w-full border border-gray-200 dark:border-gray-700 px-3 rounded-sm focus:outline-none focus:border-blue-600 mt-1 dark:bg-gray-800"
                    />
                    <ErrorMessage name="filterValue" class="text-red-700 text-xs font-medium block absolute" />
                  </div>
                </div>
                <button class="mt-4 btn-outline btn-blue">
                  Add
                </button>
              </Form>
            </div>
          </template>
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
import { ComparisonMapper, ADGroup } from "@/models/policies/policyDetail"
import { DisplayText } from "@/services/displayText"
import useUser from "@/composables/useUser"
import useAccount from "@/composables/useAccount"
import TypeAhead from "../common/TypeAhead.vue"
import lookupApi from "@/apiResources/lookupApi"
import { filtersMapper } from "@/models/filtersMapper"
import { pluck } from "ramda"

const emit = defineEmits(["add"])
defineProps({

})

// Composable:
const { userInfo } = useUser()
const { accountInfo } = useAccount()

// Data:
const selectedFilterType = ref(null)
const selectedRequestType = ref(null)
const selectedFilterField = ref(null)
const selectedFilterComparison = ref(null)
const filterValue = ref(null)
const isFilterClosed = ref(false)
const filters = computed(() => {
  const filterList = { ...filtersMapper }
  filterList.serviceRequest.Location.options = pluck("name", accountInfo.value.locations)
  return filterList
})

// Methods:
const resetFilter = () => {
  selectedFilterType.value = null
  selectedRequestType.value = null
  selectedFilterField.value = null
  selectedFilterComparison.value = null
  filterValue.value = null
  isFilterClosed.value = false
}

const noNeedValue = ["IsNull", "IsNotNull"]

const submitFilter = () => {
  if (filterValue.value !== null || (selectedFilterComparison.value && noNeedValue.includes(selectedFilterComparison.value))) {
    emit("add", {
      appliesTo: selectedFilterField.value,
      comparison: selectedFilterComparison.value,
      comparisonValue: filterValue.value,
      comparisonDisplay: filterValue.value
    })
    resetFilter()
    isFilterClosed.value = true
  }
}

const selectFilterComparison = (operator: string) => {
  selectedFilterComparison.value = operator

  if (noNeedValue.includes(operator)) {
    submitFilter()
  }
}

const searchADGroup = (query: string) => {
  return lookupApi.getADGroups(query)
}

const selectADGroup = (group: ADGroup) => {
  filterValue.value = group.displayName
  selectedFilterComparison.value = "Equal"
  submitFilter()
}

</script>
