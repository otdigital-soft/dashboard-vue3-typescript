<template>
  <div class="w-[400px]">
    <div>
      <h4 class="font-bold mb-8">
        Name
      </h4>
      <div class="relative">
        <Field
          id="name"
          :value="name"
          type="text"
          name="name"
          placeholder="Account name"
          autocomplete="name"
          rules="required"
          class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
          @input="$emit('update:name', $event.target.value)"
        />
        <label
          for="name"
          class="text-gray-500 absolute left-0 pl-2 -top-5 text-sm transition-all
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-500
                  peer-focus:text-sm"
        >Account
          name</label>
        <ErrorMessage name="name" class="text-red-700 text-xs font-medium" />
      </div>
    </div>

    <div class="mt-5">
      <h4 class="font-bold mt-8 mb-3">
        Account type
      </h4>
      <p>
        {{ accountSettings?.accountType }}
      </p>
    </div>
    <div class="mt-5">
      <h4 class="font-bold mt-8 mb-3">
        Default culture
      </h4>
      <Field
        id="culture"
        :value="culture"
        class="border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200 mt-1 block w-full pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2"
        name="culture"
        as="select"
        @input="$emit('update:culture', $event.target.value)"
      >
        <option value="">
          Select a culture
        </option>
        <option
          v-for="cultureVal in cultures"
          :key="cultureVal.value"
          :value="cultureVal.value"
        >
          {{ cultureVal.name }}
        </option>
      </Field>
    </div>
    <div class="my-8">
      <h4 class="font-bold mt-8 mb-3">
        Logo
      </h4>
      <div class="flex items-center mb-8">
        <button
          v-if="accountSettings?.logoImageLargeUrl"
          type="button"
          class="group h-20 w-20 cursor-pointer bg-no-repeat bg-center bg-contain inline-flex items-center justify-center"
          :style="{ backgroundImage: 'url(' + accountSettings?.logoImageLargeUrl + ')' }"
          @click="isPhotoUploadDialogOpen = true"
        >
          <CameraIcon class="h-8 w-8 text-white opacity-60 invisible group-hover:visible" />
        </button>
        <div v-else class="flex content-start items-center">
          <button
            type="button"
            class="text-gray-400 cursor-pointer bg-no-repeat bg-center bg-contain inline-flex items-center justify-center"
            @click="isPhotoUploadDialogOpen = true"
          >
            <CameraIcon class="h-8 w-8 text-gray-700 opacity-60" />
          </button>
          <div class="ml-2 text-xs">
            Click to add a logo
          </div>
        </div>
      </div>
    </div>
    <div v-if="accountSettings?.isTrial" class="mt-8">
      <div class="bg-yellow-50 dark:bg-gray-700 dark:border-yellow-400 border-l-4 p-4">
        <div class="flex content-center items-center">
          <div class="flex-shrink-0 mr-1">
            <ExclamationTriangleIcon class="h-10 w-10 text-yellow-500 dark:text-yellow-200" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Trial Ending Soon
            </h3>
            <div class="mt-2 text-sm text-yellow-700 dark:text-yellow-100">
              <p>
                Trial expires {{
                  DateTime.fromISO(accountSettings.trialExpires!).toLocaleString(DateTime.DATETIME_SHORT)
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isInRole('AccountOwner')" class="mt-40 flex items-center justify-center w-full">
      <button
        type="button"
        class="flex w-full items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        @click="isDeleteConfirmationDialogOpen = true"
      >
        Delete Account
        <TrashIcon class="h-5 w-5 ml-2" />
      </button>
    </div>
  </div>
  <PhotoUploadDialog :open="isPhotoUploadDialogOpen" @close="isPhotoUploadDialogOpen = false" />
  <DeleteConfirmation
    message="delete this account"
    :open="isDeleteConfirmationDialogOpen"
    @close="isDeleteConfirmationDialogOpen = false"
    @deleted="deleteAccount"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Field, ErrorMessage } from "vee-validate"
import { DateTime } from "luxon"
import { ExclamationTriangleIcon } from "@heroicons/vue/20/solid"
import { CameraIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { useAccountSettingsStore } from "@/stores/accountSettings"
import { useUserStore } from "@/stores/user"
import PhotoUploadDialog from "@/components/dialogs/AdminPhotoUpload.vue"
import DeleteConfirmation from "../dialogs/DeleteConfirmation.vue"
import useUser from "@/composables/useUser"
import lookupApi from "@/apiResources/lookupApi"

const accountSettingsStore = useAccountSettingsStore()
const { logout } = useUserStore()
const router = useRouter()
const accountSettings = computed(() => accountSettingsStore.accountInfo)
const { userInfo } = useUser()

const isInRole = (role: string): boolean => {
  // issue-155
  return userInfo.value && userInfo.value.roles && userInfo.value.roles.includes(role)
}

defineEmits<{
  (e: "update:name", value: string): void
  (e: "update:culture", value: string): void
}>()

defineProps<{
  name: string | null,
  culture: string | null
}>()

const isPhotoUploadDialogOpen = ref(false)
const isDeleteConfirmationDialogOpen = ref(false)
const cultures = ref([])

onMounted(() => {
  lookupApi.getCultures().then(({ data }) => {
    cultures.value = data
  })
})

const deleteAccount = async () => {
  isDeleteConfirmationDialogOpen.value = false
  if (accountSettings.value?.id) {
    await accountSettingsStore.deactivateAccount(accountSettings.value.id)
    logout()
    router.push("/sign-in")
  }
}

</script>
