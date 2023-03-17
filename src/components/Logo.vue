<template>
  <router-link to="/dashboard">
    <img
      v-if="isSideBarCollapsed"
      class="h-7 w-auto mt-5 ml-5"
      src="/images/taper-logo.svg"
      alt="logo"
    >
    <img
      v-else
      class="h-12 w-auto mt-2 ml-4"
      src="/images/horizontal-logo.svg"
      alt="logo"
    >
  </router-link>
</template>

<script setup lang="ts">
import useUser from "@/composables/useUser"

const { isSideBarCollapsed } = useUser()
</script>

<style scoped>

</style>
