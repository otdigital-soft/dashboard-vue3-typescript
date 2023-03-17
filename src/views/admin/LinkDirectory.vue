<template>
  <div class="px-6">
    <div class="sm:flex sm:items-center pb-4 mt-4">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Link Azure Active Directory
        </h1>
      </div>
    </div>
    <p class="my-3">
      This operation will link Concierge with your Azure Active Directory. Once you do this, your Concierge
      users will be able to sign in using their Azure Active Directory credentials.
    </p>
    <p class="my-3">
      In addition, Concierge will be able to access your Azure Active Directory groups and users. This will allow
      Concierge to use attributes such as Manager and group members to review and approve service requests. Also,
      user attributes such as name, email address and photos are automatically imported into
      Concierge.
    </p>
    <h2 class="font-bold mt-8 text-xl">
      Getting started
    </h2>
    <p>
      The process requires you to grant Azure AD Admin approval for the Concierge client application and the
      server by clicking two links.
      <a
        target="
      _blank"
        class="underline underline-offset-1 text-blue-700"
        href="https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent"
      >
        Learn
        more
      </a>
    </p>

    <div v-if="!appConsented">
      <h3 class="font-bold mt-8 text-base">
        Consent to API Server
      </h3>
      <p class="text-sm my-3">
        Click the button below to begin the consent process by consenting to the Concierge API Server.
        After the process, you'll be redirected to this page.
      </p>
      <p class="text-sm my-3">
        If you've already consented, check the box.
      </p>
      <div class="w-1/2">
        <div class="flex my-5 items-center place-content-start">
          <div>
            <a
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :href="apiConsentUrl"
            >
              Consent now
              <CheckBadgeIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <div class="relative flex items-center h-10 ml-14">
            <div class="h-5">
              <input
                id="consented"
                v-model="apiConsented"
                name="consented"
                type="checkbox"
                class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                @click="recordApiConsent"
              >
            </div>
            <div class="ml-3 text-sm h-5">
              <label for="consented" class="font-medium text-gray-600 dark:text-gray-500">I've already
                consented</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="apiConsented && !appConsented">
      <h3 class="font-bold mt-8 text-base">
        Consent to Concierge App
      </h3>
      <p class="text-sm my-3">
        Click the button below to continue the consent process by consenting to the Concierge client.
        After the process, you'll be redirected to this page.
      </p>
      <div class="w-1/2">
        <div class="flex my-5 items-center place-content-start">
          <div>
            <a
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :href="appConsentUrl"
            >
              Consent now
              <CheckBadgeIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="appConsented && apiConsented">
      <h3 class="font-bold mt-8 text-base">
        Link Complete
      </h3>
      <p class="mt-3">
        Congratulations!
        Your Azure Active Directory is now linked with CloudScope Concierge.
      </p>
      <p class="mt-3">
        You can manage this on the <router-link to="/admin/settings" class="text-blue-600">
          Settings page
        </router-link>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CheckBadgeIcon } from "@heroicons/vue/20/solid"
import { useAccountSettingsStore } from "@/stores/accountSettings"

const apiConsentUrl = ref(import.meta.env.VITE_LINK_API_CONSENT_URL)
const appConsentUrl = ref(import.meta.env.VITE_LINK_APP_CONSENT_URL)
const apiConsented = ref(false)
const appConsented = ref(false)

const { setTenantId } = useAccountSettingsStore()

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
}
if (localStorage.getItem("app-consent") === "true") {
  appConsented.value = true
}

const recordApiConsent = () => {
  localStorage.setItem("api-consent", "true")
}

if (apiConsented.value === true && appConsented.value === true) {
  setTenantId(urlParams.get("tenant")).then(() => {
    localStorage.removeItem("api-consent")
    localStorage.removeItem("app-consent")
  })
}

</script>
