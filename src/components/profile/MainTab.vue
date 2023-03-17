<template>
  <Form class="mt-5 sm:w-full md:w-1/2 lg:w-1/3" @submit="submitUpdateUserInfo">
    <h3 v-if="!isEditable" class="mb-10 text-gray-500 dark:text-gray-200 font-medium flex">
      <InformationCircleIcon class="w-5 mr-1 text-blue-700" /> Your profile is managed by Azure Active Directory
    </h3>
    <div class="mt-1 mb-8 relative">
      <Field
        id="firstName"
        v-model="userInfo.firstName"
        name="firstName"
        type="text"
        rules="required"
        placeholder="First name"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="firstName"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                peer-focus:text-sm"
      >
        First name
      </label>
      <ErrorMessage name="firstName" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="lastName"
        v-model="userInfo.lastName"
        name="lastName"
        type="text"
        rules="required"
        placeholder="Last name"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="lastName"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Last name
      </label>
      <ErrorMessage name="lastName" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="email"
        v-model="userInfo.email"
        name="email"
        type="email"
        autocomplete="email"
        rules="required|email"
        placeholder="Email address"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="email"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Email address
      </label>
      <ErrorMessage name="email" class="text-red-700 text-xs font-medium" />
      <button
        v-if="!userInfo.emailVerified"
        type="button"
        class="mt-2 ml-1 text-red-600 hover:text-red-700"
        @click.prevent="sendVerificationEmail"
      >
        Verify email
      </button>
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="title"
        v-model="userInfo.title"
        name="title"
        type="text"
        placeholder="Title"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="title"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Title
      </label>
      <ErrorMessage name="title" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 pl-2 relative">
      <label class="text-gray-400">Manager</label>
      <div class="flex justify-between mb-3">
        <span>{{ userInfo?.manager?.email ?? 'None' }}</span>
        <button
          v-if="!managerSearch && isEditable"
          type="button"
          class="ml-2 text-gray-600 hover:text-gray-700"
          @click.prevent="openManagerSearch"
        >
          <MagnifyingGlassIcon class="h-4" />
        </button>
        <button
          v-if="managerSearch && isEditable"
          type="button"
          class="ml-2 text-gray-600 hover:text-gray-700 z-10"
          @click.prevent="closeManagerSearch"
        >
          <XCircleIcon class="h-5" />
        </button>
      </div>
      <TypeAhead
        v-if="managerSearch && isEditable"
        :value="userInfo.manager"
        :search-function="searchUser"
        display-field="email"
        @selected-value="setManager"
      />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="department"
        v-model="userInfo.department"
        name="department"
        type="text"
        placeholder="Department"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="department"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Department
      </label>
      <ErrorMessage name="department" class="text-red-700 text-xs font-medium" />
    </div>

    <button
      type="submit"
      :disabled="!isEditable"
      class="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:bg-gray-300 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Save
    </button>
  </Form>
</template>

<script setup lang="ts">
import useUser from "@/composables/useUser"
import { useUserStore } from "@/stores/user"
import { computed, ref } from "vue"
import { isNil } from "ramda"
import userApi from "@/apiResources/userApi"
import { Field, Form, ErrorMessage } from "vee-validate"
import { InformationCircleIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/vue/24/outline"
import { useToast } from "vue-toastification"
import { useAppStore } from "@/stores/app"
import TypeAhead from "@/components/common/TypeAhead.vue"
// Computed:
const { userInfo, sendVerificationEmail } = useUser()
const { updateUserInfo } = useUserStore()
const isEditable = computed(() => isNil(userInfo.value.azureId))
const toast = useToast()
const { setLoading } = useAppStore()

const managerSearch = ref(false)

// Methods:
const searchUser = (query) => {
  return userApi.search(query)
}

const setManager = (manager: any) => {
  if (userInfo.value.id === manager.id) {
    toast.warning("You can't set yourself as manager")
  } else {
    userInfo.value.manager = manager
  }
  managerSearch.value = false
}
const submitUpdateUserInfo = async () => {
  setLoading(true)
  await updateUserInfo(userInfo.value)
  setLoading(false)
}
const openManagerSearch = () => {
  managerSearch.value = true
}

const closeManagerSearch = () => {
  managerSearch.value = false
}

</script>
