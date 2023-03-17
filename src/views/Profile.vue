<template>
  <div>
    <div class="flex items-center mb-8">
      <button
        v-if="userInfo.profilePictureLarge"
        type="button"
        class="rounded-full h-20 w-20 cursor-pointer bg-no-repeat bg-center bg-contain
        inline-flex items-center justify-center"
        :class="{'group': userInfo.azureId === null}"
        :style="{backgroundImage: 'url(' + userInfo.profilePictureLarge + ')'}"
        @click="userInfo.azureId ? '' :
          isPhotoUploadDialogOpen=true"
      >
        <CameraIcon class="h-8 w-8 text-white opacity-60 invisible group-hover:visible" />
      </button>
      <button
        v-else
        type="button"
        class="rounded-full h-20 w-20 cursor-pointer bg-no-repeat bg-center bg-contain inline-flex items-center justify-center"
        :class="{'group': userInfo.azureId === null}"
        :style="{ backgroundImage: 'url(/images/user-circle.svg)' }"
        @click="userInfo.azureId ? '' :
          isPhotoUploadDialogOpen=true"
      >
        <CameraIcon class="h-8 w-8 text-gray-700 opacity-60 invisible group-hover:visible" />
      </button>
      <h2 class="ml-5 text-lg font-medium text-blue-700 dark:text-slate-200">
        {{ userInfo.fullName }}
      </h2>
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
            <UserIcon class="-ml-0.5 mr-2 h-5 w-5" />
            <span>My Profile</span>
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
            <MapIcon class="-ml-0.5 mr-2 h-5 w-5" />
            <span>Details</span>
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

      <TabPanels class="pt-2">
        <TabPanel>
          <ProfileMainTab />
        </TabPanel>
        <TabPanel>
          <ProfileDetailsTab />
        </TabPanel>
        <TabPanel>
          <ProfileExternalAccountsTab />
        </TabPanel>
      </TabPanels>
    </TabGroup>

    <PhotoUploadDialog :open="isPhotoUploadDialogOpen" @close="isPhotoUploadDialogOpen = false" />
  </div>
</template>

<script setup lang="ts">
import useUser from "@/composables/useUser"
import { UserIcon, MapIcon, CameraIcon, DevicePhoneMobileIcon } from "@heroicons/vue/24/outline"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { ref } from "vue"
import ProfileMainTab from "@/components/profile/MainTab.vue"
import ProfileDetailsTab from "@/components/profile/DetailsTab.vue"
import ProfileExternalAccountsTab from "@/components/profile/ProfileExternalAccountsTab.vue"
import PhotoUploadDialog from "@/components/dialogs/PhotoUpload.vue"

// Computed:
const { userInfo } = useUser()

// Data:
const isPhotoUploadDialogOpen = ref(false)

</script>

<style scoped>

</style>
