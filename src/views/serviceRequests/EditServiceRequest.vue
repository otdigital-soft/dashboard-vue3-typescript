<template>
  <div class="bg-white dark:bg-slate-800 dark:text-white px-4 py-5 border-b border-gray-200 dark:border-gray-600 sm:px-6">
    <Form @submit="submitUpdateServiceRequest">
      <div class="sm:flex sm:items-center pb-6">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">
            {{ isModifyPage ? 'Modify Service Request' : 'Edit Service Request' }}
          </h1>
        </div>
        <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
          <router-link to="/service-requests" class="btn-outline btn-gray mr-2">
            Cancel
            <XMarkIcon class="ml-3 h-5 w-5" />
          </router-link>
          <button class="btn-outline btn-blue" type="submit">
            Save
            <ArrowDownOnSquareIcon class="ml-3 h-5 w-5" />
          </button>
        </div>
      </div>
      <div class="w-full 2xl:w-1/2 xl:w-2/3 lg:5/6">
        <div class="mt-5 mb-10">
          <div class="mt-3 mb-6 relative">
            <Field
              id="name"
              v-model="serviceRequest.name"
              name="name"
              type="text"
              placeholder="Name"
              rules="required"
              class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
            />
            <label
              for="name"
              class="text-gray-500 dark:text-gray-200 absolute left-0 pl-2 -top-5 text-sm transition-all
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                        peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-500
                        peer-focus:text-sm"
            >
              Name
            </label>

            <ErrorMessage name="name" class="text-red-700 text-xs font-medium" />
          </div>

          <div v-if="!isModifyPage" class="mt-1 mb-8">
            <h4 class="text-gray-500 dark:text-gray-200 mb-2">
              Resource lifetime
            </h4>
            <p class="text-xs mb-2">
              The actual lifetime of the resource may be updated by the policy that is applied after submission.
            </p>
            <div v-if="!serviceRequest.unlimitedLifetimeRequested" class="mb-6">
              <div v-if="serviceRequest.lifetimeRequested" class="flex items-end">
                <div class="w-24">
                  <div class="mt-2">
                    <label for="lifetimeType" class="block text-xs  text-gray-700 dark:text-gray-100">Duration</label>
                    <Field
                      id="lifetimeDuration"
                      v-model="serviceRequest.lifetimeRequested.duration"
                      type="number"
                      name="lifetimeDuration"
                      rules="required|minMax:1,365"
                      class="shadow-sm h-9 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-sm px-2 py-2 border  dark:bg-gray-800 dark:border-gray-600"
                    />
                    <ErrorMessage name="lifetimeDuration" class="text-red-700 text-xs font-medium" />
                  </div>
                </div>
                <div class="w-32 ml-2">
                  <Field
                    id="lifetimeType"
                    v-model="serviceRequest.lifetimeRequested.lifetimeType"
                    name="lifetimeType"
                    as="select"
                    rules="required"
                    class="mt-1 block w-full pl-3 pr-10 border-gray-300 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border  dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="Days">
                      Days
                    </option>
                    <option value="Weeks">
                      Weeks
                    </option>
                    <option value="Months">
                      Months
                    </option>
                    <option value="Years">
                      Years
                    </option>
                  </Field>
                </div>
              </div>
            </div>
            <div class="relative flex items-start mt-6">
              <div class="flex items-center h-5">
                <SwitchGroup>
                  <Switch
                    v-model="serviceRequest.unlimitedLifetimeRequested"
                    :class="serviceRequest.unlimitedLifetimeRequested ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'"
                    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    @update:model-value="toggleResourceLifetime"
                  >
                    <span
                      class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      :class="serviceRequest.unlimitedLifetimeRequested ? 'translate-x-5' : 'translate-x-0'"
                    >
                      <span
                        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                        :class="serviceRequest.unlimitedLifetimeRequested ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                        aria-hidden="true"
                      />
                      <span
                        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                        :class="serviceRequest.unlimitedLifetimeRequested ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                        aria-hidden="true"
                      />
                    </span>
                  </Switch>
                </SwitchGroup>
              </div>
              <div class="ml-3 text-sm">
                <p
                  class="text-gray-500 dark:text-gray-200 cursor-pointer"
                  @click="toggleLifetimeSwitch"
                >
                  Request unlimited lifetime
                </p>
              </div>
            </div>
          </div>

          <div class="flex my-10">
            <div>
              <p class="text-gray-500 dark:text-gray-200">
                Status
              </p>
              <Field
                id="status"
                v-model="serviceRequest.status"
                name="status"
                as="select"
                rules="required"
                class="mt-1 block w-full pl-3 h-10 pr-10 bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="">
                  Select
                </option>
                <option v-if="!isModifyPage" value="Draft">
                  Draft
                </option>
                <option value="Submitted">
                  Ready to submit
                </option>
              </Field>
            </div>
            <div v-if="!isModifyPage" class="ml-8 w-60">
              <label for="requestedByDateUtc" class="text-gray-500 dark:text-gray-200 text-sm">
                Requested by date
              </label>

              <Field
                id="requestedByDateUtc"
                v-model="serviceRequest.requestedByDateUtc"
                name="requestedByDateUtc"
                type="datetime-local"
                placeholder="Date needed"
                class="peer h-10 w-full border border-gray-200 px-3 rounded-sm text-gray-800 dark:text-white focus:outline-none focus:border-blue-600 mt-1 dark:bg-gray-800 dark:border-gray-600"
              />

              <ErrorMessage name="neededByDateUtc" class="text-red-700 text-xs font-medium" />
            </div>
            <div v-if="isModifyPage" class="ml-14">
              <p class="text-gray-500 dark:text-gray-200">
                Pending state
              </p>
              <h4 class="text-medium font-semibold">
                {{ serviceRequest.pendingState }}
              </h4>
            </div>
            <div v-if="isModifyPage" class="ml-14">
              <p class="text-gray-500 dark:text-gray-200">
                Expiration
              </p>
              <h4 class="text-medium font-semibold">
                {{ getExpirationDisplay() }}
              </h4>
            </div>
          </div>

          <div class="my-10">
            <label class="text-gray-500 dark:text-gray-200 font-medium text-sm block">
              Resources
            </label>

            <div class="mt-2 mb-4">
              <span v-for="(resource, index) in serviceRequest.requestedResources" :key="index" class="relative mx-2">
                <span
                  class="rounded-md px-3 py-1 italic bg-slate-400 text-slate-50 text-sm cursor-pointer relative"
                  @click="openEditDialog(index)"
                >
                  {{ resource.resourceType }}
                </span>
                <button
                  type="button"
                  class="absolute  bg-orange-400 rounded-full p-1 -mt-2 -ml-2"
                  @click="deleteResource(index)"
                >
                  <XMarkIcon class="w-2 h-2 text-white" />
                </button>
              </span>
            </div>

            <button
              v-if="!isModifyPage"
              class="border flex justify-center hover:bg-gray-600 text-gray-500 dark:hover:bg-gray-400 border-gray-500 dark:border-gray-400 rounded bg-white
                hover:text-white dark:text-gray-200 dark:bg-gray-600 dark:hover:text-gray-100 px-3 py-1 mt-1 "
              @click.prevent="isCreateDialogOpen = true"
            >
              <PlusCircleIcon class="w-5 h-5 mr-1" /> Add resource
            </button>
          </div>
        </div>
        <div v-if="isModifyPage" class="mt-6">
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
                  <CircleStackIcon class="-ml-0.5 mr-2 h-5 w-5" />
                  <span>Deployed Resources</span>
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
                  <DocumentChartBarIcon class="-ml-0.5 mr-2 h-5 w-5" />
                  <span>History</span>
                </button>
              </Tab>
            </TabList>
            <TabPanels class="pt-4">
              <TabPanel>
                <ResourcesDisplay
                  :id="serviceRequest.id"
                  :readonly="true"
                  :resources="serviceRequest.deployedResources"
                />
              </TabPanel>
              <TabPanel>
                <ChangeListDisplay
                  :changes="serviceRequest.changeList"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </Form>

    <CreateResourceDialog :open="isCreateDialogOpen" @close="isCreateDialogOpen = false" @create="addResource" />

    <EditResourceDialog
      :open="isEditDialogOpen"
      :resources="serviceRequest.requestedResources"
      :edit-key="editingResourceKey"
      @close="isEditDialogOpen = false"
      @update="updateResource"
    />
  </div>
</template>

<script setup lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate"
import { onMounted, ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { TabGroup, TabList, TabPanels, TabPanel, Tab, SwitchGroup, Switch } from "@headlessui/vue"
import {
  ArrowDownOnSquareIcon, DocumentChartBarIcon, CircleStackIcon
} from "@heroicons/vue/24/outline"
import { PlusCircleIcon, XMarkIcon } from "@heroicons/vue/20/solid"

import CreateResourceDialog from "@/components/dialogs/CreateResource.vue"
import EditResourceDialog from "@/components/dialogs/EditResource.vue"
import ResourcesDisplay from "@/components/service/ResourcesDisplay.vue"
import ChangeListDisplay from "@/components/service/ChangeListDisplay.vue"
import { useServiceStore } from "@/stores/serviceRequest"
import useService from "@/composables/useService"
import { useAppStore } from "@/stores/app"
import { PendingState, Status } from "@/models/serviceRequests/serviceRequestDetail"
import { DateTime } from "luxon"
import { Lifetime } from "@/models/policies/policyDetail"

const { updateServiceRequest, modifyServiceRequest, fetchServiceRequestById } = useServiceStore()
const route = useRoute()
const router = useRouter()
const { currentServiceRequest: serviceRequest } = useService()
const { setLoading } = useAppStore()

const isCreateDialogOpen = ref(false)
const isEditDialogOpen = ref(false)
const editingResourceKey = ref<number>(-1)

const props = defineProps<{
  id: string
}>()

// Computed:
const isModifyPage = computed(() => route.name === "modify-service-request")

// Methods:
const addResource = (resource: any) => {
  serviceRequest.value.requestedResources.push(resource)
  isCreateDialogOpen.value = false
}

const updateResource = (newResources: any) => {
  serviceRequest.value.requestedResources = newResources
  isEditDialogOpen.value = false
}

const submitUpdateServiceRequest = async () => {
  setLoading(true)
  if (isModifyPage.value) {
    await modifyServiceRequest(props.id, serviceRequest.value).then(() => {
      setLoading(false)
      router.push("/service-requests")
    })
  } else {
    await updateServiceRequest(props.id, serviceRequest.value).then(() => {
      setLoading(false)
      router.push("/service-requests")
    })
  }
}

const openEditDialog = (index: number) => {
  editingResourceKey.value = index
  isEditDialogOpen.value = true
}

const deleteResource = (index: number) => {
  serviceRequest.value.requestedResources.splice(index, 1)
}

// Hook:
onMounted(() => {
  fetchServiceRequestById(props.id).then(() => {
    if (isModifyPage.value) {
      serviceRequest.value.status = Status.Submitted
      serviceRequest.value.pendingState = PendingState.Modify
    }
  })
})

const getExpirationDisplay = (): string => {
  if (serviceRequest.value.expirationDateSet) {
    if (serviceRequest.value.expirationDateUtc) {
      return DateTime.fromISO(serviceRequest.value.expirationDateUtc).toLocaleString(DateTime.DATE_FULL)
    } else {
      return "Never"
    }
  } else {
    return "Not Set"
  }
}

const toggleResourceLifetime = () => {
  if (serviceRequest.value.unlimitedLifetimeRequested) {
    serviceRequest.value.lifetimeRequested = null
  } else {
    const resourceLifetime: Lifetime = new Lifetime()
    serviceRequest.value.lifetimeRequested = resourceLifetime
  }
}

const toggleLifetimeSwitch = () => {
  serviceRequest.value.unlimitedLifetimeRequested = !serviceRequest.value.unlimitedLifetimeRequested
  toggleResourceLifetime()
}

</script>
