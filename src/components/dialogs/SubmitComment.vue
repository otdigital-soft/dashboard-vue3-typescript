<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="handleClose">
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex items-center justify-center">
          <DialogPanel class="w-full max-w-lg rounded bg-white dark:bg-gray-700 p-4 pt-6">
            <DialogTitle class="font-bold text-xl text-gray-500 dark:text-gray-200 mb-4">
              Submit feedback
            </DialogTitle>
            <DialogDescription class="mt-3 relative">
              <Form action="#" @submit="sendMessage">
                <div class="mt-8 relative">
                  <Field
                    id="message"
                    v-model="message"
                    class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                    name="message"
                    placeholder="message"
                  />
                  <label
                    class="text-gray-400  absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm"
                    for="message"
                  >Message (optional)</label>
                  <ErrorMessage name="message" class="text-red-700 text-xs font-medium" />
                </div>

                <div class="flex justify-end mt-12">
                  <button
                    class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm bg-white
                   border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
                    type="button"
                    @click="handleClose"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="transition-all w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </DialogDescription>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild
} from "@headlessui/vue"
import { Field, Form, ErrorMessage } from "vee-validate"

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(["sendMessage", "close"])

const message = ref("")

const sendMessage = () => {
  emit("sendMessage", message.value)
  message.value = ""
}
const handleClose = () => {
  message.value = ""
  emit("close")
}
// Computed:

</script>

<style scoped>

</style>
