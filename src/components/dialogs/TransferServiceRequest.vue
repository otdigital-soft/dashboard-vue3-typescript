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
                  <PaperAirplaneIcon class="h-6 w-6 text-blue-400" aria-hidden="true" />
                </div>
                <div class="ml-6 mt-3 text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                    Transfer Service Request
                  </DialogTitle>
                  <div class="mt-6">
                    <p class="text-sm text-gray-500 dark:text-gray-200">
                      You are about to transfer this service request to a new owner. Begin typing a user email below to select a user and then click the Transfer button.
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-200 my-2">
                      In some cases, transfers will be take place automatically. If required by policy, additional approvals may be required.
                    </p>
                  </div>
                  <div class="mt-4">
                    <label class="text-base text-gray-700 dark:text-gray-200">Select new owner</label>
                    <TypeAhead
                      input-classes="bg-white mt-1"
                      :search-function="searchUser"
                      display-field="email"
                      :display-selected-value="true"
                      placeholder="Search users"
                      @selected-value="addUser"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="handleSubmit"
                >
                  Transfer
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import TypeAhead from "../common/TypeAhead.vue"
import userApi from "@/apiResources/userApi"
import type { SimpleUser } from "@/models/simpleUser"
import { ref } from "vue"

const emit = defineEmits<{
  (event: "close"): void
  (event: "transfer", id: SimpleUser): void
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    open: boolean
}>()

const selectedUser = ref<SimpleUser | null>(null)

const searchUser = (query: string) => {
  return userApi.search(query)
}

const addUser = (reviewer: SimpleUser) => {
  selectedUser.value = reviewer
}

const handleSubmit = () => {
  if (selectedUser.value !== null) {
    emit("transfer", selectedUser.value)
  }
}

</script>
