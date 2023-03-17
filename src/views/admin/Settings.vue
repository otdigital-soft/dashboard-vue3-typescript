<template>
  <div class="px-4 sm:px-6 lg:px-8 py-4">
    <Form @submit="handleSubmit">
      <div class="sm:flex sm:items-center pb-6">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold">
            Settings
          </h1>
        </div>
        <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
          <button class="btn-outline btn-blue" type="submit">
            Save Settings
            <ArrowDownOnSquareIcon class="ml-3 h-5 w-5" />
          </button>
        </div>
      </div>
      <TabGroup>
        <TabList class="-mb-px flex space-x-12 border-b border-gray-200 dark:border-gray-400">
          <Tab
            v-slot="{ selected }"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
            >
              <ClipboardDocumentListIcon class="-ml-0.5 mr-2 h-5 w-5" />
              <span>Account</span>
            </button>
          </Tab>
          <Tab
            v-slot="{ selected }"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
            >
              <MapPin class="-ml-0.5 mr-2 h-5 w-5" />
              <span>Locations</span>
            </button>
          </Tab>
          <Tab
            v-slot="{ selected }"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
            >
              <BellIcon class="-ml-0.5 mr-2 h-5 w-5" />
              <span>Notifications</span>
            </button>
          </Tab>
          <Tab
            v-slot="{ selected }"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
            >
              <Network class="-ml-0.5 mr-2 h-5 w-5" />
              <span>Azure Active Directory</span>
            </button>
          </Tab>
          <Tab
            v-slot="{ selected }"
            as="template"
            class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
          >
            <button
              :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
            >
              <DevicePhoneMobileIcon class="-ml-0.5 mr-2 h-5 w-5" />
              <span>External accounts</span>
            </button>
          </Tab>
        </TabList>
        <TabPanels class="pt-6">
          <TabPanel>
            <h3 class="text-base font-semibold mb-4">
              Account
            </h3>
            <GeneralTab
              v-if="accountSettings"
              :name="accountSettings.name"
              :culture="accountSettings.defaultCulture ?? getClientLocale()"
              @update:culture="updateCulture"
              @update:name="updateName"
            />
          </TabPanel>
          <TabPanel>
            <div class="flex content-between items-center w-[400px]">
              <h3 class="text-base font-semibold mb-4">
                Locations
              </h3>
              <div class="ml-auto">
                <button type="button" class="btn-outline-sm btn-blue text-sm" @click="addLocation">
                  Add Location
                  <PlusIcon class="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            <div v-if="accountSettings && accountSettings.locations" class="w-[400px]">
              <fieldset
                v-for="(location, idx) in accountSettings.locations"
                :key="idx"
                class="p-6 border-solid border-gray-300 border my-3 relative dark:border-gray-600"
              >
                <legend>Location #{{ idx+1 }}</legend>
                <button class="btn-outline-sm btn-red absolute top-1 right-2" @click="removeLocation(idx)">
                  <XMarkIcon class="h-4 w-4" />
                </button>
                <div>
                  <label class="text-gray-600 dark:text-white font-medium text-sm">
                    Name
                  </label>
                  <input
                    v-model="location.name"
                    type="text"
                    placeholder="Name"
                    required
                    class="peer h-10 w-full border border-gray-200 px-3 rounded-sm text-sm focus:outline-none focus:border-blue-600 mt-1 dark:bg-gray-800 dark:border-gray-600"
                  >
                </div>
                <div class="mt-4">
                  <label class="text-gray-600 dark:text-white font-medium text-sm">
                    Type
                  </label>
                  <select
                    v-model="location.type"
                    class="mt-1 block w-full pl-3 pr-10 border-gray-300 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="">
                      Select a location
                    </option>
                    <option value="Amazon">
                      Amazon
                    </option>
                    <option value="Azure">
                      Azure
                    </option>
                    <option value="Google">
                      Google
                    </option>
                    <option value="Internal">
                      Internal
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </fieldset>
            </div>
          </TabPanel>
          <TabPanel>
            <h3 class="text-base font-semibold mb-4">
              Account Notifications
            </h3>
            <NotificationSettingsUI
              v-if="accountSettings"
              v-model:reminder-email-interval="accountSettings.notificationSettings.reminderEmailInterval"
              v-model:expiration-warning-first-email="accountSettings.notificationSettings.expirationWarningFirstEmail"
              v-model:expiration-warning-second-email="accountSettings.notificationSettings.expirationWarningSecondEmail"
              v-model:expiration-warning-third-email="accountSettings.notificationSettings.expirationWarningThirdEmail"
            />
          </TabPanel>
          <TabPanel>
            <h3 class="text-base font-semibold mb-4">
              Azure Active Directory
            </h3>
            <AzureAdTab />
          </TabPanel>
          <TabPanel>
            <h3 class="text-base font-semibold mb-4">
              External Applications
            </h3>
            <ExternalApplicationsTab />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate"
import { ClipboardDocumentListIcon, BellIcon, ArrowDownOnSquareIcon, DevicePhoneMobileIcon } from "@heroicons/vue/24/outline"
import { XMarkIcon, PlusIcon } from "@heroicons/vue/20/solid"
import { Network, MapPin } from "lucide-vue-next"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { useAccountSettingsStore } from "@/stores/accountSettings"
import NotificationSettingsUI from "@/components/NotificationSettings.vue"
import GeneralTab from "@/components/settings/GeneralTab.vue"
import AzureAdTab from "@/components/settings/AzureAdTab.vue"
import ExternalApplicationsTab from "@/components/settings/ExternalApplicationsTab.vue"
import { computed, onMounted } from "vue"
import { LocationType } from "@/models/accountDetail"

const { getAccountSettings, updateAccountSettings } = useAccountSettingsStore()
const accountSettingsStore = useAccountSettingsStore()
const accountSettings = computed(() => accountSettingsStore.accountInfo)

onMounted(async () => {
  await getAccountSettings()
})

const handleSubmit = () => {
  if (accountSettings.value && accountSettings.value.id) {
    updateAccountSettings(accountSettings.value?.id, accountSettings.value)
  }
}

const addLocation = () => {
  if (accountSettings.value && accountSettings.value.locations) {
    const newLocation = {
      type: LocationType.Other,
      name: "My location"
    }
    accountSettings.value.locations.push(newLocation)
  }
}

const removeLocation = (idx: number) => {
  if (accountSettings.value && accountSettings.value.locations) {
    accountSettings.value.locations.splice(idx, 1)
  }
}

const getClientLocale = ():string | null => {
  if (typeof Intl !== "undefined") {
    try {
      return Intl.NumberFormat().resolvedOptions().locale
    } catch (err) {
    }
  }
  return null
}

const updateName = (name: string) => {
  if (accountSettings.value) {
    accountSettings.value.name = name
  }
}

const updateCulture = (culture: string) => {
  if (accountSettings.value) {
    accountSettings.value.defaultCulture = culture
  }
}

</script>

<style scoped>

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #d1d5db;
}

.list-group-item.draggable .handle {
  cursor: move;
}

.list-group-item.not-draggable {
  cursor: no-drop;
}

</style>
