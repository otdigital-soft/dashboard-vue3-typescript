<template>
  <Form class="mt-10 sm:w-full md:w-1/2 lg:w-1/3" @submit="updateUserInfo(userInfo)">
    <div class="mt-1 mb-8 relative">
      <Field
        id="city"
        v-model="userInfo.city"
        name="city"
        type="text"
        placeholder="City"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="city"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        City
      </label>
      <ErrorMessage name="city" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="state"
        v-model="userInfo.state"
        name="state"
        type="text"
        placeholder="State"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="state"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        State
      </label>
      <ErrorMessage name="state" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="country"
        v-model="userInfo.country"
        name="country"
        type="text"
        placeholder="Country"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="country"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Country
      </label>
      <ErrorMessage name="country" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="postalCode"
        v-model="userInfo.postalCode"
        name="postalCode"
        type="text"
        placeholder="Postal Code"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="postalCode"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Postal Code
      </label>
      <ErrorMessage name="postalCode" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="officeLocation"
        v-model="userInfo.officeLocation"
        name="officeLocation"
        type="text"
        placeholder="Office Location"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="officeLocation"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Office Location
      </label>
      <ErrorMessage name="officeLocation" class="text-red-700 text-xs font-medium" />
    </div>

    <div class="mt-1 mb-8 relative">
      <Field
        id="usageLocation"
        v-model="userInfo.usageLocation"
        name="usageLocation"
        type="text"
        placeholder="Usage Location"
        :disabled="!isEditable"
        class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
      />
      <label
        for="usageLocation"
        class="text-gray-400 absolute left-0 pl-2 -top-5 text-sm transition-all
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400
                                peer-focus:text-sm"
      >
        Usage Location
      </label>
      <ErrorMessage name="usageLocation" class="text-red-700 text-xs font-medium" />
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
import { computed } from "vue"
import { isNil } from "ramda"
import { Field, Form, ErrorMessage } from "vee-validate"

// Computed:
const { userInfo } = useUser()
const { updateUserInfo } = useUserStore()

const isEditable = computed(() => isNil(userInfo.value.azureId))
</script>

<style scoped>

</style>
