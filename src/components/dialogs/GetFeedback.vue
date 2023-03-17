<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
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
          <DialogPanel class="w-full max-w-lg  bg-white dark:bg-gray-700 p-4 pt-6 border-blue-600 border-t-4">
            <DialogTitle class="font-bold text-xl text-gray-500 dark:text-gray-200 mb-4">
              How could we improve this page?
            </DialogTitle>
            <DialogDescription class="mt-3 relative">
              <Form @submit="sendFeedback">
                <div class="mt-4 relative">
                  <label
                    class="text-gray-500 dark:text-gray-200 text-sm"
                  >Rate this page</label>
                  <StarRating v-model="reviewer.rating" class="mt-2" />
                </div>
                <div class="mt-5 relative">
                  <label
                    class="text-gray-500 dark:text-gray-200 text-sm"
                    for="comments"
                  >Your feedback</label>
                  <ErrorMessage name="comments" class="text-red-700 text-xs font-medium" />
                  <Field
                    id="comments"
                    v-model="reviewer.comments"
                    class="peer h-20 w-full px-3 py-2 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                    name="comments"
                    as="textarea"
                    placeholder=""
                  />
                </div>

                <div class="flex justify-end mt-12">
                  <button
                    type="button"
                    class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm bg-white
                     border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
                    @click="handleCancel"
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
import { ref, computed } from "vue"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild
} from "@headlessui/vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { useRoute } from "vue-router"
import { useToast } from "vue-toastification"
import StarRating from "@/components/common/StarRating.vue"
import feedbackApi from "@/apiResources/feedbackApi"
import useUser from "@/composables/useUser"

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(["close"])
const { userInfo } = useUser()
const toast = useToast()
const route = useRoute()
const pathRoute = computed(() => route.path)

const reviewer = ref({
  route: pathRoute.value,
  email: userInfo.value.email,
  rating: 0,
  comments: ""
})

const sendFeedback = async () => {
  try {
    await feedbackApi.sendFeedback(reviewer.value)
    toast.success("Thanks for your feedback")
    reviewer.value.comments = ""
    reviewer.value.rating = 0
    emit("close")
  } catch (error: any) {
    toast.error(error.message as string)
  }
}

const handleCancel = () => {
  reviewer.value.comments = ""
  reviewer.value.rating = 0
  emit("close")
}

</script>
