<template>
  <div class="min-h-full flex flex-col justify-center sm:px-6 lg:px-8 bg-slate-100">
    <div class="sm:mx-auto sm:max-w-xl">
      <img class="mx-auto h-12 w-auto" src="/images/horizontal-logo.svg" alt="logo">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Verify Email
      </h2>
    </div>

    <div v-if="verificationComplete" class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="verified" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Email verified
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>Thank you for verifying your email address.</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Your email could not be verified
              </h3>
              <div class="mt-2 text-sm text-red-700">
                <div class="mt-2 text-sm text-red-700">
                  <p>The token may either be invalid or expired.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="flex-1 flex items-center justify-center text-xl font-bold text-gray-500">
          Loading...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import axios from "axios"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/20/solid"

const route = useRoute()
const verificationComplete = ref(false)
const verified = ref(false)

onMounted(() => {
  axios
    .post(
        `${import.meta.env.VITE_CONCIERGE_API_ENDPOINT}/api/user/verify-email/${route.params.token}`
    )
    .then(() => {
      verificationComplete.value = true
      verified.value = true
    })
    .catch(() => {
      verificationComplete.value = true
      verified.value = false
    })
})

</script>

<style scoped>

</style>
