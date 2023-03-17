<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
            >
              <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  class="border rounded-md text-gray-500 dark:text-gray-200 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-600"
                  @click="$emit('close')"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="flex items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100"
                >
                  <ClockIcon class="h-6 w-6 text-blue-400" aria-hidden="true" />
                </div>
                <div class="ml-6 mt-3 text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                    Extend Service Request
                  </DialogTitle>
                  <div class="mt-6">
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      If you are still using the resources in a Service Request, you can request an extension.  The maximum length of the extension is
                      determined by the organizational policy that is applied to your Service Request.
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-200 mt-4 mb-3 font-semibold">
                      Current policy limit: {{ getLifetimeDisplay(resourceLifetime) }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-200 my-2">
                      In some cases, extensions will be applied automatically. If required by policy, additional approvals may be required.
                    </p>
                    <Form @submit="handleSubmit">
                      <div class="py-2">
                        <h5 class="text-base text-gray-700 dark:text-gray-200">
                          Request extension
                        </h5>
                        <div v-if="unlimitedResourceLifetime" class="relative flex items-start my-4">
                          <div class="flex items-center h-5">
                            <SwitchGroup>
                              <Switch
                                v-model="requestedUnlimitedResourceLifetime"
                                :class="requestedUnlimitedResourceLifetime ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'"
                                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                @update:model-value="toggleResourceLifetime"
                              >
                                <span
                                  class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                  :class="requestedUnlimitedResourceLifetime ? 'translate-x-5' : 'translate-x-0'"
                                >
                                  <span
                                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                    :class="requestedUnlimitedResourceLifetime ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                                    aria-hidden="true"
                                  />
                                  <span
                                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                    :class="unlimitedResourceLifetime ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Switch>
                            </SwitchGroup>
                          </div>
                          <div class="ml-3 text-sm">
                            <p
                              class="text-gray-500 dark:text-gray-100"
                              @click="requestedUnlimitedResourceLifetime = !requestedUnlimitedResourceLifetime"
                            >
                              Request unlimited lifetime
                            </p>
                          </div>
                        </div>
                        <div v-if="!requestedUnlimitedResourceLifetime" class="my-4">
                          <div v-if="requestedResourceLifetime" class="flex items-end">
                            <div class="w-24">
                              <div class="mt-2">
                                <label for="lifetimeType" class="block text-xs  text-gray-700 dark:text-gray-100">Lifetime duration</label>
                                <Field
                                  id="lifetimeDuration"
                                  v-model="requestedResourceLifetime.duration"
                                  type="number"
                                  name="lifetimeDuration"
                                  rules="required|minMax:1,365"
                                  class="shadow-sm h-9 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm
                                 border-gray-300 rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600
                                 text-gray-900 dark:text-gray-200"
                                />
                                <ErrorMessage name="lifetimeDuration" class="text-red-700 text-xs font-medium" />
                              </div>
                            </div>
                            <div class="w-32 ml-2">
                              <Field
                                id="lifetimeType"
                                v-model="requestedResourceLifetime.lifetimeType"
                                name="lifetimeType"
                                as="select"
                                rules="required"
                                class="mt-1 block w-full pl-3 pr-10 border-gray-300 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border
                               dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                              >
                                <option v-for="(type, key) in LifetimeType" :key="key" :value="type">
                                  {{ type }}
                                </option>
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>

              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="handleSubmit"
                >
                  Request Extension
                </button>
                <button
                  ref="cancelButtonRef"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm  text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 bg-white border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
                  @click="$emit('close')"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {
  Switch,
  SwitchGroup,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from "@headlessui/vue"
import { XMarkIcon, ClockIcon } from "@heroicons/vue/24/outline"
import { Lifetime, LifetimeType, LifetimeUpdate } from "@/models/policies/policyDetail"
import { Field, Form, ErrorMessage } from "vee-validate"
import { useToast } from "vue-toastification"

const toast = useToast()

const emit = defineEmits<{
  (event: "close"): void
  (event: "extend", id: LifetimeUpdate): void
}>()

const props = defineProps<{
  open: boolean,
  unlimitedResourceLifetime: boolean
  resourceLifetime: Lifetime | null
}>()

const requestedUnlimitedResourceLifetime = ref(false)
const requestedResourceLifetime = ref<Lifetime | null>(new Lifetime())

const getLifetimeDisplay = (lifetime: Lifetime | null) => {
  if (lifetime !== null) {
    return `${lifetime.duration} ${lifetime.lifetimeType}`
  } else {
    return "Unlimited"
  }
}

const toggleResourceLifetime = () => {
  if (requestedUnlimitedResourceLifetime.value) {
    requestedResourceLifetime.value = null
  } else {
    const resourceLifetime: Lifetime = new Lifetime()
    requestedResourceLifetime.value = resourceLifetime
  }
}

const calculateLifetime = (unlimitedLifetime: boolean, lifeTime: Lifetime | null) => {
  if (unlimitedLifetime || lifeTime === null) {
    return 11000
  } else {
    switch (lifeTime.lifetimeType) {
      case LifetimeType.Days:
        return lifeTime.duration
      case LifetimeType.Weeks:
        return lifeTime.duration * 7
      case LifetimeType.Months:
        return lifeTime.duration * 30
      case LifetimeType.Years:
        return lifeTime.duration * 365
    }
  }
}

const handleSubmit = () => {
  const policyLifetime = calculateLifetime(props.unlimitedResourceLifetime, props.resourceLifetime)
  const requestedLifetime = calculateLifetime(requestedUnlimitedResourceLifetime.value, requestedResourceLifetime.value)
  if (requestedLifetime > policyLifetime) {
    toast.warning("Requested lifetime cannot exceed maximum lifetime")
  } else {
    const lifetimeUpdate: LifetimeUpdate = new LifetimeUpdate()
    lifetimeUpdate.unlimitedResourceLifetime = requestedUnlimitedResourceLifetime.value
    lifetimeUpdate.resourceLifetime = requestedResourceLifetime.value

    emit("extend", lifetimeUpdate)
  }
}

</script>

<style scoped>

</style>
