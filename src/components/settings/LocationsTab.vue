<template>
  <div>
    <h3>Locations</h3>
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue"
// import { useAccountSettingsStore } from "@/stores/accountSettings"
import type { Location } from "@/models/accountDetail"

// const accountSettingsStore = useAccountSettingsStore()
// const accountSettings = computed(() => accountSettingsStore.accountInfo)

defineEmits<{
    (e: "update:name", value: string): void
}>()

defineProps<{
    locations: Location[]
}>()
</script>

<style scoped>

</style>
