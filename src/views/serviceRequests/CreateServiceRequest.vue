ServiceRequestDetail<template>
  <div class="bg-white dark:bg-slate-800 dark:text-white px-4 py-5 border-b border-gray-200 dark:border-gray-600 sm:px-6">
    <Form @submit="submitCreateServiceRequest">
      <div class="sm:flex sm:items-center pb-6">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">
            Create service request
          </h1>
        </div>
        <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="submit"
            class="btn-outline btn-blue "
            :class="isLoading? 'opacity-50 cursor-not-allowed' : ''"
            :disabled="isLoading"
          >
            Save
            <ArrowDownOnSquareIcon class="ml-3 h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="w-full 2xl:w-1/2 xl:w-2/3 lg:5/6">
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

        <div class="mt-1 mb-8">
          <h4 class="font-medium text-gray-500 dark:text-gray-200 mb-2">
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
                  <option v-for="(type, key) in LifetimeType" :key="key" :value="type">
                    {{ type }}
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

        <div class="mt-1 mb-6 columns-2">
          <div>
            <label for="status" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
              Status
            </label>

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
              <option value="Draft">
                Draft
              </option>
              <option value="Submitted">
                Ready to submit
              </option>
            </Field>
          </div>

          <div>
            <label for="requestedByDateUtc" class="text-gray-600 dark:text-white font-medium text-sm">
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
        </div>

        <div class="mt-1 mb-6">
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
                class="absolute bg-red-400 hover:bg-red-600 rounded-full p-1 -mt-2 -ml-2"
                @click="deleteResource(index)"
              >
                <XMarkIcon class="w-2 h-2 text-white" />
              </button>
            </span>
          </div>

          <button
            class="border flex justify-center hover:bg-gray-600 text-gray-500 dark:hover:bg-gray-400 border-gray-500 dark:border-gray-400 rounded bg-white
          hover:text-white dark:text-gray-200 dark:bg-gray-600 dark:hover:text-gray-100 px-3 py-1 mt-1 "
            @click.prevent="isCreateDialogOpen = true"
          >
            <PlusCircleIcon class="w-5 h-5 mr-1" /> Add resource
          </button>
        </div>
      </div>
    </Form>

    <CreateResourceDialog :open="isCreateDialogOpen" @close="isCreateDialogOpen = false" @create="addResource" />

    <EditResourceDialog
      :open="isEditDialogOpen"
      :resources="serviceRequest.requestedResources"
      :selected-type="selectedResourceType"
      :edit-key="editingResourceKey"
      @close="isEditDialogOpen = false"
      @update="updateResource"
    />
  </div>
</template>

<script setup lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { SwitchGroup, Switch } from "@headlessui/vue"
import { ServiceRequestDetail } from "@/models/serviceRequests/serviceRequestDetail"
import { Lifetime, LifetimeType } from "@/models/policies/policyDetail"
import { ArrowDownOnSquareIcon } from "@heroicons/vue/24/outline"
import { PlusCircleIcon, XMarkIcon } from "@heroicons/vue/20/solid"
import CreateResourceDialog from "@/components/dialogs/CreateResource.vue"
import EditResourceDialog from "@/components/dialogs/EditResource.vue"
import { useServiceStore } from "@/stores/serviceRequest"
import { useAppStore } from "@/stores/app"

const { createServiceRequest } = useServiceStore()
const router = useRouter()
const serviceRequest = ref<ServiceRequestDetail>(new ServiceRequestDetail())

const isCreateDialogOpen = ref(false)
const isEditDialogOpen = ref(false)
const editingResourceKey = ref<number>(-1)
const selectedResourceType = ref<string>("")
const { setLoading, isLoading } = useAppStore()

// Methods:
const addResource = (resource: any) => {
  serviceRequest.value.requestedResources.push(resource)
  isCreateDialogOpen.value = false
}

const updateResource = (newResources: any) => {
  serviceRequest.value.requestedResources = newResources
  isEditDialogOpen.value = false
}

const submitCreateServiceRequest = () => {
  setLoading(true)
  createServiceRequest(serviceRequest.value)
    .then(() => {
      router.push("/service-requests")
    })
    .finally(() => {
      setLoading(false)
    })
}

const openEditDialog = (index: number) => {
  editingResourceKey.value = index
  selectedResourceType.value = serviceRequest.value.requestedResources[index].resourceType
  isEditDialogOpen.value = true
}

const deleteResource = (index: number) => {
  serviceRequest.value.requestedResources.splice(index, 1)
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
