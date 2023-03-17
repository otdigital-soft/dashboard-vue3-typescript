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
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100"
                >
                  <ScissorsIcon class="h-6 w-6 text-red-500" aria-hidden="true" />
                </div>
                <div class="ml-6 mt-3 text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                    Release Service Request
                  </DialogTitle>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      Are you sure you want to release this Service Request? The release process indicates that you are no longer using any of the
                      resources associated with this Service Request.
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-200 my-2">
                      If you are still using some of the resources, you should press Cancel and then <i>Modify</i> the Service Request to remove only the resources no longer in use.
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-200 my-2">
                      Once the release process begins, the resources may eventually be removed or deleted by your organization's IT staff.
                      <span class="font-bold">Recovery may not be possible.</span>
                    </p>
                  </div>
                  <div class="mt-4 flex items-start">
                    <div class="flex items-center">
                      <Switch
                        v-model="readyToRelease"
                        :class="readyToRelease ? 'bg-blue-600':'bg-gray-200 dark:bg-gray-600'"
                        class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <span
                          class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          :class="readyToRelease ? 'translate-x-5' : 'translate-x-0'"
                        >
                          <span
                            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                            :class="readyToRelease ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                            aria-hidden="true"
                          />
                          <span
                            class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                            :class="readyToRelease ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                            aria-hidden="true"
                          />
                        </span>
                      </Switch>
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="resourceLifetime" class="font-medium text-gray-500 dark:text-gray-200">Ready to release</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  :disabled="!readyToRelease"
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 disabled:bg-gray-300 disabled:hover:bg-gray-300 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="$emit('released')"
                >
                  Release
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm bg-white border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
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
import { Switch, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { ScissorsIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { ref } from "vue"

defineEmits(["close", "released"])
defineProps<{
    open: boolean
}>()

const readyToRelease = ref(false)

</script>
