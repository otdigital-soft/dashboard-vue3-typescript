<template>
  <div class="min-h-full flex justify-center sm:px-6 lg:px-8 bg-slate-100">
    <div class="mt-20 w-1/2">
      <div>
        <img class="mx-auto h-12 w-auto" src="/images/horizontal-logo.svg" alt="logo">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" @click="submitRegister">
          Register
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <router-view to="/register" class="font-medium text-blue-600 hover:text-blue-500">
            Create an account for a free 21 day trial.
          </router-view>
        </p>
      </div>

      <div v-if="accountInfo === null" class="mt-8 bg-white p-8">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form action="#" class="space-y-6" @submit="submitRegister">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal "
                  :class="activeTab === 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'"
                  data-toggle="tab"
                  role="tablist"
                  @click="activeTab = 1"
                >
                  Account Info
                </a>
              </li>
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal  "
                  :class="activeTab === 2 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'"
                  data-toggle="tab"
                  role="tablist"
                  @click="activeTab = 2"
                >Your Info</a>
              </li>
              <li v-if="consentTabEnabled" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal  "
                  :class="activeTab === 3 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'"
                  data-toggle="tab"
                  role="tablist"
                  @click="activeTab = 3"
                >Admin Consent</a>
              </li>
            </ul>

            <div v-if="activeTab === 1" class="block space-y-6">
              <div class="mb-3">
                <div class="relative">
                  <Field
                    id="accountName"
                    v-model="userAccountDetail.accountName"
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                    name="accountName"
                    placeholder="Organization name"
                    rules="required"
                  />
                  <label
                    class="text-gray-400  absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm"
                    for="accountName"
                  >Organization name</label>
                  <ErrorMessage name="accountName" class="text-red-700 text-xs font-medium" />
                </div>
              </div>
              <div class="mb-3">
                <label class="text-gray-700 block text-sm font-medium" for="accountType">Account type</label>
                <div class="mt-1 flex items-center justify-between">
                  <div class="flex flex-col items-center">
                    <label class="text-base font-normal mb-1 cursor-pointer">Standard</label>
                    <input
                      v-model="userAccountDetail.accountType"
                      type="radio"
                      name="accountType"
                      value="Standard"
                      class="h-4 w-4 border-blue-600 focus:ring-2 focus:ring-blue-600"
                    >
                  </div>
                  <div class="flex flex-col items-center">
                    <label class="text-base font-normal mb-1 cursor-pointer">Premium</label>
                    <input
                      v-model="userAccountDetail.accountType"
                      type="radio"
                      name="accountType"
                      value="Premium"
                      class="h-4 w-4 border-blue-600 focus:ring-2 focus:ring-blue-600"
                    >
                  </div>
                  <div class="flex flex-col items-center">
                    <label class="text-base font-normal mb-1 cursor-pointer">Enterprise</label><input
                      id="option-disabled"
                      v-model="userAccountDetail.accountType"
                      type="radio"
                      name="accountType"
                      value="Enterprise"
                      class="h-4 w-4 border-blue-600 focus:ring-2 focus:ring-blue-600"
                    >
                  </div>
                </div>
              </div>
              <div class="flex flex-row justify-end pt-3">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  @click.prevent="activeTab = 2"
                >
                  Next<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="ml-2 -mr-1 h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="activeTab === 2" class="block space-y-6">
              <div>
                <div class="mt-5 relative">
                  <Field
                    id="firstName"
                    v-model="userAccountDetail.firstName"
                    type="text"
                    name="firstName"
                    autocomplete="firstName"
                    placeholder="First name"
                    rules="required"
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                  />
                  <label
                    for="firstName"
                    class="text-gray-400 dark:text-white absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm"
                  >First name</label>
                  <ErrorMessage name="firstName" class="text-red-700 text-xs font-medium" />
                </div>
              </div>
              <div>
                <div class="mt-5 relative">
                  <Field
                    id="lastName"
                    v-model="userAccountDetail.lastName"
                    type="text"
                    name="lastName"
                    autocomplete="lastName"
                    placeholder="Last name"
                    rules="required"
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                  />
                  <label
                    for="lastName"
                    class="text-gray-400 dark:text-white absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm"
                  >Last name</label>
                  <ErrorMessage name="lastName" class="text-red-700 text-xs font-medium" />
                </div>
              </div>
              <div>
                <div class="mt-5 relative">
                  <Field
                    id="email"
                    v-model="userAccountDetail.email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    autocomplete="email"
                    rules="required|email"
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                  />
                  <label
                    for="email"
                    class="text-gray-400 dark:text-white absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm"
                  >Email
                    address</label>
                  <ErrorMessage name="email" class="text-red-700 text-xs font-medium" />
                </div>
              </div>
              <div>
                <div class="mt-5 relative">
                  <Field
                    id="password"
                    v-model="userAccountDetail.password"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    placeholder="Password"
                    rules="required|password"
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                  />
                  <label
                    for="password"
                    class="text-gray-400 dark:text-white absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm"
                  >Password</label>
                  <ErrorMessage name="password" class="text-red-700 text-xs font-medium" />
                </div>
                <div class="flex flex-row justify-end pt-3">
                  <button
                    type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="ml-2 -mr-1 h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div class="block space-y-6 mt-4">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300" />
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  <div>
                    <div class="mt-4 grid grid-cols-1 gap-3">
                      <div>
                        <button
                          type="button"
                          class="w-full inline-flex justify-center leading-10 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          @click.prevent="setConsentEnabled"
                        >
                          <span class="sr-only">Register with Microsoft</span>
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
                </div>
              </div>
            </div>
            <div v-if="activeTab === 3" class="block space-y-6">
              <div class="mb-3">
                <div class="mt-5 relative">
                  <p class="text-sm my-3">
                    Before you can create a Concierge account using your Microsoft account, an administrator has to
                    consent
                    to two applications: the Concierge API server and the Concierge client.
                    <a
                      target="_blank"
                      class="underline underline-offset-1 text-blue-700"
                      href="https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent"
                    >Learn
                      more</a>.
                  </p>
                  <h3 class="font-bold mt-8">
                    Consent to API Server
                  </h3>
                  <p class="text-sm my-3">
                    Click the button below to begin the consent process by consenting to the Concierge API Server.
                    After the process, you'll be redirected to this page.
                  </p>
                  <p class="text-sm my-3">
                    If you've already consented, check the box.
                  </p>
                  <div class="flex my-5 items-center place-content-evenly">
                    <div>
                      <a
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        :href="apiConsentUrl"
                      >
                        Consent now
                        <CheckBadgeIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                      </a>
                    </div>
                    <div class="relative flex items-center h-10">
                      <div class="h-5">
                        <input
                          id="consented"
                          v-model="apiConsented"
                          name="consented"
                          type="checkbox"
                          class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        >
                      </div>
                      <div class="ml-3 text-sm h-5">
                        <label for="consented" class="font-medium text-gray-700">I've already consented</label>
                      </div>
                    </div>
                  </div>
                  <div v-if="apiConsented">
                    <h3 class="font-bold mt-8">
                      Consent to Concierge App
                    </h3>
                    <p class="text-sm my-3">
                      Click the button below to continue the consent process by consenting to the Concierge client.
                      After the process, you'll be redirected to this page.
                    </p>
                    <p class="text-sm my-3">
                      If you've already consented, check the box.
                    </p>
                    <div class="flex my-5 items-center place-content-evenly">
                      <div>
                        <a
                          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          :href="appConsentUrl"
                        >
                          Consent now
                          <CheckBadgeIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                        </a>
                      </div>
                      <div class="relative flex items-center h-10">
                        <div class="h-5">
                          <input
                            id="consented"
                            v-model="appConsented"
                            name="consented"
                            type="checkbox"
                            class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          >
                        </div>
                        <div class="ml-3 text-sm h-5">
                          <label for="consented" class="font-medium text-gray-700">I've already consented</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="apiConsented && appConsented" class="mt-10">
                    <h3 class="font-bold mt-8">
                      Congratulations!
                    </h3>
                    <p>Now, log in with your personal Microsoft account to create your Concierge account.</p>
                    <div class="flex justify-center items-center mt-4">
                      <div class="mr-3 text-sm">
                        Click to log in with
                      </div>
                      <button
                        type="button"
                        :disabled="!apiConsented"
                        class="inline-flex justify-center leading-10 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        @click.prevent="acquireToken"
                      >
                        <span class="sr-only">Register with Microsoft</span>
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
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div v-else class="mt-8">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="flex justify-center flex-col">
            <p class="mt-1 font-normal text-center">
              Account Created Successfully!
            </p>
          </div>
          <div class="pt-3">
            <p class="mb-2">
              Account name: {{ accountInfo.name }}
            </p>
            <p class="mb-2">
              Account type: {{ accountInfo.accountType }}
            </p>
            <p class="mb-2">
              First name: {{ accountInfo.firstName }}
            </p>
            <p class="mb-2">
              Last name: {{ accountInfo.lastName }}
            </p>
            <p class="mb-2">
              Email: {{ accountInfo.email }}
            </p>
          </div>
          <div class="flex flex-row justify-end pt-3">
            <router-link
              to="/dashboard"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </router-link>
          </div>
        </div>
      </div>
      <div class="text-center text-sm mt-8">
        Already have an account? <router-link
          to="/sign-in"
          class="decoration-solid underline underline-offset-1 text-blue-700 font-bold"
        >
          Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { UserAccountDetail } from "@/models/userAccountDetail"
import type { GraphMeResponse } from "@/models/graph/graphMeResponse"
import useAccount from "@/composables/useAccount"
import { ActiveDirectoryService } from "@/services/activeDirectoryService"
import { PublicClientApplication, type AuthenticationResult } from "@azure/msal-browser"
import { useMsalConfigStore } from "@/stores/msalConfig"
import { useToast } from "vue-toastification"
import { CheckBadgeIcon } from "@heroicons/vue/20/solid"
import { useAccountSettingsStore } from "@/stores/accountSettings"

// Data:
const activeTab = ref(1)
const toast = useToast()
const apiConsentUrl = ref(import.meta.env.VITE_API_CONSENT_URL)
const appConsentUrl = ref(import.meta.env.VITE_APP_CONSENT_URL)
const apiConsented = ref(false)
const appConsented = ref(false)
const userAccountDetail = ref(new UserAccountDetail()) // set the default userAccountDetail to reactive, then use it directly in template
const consentTabEnabled = ref(false)

// Computed:
const { register } = useAccountSettingsStore()
const { accountInfo } = useAccount()

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.has("state") && !urlParams.has("error")) {
  if (urlParams.get("state") === "api-consent") {
    localStorage.setItem("api-consent", "true")
  } else if (urlParams.get("state") === "app-consent") {
    localStorage.setItem("app-consent", "true")
  }
}

if (localStorage.getItem("api-consent") === "true") {
  apiConsented.value = true
  consentTabEnabled.value = true
}
if (localStorage.getItem("app-consent") === "true") {
  appConsented.value = true
  consentTabEnabled.value = true
}

// Methods:

const getClientLocale = ():string | null => {
  if (typeof Intl !== "undefined") {
    try {
      return Intl.NumberFormat().resolvedOptions().locale
    } catch (err) {
    }
  }
  return null
}

const setConsentEnabled = () => {
  consentTabEnabled.value = true
  activeTab.value = 3
}

const submitRegister = () => {
  userAccountDetail.value.culture = getClientLocale()
  register(userAccountDetail.value)
}

const acquireToken = async () => {
  try {
    localStorage.removeItem("api-consent")
    localStorage.removeItem("app-consent")
    const activeDirectoryService = new ActiveDirectoryService()

    const aadConfig = useMsalConfigStore()
    const msalInstance = new PublicClientApplication(aadConfig.msalConfig)

    // get token from microsoft:
    const responseToken: AuthenticationResult = await activeDirectoryService.consent(msalInstance)

    // then use the response token to get account info:
    const graphResponse: GraphMeResponse = await activeDirectoryService.callMeEndpoint(responseToken.accessToken)

    // set azure account to our local account detail:
    userAccountDetail.value.firstName = graphResponse.givenName
    userAccountDetail.value.lastName = graphResponse.surname
    userAccountDetail.value.email = graphResponse.mail
    userAccountDetail.value.azureId = graphResponse.id
    userAccountDetail.value.emailVerified = true
    userAccountDetail.value.title = graphResponse.jobTitle
    userAccountDetail.value.department = graphResponse.department
    userAccountDetail.value.city = graphResponse.city
    userAccountDetail.value.state = graphResponse.state
    userAccountDetail.value.country = graphResponse.country
    userAccountDetail.value.officeLocation = graphResponse.officeLocation
    userAccountDetail.value.postalCode = graphResponse.postalCode
    userAccountDetail.value.usageLocation = graphResponse.usageLocation
    userAccountDetail.value.tenantId = responseToken.tenantId
    userAccountDetail.value.culture = getClientLocale()

    // after getting enough information, send register request:
    await register(userAccountDetail.value)
  } catch (error) {
    toast.error("An unexpected error occurred.")
  }
}
</script>
