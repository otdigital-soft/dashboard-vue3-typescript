<template>
  <img
    v-if="field === 'owner_profilePicture'"
    :src="value"
    alt=""
    class="rounded-full h-10"
  >
  <a v-else-if="field === 'owner_email'" :href="`mailto:${value}`" class="text-blue-500 cursor-pointer">
    {{ value }}
  </a>
  <a v-else-if="field === 'resource_deployedBy'" :href="`mailto:${value}`" class="text-blue-500 cursor-pointer">
    {{ value }}
  </a>
  <router-link v-else-if="field === 'serviceRequestId'" :to="{ name: 'detail-service-request', params: { id: value }}" class="text-blue-500 cursor-pointer">
    View
  </router-link>
  <span v-else-if="field === 'status'">
    {{ DisplayText.getStatusDisplayText(value) }}
  </span>
  <span v-else-if="field === 'expirationDate'">
    {{ value? DateTime.fromISO(value).toLocaleString() : '' }}
  </span>
  <span v-else-if="field === 'resource_createdDate'">
    {{ value? DateTime.fromISO(value).toLocaleString() : '' }}
  </span>
  <span v-else-if="field === 'resource_removedDate'">
    {{ value? DateTime.fromISO(value).toLocaleString() : '' }}
  </span>
  <span v-else>{{ value }}</span>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { DisplayText } from "@/services/displayText"
import { DateTime } from "luxon"

const props = defineProps<{
    item: any,
    index: number
}>()

const field = computed(() => {
  const keys:string[] = Object.keys(props.item)
  return keys[props.index]
})

const value = computed(() => {
  const values:string[] = Object.values(props.item)
  return values[props.index]
})

</script>

<style scoped>

</style>
