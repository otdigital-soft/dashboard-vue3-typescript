<template>
  <div class="min-h-full flex justify-center sm:px-6 lg:px-8 bg-slate-100">
    <div class="mt-20 w-1/2">
      <div>
        <img class="mx-auto h-12 w-auto" src="/images/horizontal-logo.svg" alt="logo">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Concierge
        </h2>
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
                  Your Invitation
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
            </ul>

            <div v-if="activeTab === 1" class="block space-y-4">
              <span>You are responding to an invitation sent by:</span>
              <div class="mb-1">
                <span class="text-gray-400 block text-sm">Name</span>
                <span class="text-gray-700 block">{{ invitation.senderFirstName }} {{ invitation.senderLastName
                }}</span>
              </div>
              <div class="mb-1">
                <span class="text-gray-400 block text-sm">Email</span>
                <span class="text-gray-700 block">{{ invitation.senderEmail }} </span>
              </div>
              <div class="mb-1">
                <span class="text-gray-400 block text-sm">Organization</span>
                <span class="text-gray-700 block">{{ invitation.senderOrganization }}</span>
              </div>
              <div class="flex flex-row justify-end pt-3">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  @click.prevent="activeTab = 2"
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
            </div>

            <div v-if="activeTab === 2" class="block space-y-6">
              <div v-if="!invitation.requireAzure">
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
                      class="text-gray-400 dark:text-white absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
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
                      class="text-gray-400 dark:text-white absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
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
                      class="text-gray-400 dark:text-white absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
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
                      class="text-gray-400 dark:text-white absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm"
                    >Password</label>
                    <ErrorMessage name="password" class="text-red-700 text-xs font-medium" />
                  </div>
                  <div class="flex flex-row justify-end pt-3">
                    <button
                      type="submit"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create account
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div class="block space-y-6 mt-4">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300" />
                    </div>
                    <div v-if="!invitation.requireAzure" class="relative flex justify-center text-sm">
                      <span class="px-2 bg-white text-gray-500">Or join with</span>
                    </div>
                    <div v-else class="relative flex justify-center text-sm">
                      <span class="px-2 bg-white text-gray-500">Sign in with</span>
                    </div>
                  </div>
                  <div>
                    <div class="mt-4 grid grid-cols-1 gap-3">
                      <div>
                        <button
                          type="button"
                          class="w-full inline-flex justify-center leading-10 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                          @click.prevent="acquireToken"
                        >
                          <span class="sr-only">Join with Microsoft account</span>
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
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { useAccountStore } from "@/stores/account"
import { UserAccountDetail } from "@/models/userAccountDetail"
import type { GraphMeResponse } from "@/models/graph/graphMeResponse"
import useAccount from "@/composables/useAccount"
import { ActiveDirectoryService } from "@/services/activeDirectoryService"
import { PublicClientApplication } from "@azure/msal-browser"
import { useMsalConfigStore } from "@/stores/msalConfig"
import { useToast } from "vue-toastification"
import { useRouter } from "vue-router"
import inviteApi from "@/apiResources/invitationApi"

// Data:
const router = useRouter()

const activeTab = ref(1)
const toast = useToast()
const userAccountDetail = ref(new UserAccountDetail()) // set the default userAccountDetail to reactive, then use it directly in template
const invitation = ref({})

// Computed:
const { join } = useAccountStore()
const { accountInfo } = useAccount()

const props = defineProps<{
  token: string
}>()

// Methods:
const submitRegister = () => {
  join(props.token, userAccountDetail.value)
  router.push("/dashboard")
}

onMounted(async () => {
  try {
    const resp = await inviteApi.getInvitation(props.token)
    invitation.value = resp.data
    userAccountDetail.value.firstName = resp.data.recipientFirstName
    userAccountDetail.value.lastName = resp.data.recipientLastName
    userAccountDetail.value.email = resp.data.recipientEmail
    userAccountDetail.value.culture = getClientLocale()
  } catch (error) {
    toast.error("Invalid invitation token")
  }
})

const getClientLocale = ():string | null => {
  if (typeof Intl !== "undefined") {
    try {
      return Intl.NumberFormat().resolvedOptions().locale
    } catch (err) {
    }
  }
  return null
}

const acquireToken = async () => {
  try {
    const activeDirectoryService = new ActiveDirectoryService()

    const aadConfig = useMsalConfigStore()
    const msalInstance = new PublicClientApplication(aadConfig.msalConfig)

    // get token from microsoft:
    const responseToken = await activeDirectoryService.join(msalInstance)

    // then use the response token to get account info:
    const graphResponse: GraphMeResponse = await activeDirectoryService.callMeEndpoint(responseToken.accessToken)

    // set azure account to our local account detail:
    userAccountDetail.value.firstName = graphResponse.givenName
    userAccountDetail.value.lastName = graphResponse.surname
    userAccountDetail.value.email = graphResponse.mail
    userAccountDetail.value.azureId = graphResponse.id
    userAccountDetail.value.emailVerified = graphResponse.emailVerified
    userAccountDetail.value.department = graphResponse.department
    userAccountDetail.value.city = graphResponse.city
    userAccountDetail.value.state = graphResponse.state
    userAccountDetail.value.country = graphResponse.country
    userAccountDetail.value.officeLocation = graphResponse.officeLocation
    userAccountDetail.value.postalCode = graphResponse.postalCode
    userAccountDetail.value.usageLocation = graphResponse.usageLocation

    // after getting enough information, send register request:
    await join(props.token, userAccountDetail.value)

    router.push("/dashboard")
  } catch (error) {
    toast.error("An unexpected error occurred.")
  }
}
</script>
