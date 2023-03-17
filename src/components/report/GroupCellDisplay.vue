<template>
  <template v-if="reportType === 'Charge'">
    <router-link v-if="field !== 'amount' && field !== 'month' && field !== 'year' && field !== 'day'" :to="buildUrlWithFilter" class="text-blue-500 cursor-pointer">
      <span v-if="field === 'status'">
        {{ DisplayText.getStatusDisplayText(value) }}
      </span>
      <span v-else>
        {{ value }}
      </span>
    </router-link>
    <span v-else>
      {{ value }}
    </span>
  </template>
  <template v-else>
    <router-link v-if="field !== 'itemCount' && value !== 'null'" :to="buildUrlWithFilter" class="text-blue-500 cursor-pointer">
      <span v-if="field === 'status'">
        {{ DisplayText.getStatusDisplayText(value) }}
      </span>
      <span v-else>
        {{ value }}
      </span>
    </router-link>
    <span v-else>
      {{ value }}
    </span>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { DisplayText } from "@/services/displayText"

const props = defineProps({
  item: {
    type: null,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  reportType: {
    type: String,
    required: false,
    default: "ServiceRequest"
  }
})

const route = useRoute()

const field = computed(() => {
  const keys:string[] = Object.keys(props.item)
  return keys[props.index]
})

const value = computed(() => {
  const values:string[] = Object.values(props.item)
  return values[props.index] ?? "null"
})

const buildUrlWithFilter = computed(() => {
  return `${route.path}/detail?filter=${field.value} -Equal '${value.value}'`
})

</script>

<style scoped>

</style>
