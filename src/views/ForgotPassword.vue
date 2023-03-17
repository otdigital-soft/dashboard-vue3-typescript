<template>
  <div class="min-h-full flex flex-col justify-center sm:px-6 lg:px-8 bg-slate-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="/images/horizontal-logo.svg" alt="logo">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Forgot Password
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <p class="mb-8">
          Please enter your email address below and click the button. If
          this email address exists at Concierge, you'll receive
          password reset instructions via email.
        </p>
        <Form class="space-y-6" @submit="submit">
          <div>
            <div class="mt-1 relative">
              <Field
                id="email"
                v-model="emailAddress"
                name="email"
                type="email"
                placeholder="Email address"
                autocomplete="email"
                rules="required|email"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
              />
              <label
                for="email"
                class="text-gray-400 absolute left-0 -top-3.5
                        text-sm transition-all peer-placeholder-shown:text-base
                        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5
                        peer-focus:text-gray-400 peer-focus:text-sm"
              >
                Email address
              </label>
              <ErrorMessage name="email" class="text-red-700 text-xs font-medium" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Password Reset Email
            </button>
          </div>

          <div class="text-sm text-center">
            <router-link to="/sign-in" class="font-medium text-blue-600 hover:text-blue-500">
              Return to Sign-in
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { useToast } from "vue-toastification"
import axios from "axios"

// Data:
const toast = useToast()
const emailAddress = ref(null)

const submit = () => {
  axios
    .get(
      `${import.meta.env.VITE_CONCIERGE_API_ENDPOINT}/api/user/request-reset-password/${emailAddress.value}`
    )
    .then(() => {
      toast.success(
        "Please check your mailbox for password reset instuctions"
      )
    })
    .catch(() => {
      toast.error("Failed to send email")
    })
}

</script>

<style scoped>

</style>
