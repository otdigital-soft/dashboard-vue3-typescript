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
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200 text-center">
                  Save to My Reports
                </DialogTitle>
                <div class="mt-6">
                  <Form>
                    <div class="py-2">
                      <div class="mt-5 relative">
                        <Field
                          id="name"
                          v-model="name"
                          name="name"
                          type="text"
                          placeholder="Name"
                          rules="required"
                          class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                        />
                        <label
                          for="name"
                          class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                              peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                              peer-focus:text-sm"
                        >
                          Report name
                        </label>
                        <ErrorMessage name="city" class="text-red-700 text-xs font-medium" />
                      </div>
                    </div>
                    <div class="py-2">
                      <div class="flex w-full mt-5 relative">
                        <div class="relative inline-flex h-6 mr-4 text-gray-500 dark:text-gray-200">
                          Public:
                        </div>
                        <div class="relative">
                          <Switch
                            v-model="reportActive"
                            class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            :class="reportActive ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-400'"
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                              :class="reportActive ? 'translate-x-5' : 'translate-x-0'"
                            >
                              <span
                                class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                :class="reportActive ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                              />
                              <span
                                class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                :class="reportActive ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                              />
                            </span>
                          </Switch>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="saveToMy"
                >
                  Save
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
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from "@headlessui/vue"
import { XMarkIcon } from "@heroicons/vue/24/outline"
import { Field, Form, ErrorMessage } from "vee-validate"

const emit = defineEmits(["close", "save-report"])
defineProps<{
    open: boolean
  }>()

const name = ref(null)
const reportActive = ref(false)

const saveToMy = () => {
  if (name.value !== null) {
    emit("save-report", {
      name: name.value,
      isPublic: reportActive.value
    })
    emit("close")
  }
}

</script>

  <style scoped>

  </style>
