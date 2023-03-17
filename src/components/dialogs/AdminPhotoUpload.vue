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
              class="relative bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-[700px]"
            >
              <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  class="text-gray-500 dark:text-gray-200 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-600"
                  @click="$emit('close')"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="w-full">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200 flex mb-5 items-center">
                    <div class="bg-blue-400 h-10 w-10 rounded-full align-center flex items-center justify-center mr-3">
                      <CloudArrowUpIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Upload your organization logo
                  </DialogTitle>
                  <div ref="dropzoneInput" class="mt-2 w-full text-gray-500 dark:text-gray-200">
                    <form
                      id="dropzoneForm"
                      action="#"
                      class="dropzone border-2 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm bg-white border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
                  @click="$emit('close')"
                >
                  Cancel
                </button>
                <button
                  ref="confirmBtn"
                  type="button"
                  class="mt-3 mr-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
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
import { getToken } from "@/services/jwt.service"
import { useAccountSettingsStore } from "@/stores/accountSettings"
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { toRef, watch, ref } from "vue"
import Dropzone from "dropzone"
import "dropzone/dist/dropzone.css"
import { useToast } from "vue-toastification"
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.css"

const emit = defineEmits(["close"])
const props = defineProps<{
    open: boolean
}>()
const toast = useToast()
const isOpen = toRef(props, "open")
const dropzoneInput = ref(null)
const confirmBtn = ref(null)

const { getAccountSettings } = useAccountSettingsStore()

const API_URL = import.meta.env.VITE_CONCIERGE_API_ENDPOINT
const dropzoneOptions = {
  url: `${API_URL}/api/account/set-photo`,
  thumbnailWidth: 150,
  maxFilesize: 0.5,
  headers: { Authorization: `Bearer ${getToken()}` },
  acceptedFiles: "image/*",
  transformFile: function (file, done) {
    // Create Dropzone reference for use in confirm button click handler
    const myDropZone = this // eslint-disable-line @typescript-eslint/no-this-alias

    confirmBtn.value.addEventListener("click", function () {
      // Get the canvas with image data from Cropper.js
      const canvas = cropper.getCroppedCanvas({
        width: 320,
        height: 240
      })
      // Turn the canvas into a Blob (file object without a name)
      canvas.toBlob(function (blob) {
        // Create a new Dropzone file thumbnail
        myDropZone.createThumbnail(
          blob,
          myDropZone.options.thumbnailWidth,
          myDropZone.options.thumbnailHeight,
          myDropZone.options.thumbnailMethod,
          false,
          function (dataURL) {
            // Update the Dropzone file thumbnail
            myDropZone.emit("thumbnail", file, dataURL)
            // Return the file to Dropzone
            done(blob)
          }
        )
      })
    })
    // Create an image node for Cropper.js
    const image = new Image()
    image.src = URL.createObjectURL(file)
    dropzoneInput.value.appendChild(image)

    // Create Cropper.js
    const cropper = new Cropper(image, { aspectRatio: 16 / 9 })
  }
}

watch(isOpen, (newVal) => {
  if (newVal) {
    // have to set a small timeout to allow the dialog to render first
    setTimeout(() => {
      const myDropzone = new Dropzone("#dropzoneForm", dropzoneOptions)
      myDropzone.on("success", async () => {
        await getAccountSettings()
        toast.success("Photo uploaded successfully")
        emit("close")
      })
    }, 500)
  }
})

</script>
