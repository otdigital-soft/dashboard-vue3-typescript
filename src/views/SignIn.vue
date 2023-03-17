<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="/images/horizontal-logo.svg" alt="logo">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-view to="/register" class="font-medium text-blue-600 hover:text-blue-500">
          start your 21-day free trial
        </router-view>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Form class="space-y-6" autocomplete="on" @submit="onPasswordSubmit">
          <div>
            <div class="mt-1 relative">
              <Field
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                rules="required|email"
                placeholder="Email address"
                class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
              />
              <label
                for="email"
                class="text-gray-400 absolute left-0 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400
                                peer-focus:text-sm"
              >
                Email address
              </label>
              <ErrorMessage name="email" class="text-red-700 text-xs font-medium" />
            </div>
          </div>
          <div>
            <div class="mt-1 relative">
              <Field
                id="password"
                v-model="password"
                name="password"
                type="password"
                placeholder="Password"
                rules="required|password"
                autocomplete="off"
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
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
              text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-blue-500 cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </Form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Or sign in with
              </span>
            </div>
          </div>

          <div>
            <div class="mt-4 grid grid-cols-1 gap-3">
              <div>
                <button
                  type="button"
                  class="w-full inline-flex justify-center leading-10 py-2 px-4 border
                                            border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium
                                            text-gray-500 hover:bg-gray-50 cursor-pointer"
                  @click="signInAd"
                >
                  <span class="sr-only">
                    Register with Microsoft
                  </span>
                  <img
                    width="40"
                    height="40"
                    src="/images/work_and_school.svg"
                    alt="work and school"
                  >
                  <div class="pl-4">
                    Microsoft account
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="text-sm mt-8 text-center">
            <router-link to="/forgot-password" class="font-medium text-blue-500 hover:text-blue-800">
              Forgot your password?
            </router-link>
            <span class="mx-5">|</span>
            <router-link to="/register" class="font-medium text-blue-500 hover:text-blue-800">
              Create an account
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PublicClientApplication, type AuthenticationResult } from "@azure/msal-browser"
import { useMsalConfigStore } from "@/stores/msalConfig"
import { useUserStore } from "@/stores/user"

import { ref } from "vue"
import { ActiveDirectoryService } from "@/services/activeDirectoryService"
import { ConciergeService } from "@/services/conciergeService"
import type { LoginResponse } from "@/models/loginResponse"
import { useRoute, useRouter } from "vue-router"
import { useToast } from "vue-toastification"
import axios from "axios"
import { Field, Form, ErrorMessage } from "vee-validate"

const aadConfig = useMsalConfigStore()
const userStore = useUserStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const msalInstance = new PublicClientApplication(aadConfig.msalConfig)
const url: string | undefined = import.meta.env.VITE_CONCIERGE_API_ENDPOINT
if (url === undefined) throw new Error("Configuration cannot be null")
const conciergeService = new ConciergeService(url)
const activeDirectoryService = new ActiveDirectoryService()

const email = ref(null)
const password = ref(null)

const onPasswordSubmit = async () => {
  if (email.value !== null && password.value !== null) {
    await conciergeService.loginPassword(email.value, password.value)
      .then((loginResponse: LoginResponse) => {
        userStore.setUser(loginResponse)
        // @ts-ignore
        router.push((route.query?.redirect) || "/dashboard")
      })
      .catch((error: any) => {
        const errorMessage = formatErrorMessage(error)
        toast.error(errorMessage)
      })
  }
}

const formatErrorMessage = (error: any): string => {
  let message = error.message ?? "An unexpected error occurred"
  if (axios.isAxiosError(error) && error.response) {
    const response = error.response as any
    if (response.data) {
      const data = response.data as any
      if (data.errors) {
        const errors = data.errors as any[]
        if (errors && errors.length > 0) {
          message = errors[0].message
        }
      }
    }
  } else message = String(error)
  return message
}

const signInAd = async () => {
  await activeDirectoryService.signIn(msalInstance)
    .then((resp: AuthenticationResult) => {
      aadConfig.setAccessToken(resp.accessToken)
      conciergeService.loginAzure(resp.accessToken)
        .then((loginResponse: LoginResponse) => {
          userStore.setUser(loginResponse)
          // @ts-ignore
          router.push((route.query?.redirect) || "/dashboard")
        }).catch((error: any) => {
          const errorMessage = formatErrorMessage(error)
          toast.error(errorMessage)
        })
    })
    .catch(error => {
      const errorMessage = formatErrorMessage(error)
      toast.error(errorMessage)
    })
}

const setConsentEnabled = (): number => {
  return "okay"
}

</script>
