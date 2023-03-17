<template>
  <div class="w-64">
    <div>
      <h4 class="text-medium font-semibold mt-65">
        Review reminders
      </h4>
      <div class="mt-2">
        <div class="flex justify-between items-baseline">
          <label for="notificationInterval" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Email
            interval</label>
          <span class="text-xs text-gray-500">days</span>
        </div>
        <div class="mt-1">
          <Field
            id="notificationInterval"
            :value="reminderEmailInterval"
            type="number"
            name="notificationInterval"
            rules="required|minMax:1,30"
            class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-800 dark:border-gray-600"
            @input="$emit('update:reminderEmailInterval', parseInt($event.target.value))"
          />
          <ErrorMessage name="notificationInterval" class="text-red-700 text-xs font-medium" />
        </div>
      </div>
    </div>
    <div class="mt-7">
      <h4 class="text-medium font-semibold">
        Service Request expiration notices
      </h4>
    </div>
    <div class="mt-2">
      <div class="flex justify-between items-baseline">
        <label for="firstNotification" class="block text-sm font-medium text-gray-700 dark:text-gray-400">First
          notice</label>
        <span class="text-xs text-gray-500">days before expiration</span>
      </div>
      <div class="mt-1">
        <Field
          id="firstNotification"
          :value="expirationWarningFirstEmail"
          type="number"
          name="firstNotification"
          rules="required|minMax:1,30"
          class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-800 dark:border-gray-600"
          @input="$emit('update:expirationWarningFirstEmail', parseInt($event.target.value))"
        />
        <ErrorMessage name="firstNotification" class="text-red-700 text-xs font-medium" />
      </div>
    </div>
    <div class="mt-5">
      <div class="flex justify-between items-baseline">
        <label for="secondNotification" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Second
          notice</label>
        <span class="text-xs text-gray-500">days before expiration</span>
      </div>
      <div class="mt-1">
        <Field
          id="secondNotification"
          :value="expirationWarningSecondEmail"
          type="number"
          name="secondNotification"
          rules="required|minMax:1,30"
          class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-800 dark:border-gray-600"
          @input="$emit('update:expirationWarningSecondEmail', parseInt($event.target.value))"
        />
        <ErrorMessage name="secondNotification" class="text-red-700 text-xs font-medium" />
      </div>
    </div>
    <div class="mt-5">
      <div class="flex justify-between items-baseline">
        <label for="thirdNotification" class="block text-sm font-medium text-gray-700 dark:text-gray-400">Final
          notice</label>
        <span class="text-xs text-gray-500">days before expiration</span>
      </div>
      <div class="mt-1">
        <Field
          id="thirdNotification"
          :value="expirationWarningThirdEmail"
          type="number"
          name="thirdNotification"
          rules="required|minMax:1,30"
          class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-800 dark:border-gray-600"
          @input="$emit('update:expirationWarningThirdEmail', parseInt($event.target.value))"
        />
        <ErrorMessage name="thirdNotification" class="text-red-700 text-xs font-medium" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate"

defineProps<{
  reminderEmailInterval: number,
  expirationWarningFirstEmail: number,
  expirationWarningSecondEmail: number,
  expirationWarningThirdEmail: number,
}>()

// eslint-disable-next-line
defineEmits<{
  (e: "update:reminderEmailInterval", value: number): void
  (e: "update:expirationWarningFirstEmail", value: number): void
  (e: "update:expirationWarningSecondEmail", value: number): void
  (e: "update:expirationWarningThirdEmail", value: number): void
}>()
</script>
