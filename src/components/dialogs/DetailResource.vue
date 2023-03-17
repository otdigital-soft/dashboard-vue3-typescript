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
              <Form>
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
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <CubeIcon class="h-6 w-6 text-blue-500" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200 mt-2">
                      Resource Detail
                    </DialogTitle>
                    <TabGroup>
                      <TabList class="-mb-px flex space-x-12 border-b border-gray-200 dark:border-gray-400 mt-5">
                        <Tab
                          v-slot="{ selected }"
                          as="template"
                          class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                        >
                          <button
                            :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                          >
                            <ClipboardDocumentListIcon class="-ml-0.5 mr-2 h-5 w-5" />
                            <span>Common properties</span>
                          </button>
                        </Tab>
                        <Tab
                          v-slot="{ selected }"
                          as="template"
                          class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                        >
                          <button
                            :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                          >
                            <AdjustmentsVerticalIcon class="-ml-0.5 mr-2 h-5 w-5" />
                            <span>Resource properties</span>
                          </button>
                        </Tab>
                      </TabList>
                      <TabPanels class="pt-2">
                        <TabPanel>
                          <div
                            v-for="key of sortByCustomOrder(commonResourceFields, sortOrder)"
                            :key="key"
                            class="mt-4"
                          >
                            <ResourceField
                              :field-key="key"
                              :resource-field="commonResourceFields[key]"
                              :readonly="true"
                              @change="resourceFields[key] = $event"
                            />
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div
                            v-for="key of sortByCustomOrder(customResourceFields, sortOrder)"
                            :key="key"
                            class="mt-4"
                          >
                            <ResourceField
                              :field-key="key"
                              :resource-field="customResourceFields[key]"
                              :readonly="true"
                              @change="resourceFields[key] = $event"
                            />
                          </div>
                        </TabPanel>
                      </TabPanels>
                    </TabGroup>
                  </div>
                </div>

                <div class="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm bg-white border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
                    @click="$emit('close')"
                  >
                    Close
                  </button>
                </div>
              </Form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { CubeIcon, XMarkIcon, AdjustmentsVerticalIcon, ClipboardDocumentListIcon } from "@heroicons/vue/24/outline"
import { Form } from "vee-validate"
import { computed, ref, toRef, watch } from "vue"
import ResourceField from "../common/ResourceField.vue"
import ResourceFieldType, { sortOrder } from "@/models/resourceFieldType"
import { sortByCustomOrder } from "@/common/helper"

defineEmits(["close"])
const props = defineProps<{
  resources: any,
  detailKey: number,
  open: boolean
}>()

const resourceData = toRef(props, "resources")
const detailKey = toRef(props, "detailKey")
const resourceFields = ref<any>({})

const commonResourceFields = computed(() => {
  const fields = [] as any[]
  const entries = Object.entries(resourceFields.value)
  for (const entry of entries) {
    const [key] = entry
    const resourceFieldType = ResourceFieldType[key]
    if (resourceFieldType?.placement === "common") {
      fields.push(entry)
    }
  }
  return Object.fromEntries(fields)
})

const customResourceFields = computed(() => {
  const fields = [] as any[]
  const entries = Object.entries(resourceFields.value)
  for (const entry of entries) {
    const [key] = entry
    const resourceFieldType = ResourceFieldType[key]
    if (resourceFieldType?.placement === "custom") {
      fields.push(entry)
    }
  }
  return Object.fromEntries(fields)
})

// Hook:
watch(detailKey, (newKey) => {
  resourceFields.value = resourceData.value[newKey]
})

</script>
