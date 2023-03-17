<template>
  <div class="min-h-full flex flex-col justify-center sm:px-6 lg:px-8 bg-slate-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-xl">
      <img class="mx-auto h-12 w-auto" src="/images/horizontal-logo.svg" alt="logo">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Reset Password
      </h2>
    </div>

    <div v-if="initialQueryComplete" class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="!tokenValid" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Invalid token
              </h3>
              <div class="mt-2 text-sm text-red-700">
                <p>
                  Your token was either not found or has expired
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tokenValid">
          <p class="mb-8">
            Please enter a new password and confirmation password.
          </p>
          <Form class="space-y-6" @submit="submit">
            <div>
              <div class="mt-1 relative">
                <Field
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autocomplete="password"
                  rules="required|password"
                  class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                />
                <label
                  for="password"
                  class="text-gray-400 absolute left-0 -top-5
                        text-sm transition-all peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5
                        peer-focus:text-gray-400 peer-focus:text-sm"
                >
                  Password
                </label>
                <ErrorMessage name="password" class="text-red-700 text-xs font-medium" />
              </div>
              <div class="mt-8 relative">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  rules="required|confirmed:password"
                  class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                />
                <label
                  for="confirmPassword"
                  class="text-gray-400 absolute left-0 -top-5
                        text-sm transition-all peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5
                        peer-focus:text-gray-400 peer-focus:text-sm"
                >
                  Confirm password
                </label>
                <ErrorMessage name="confirmPassword" class="text-red-700 text-xs font-medium" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
            <div v-if="passwordReset" class="text-center text-sm mt-8">
              <router-link to="/sign-in" class="decoration-solid underline underline-offset-1 text-blue-700 font-bold">
                Return to Sign in
              </router-link>
            </div>
          </Form>
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
import { Field, Form, ErrorMessage } from "vee-validate"
import { useToast } from "vue-toastification"
import axios from "axios"
import { XCircleIcon } from "@heroicons/vue/20/solid"

const route = useRoute()
const toast = useToast()
const password = ref(null)
const tokenValid = ref(false)
const passwordReset = ref(false)
const initialQueryComplete = ref(false)

onMounted(() => {
  axios
    .get(
        `${import.meta.env.VITE_CONCIERGE_API_ENDPOINT}/api/user/validate-token/${route.params.token}`
    )
    .then(() => {
      tokenValid.value = true
      initialQueryComplete.value = true
    })
    .catch(() => {
      initialQueryComplete.value = true
    })
})

const submit = () => {
  axios
    .post(
            `${import.meta.env.VITE_CONCIERGE_API_ENDPOINT}/api/user/reset-password`, {
              token: route.params.token,
              password: password.value
            }
    )
    .then(() => {
      passwordReset.value = true
      toast.success(
        "Your password has been changed.  Please sign-in."
      )
    })
    .catch(() => {
      toast.error("Failed to reset password")
    })
}

</script>

<style scoped>

</style>
