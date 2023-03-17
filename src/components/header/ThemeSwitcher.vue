<template>
  <Switch
    v-model="isDarkModeEnabled"
    :class="isDarkModeEnabled ? 'bg-blue-600' : 'bg-gray-300'"
    class="relative inline-flex flex-shrink-0 h-6 w-11 mt-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    <span class="sr-only">Enable notifications</span>

    <span
      :class="isDarkModeEnabled ? 'translate-x-5' : 'translate-x-0'"
      class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
    >
      <span
        :class="isDarkModeEnabled ? 'ease-out duration-100' : 'opacity-100 ease-in duration-200'"
        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
        aria-hidden="true"
      >
        <MoonIcon v-if="isDarkModeEnabled" class="h-3 w-3 text-blue-600" />
        <SunIcon v-else class="h-3 w-3 text-gray-400" />
      </span>
    </span>
  </Switch>
</template>

<script lang="ts">
</script>
<script setup lang="ts">
import { Switch } from "@headlessui/vue"
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline"
import useUser from "@/composables/useUser"

const { isDarkModeEnabled } = useUser()

</script>

<style scoped>

</style>
