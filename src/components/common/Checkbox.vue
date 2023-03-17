<template>
  <div class="flex items-center h-5">
    <input
      :id="`helper-checkbox-${checkboxId}`"
      v-model="isChecked"
      aria-describedby="helper-checkbox-text"
      type="checkbox"
      class="mx-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  dark:bg-gray-700 dark:border-gray-600"
      @change="$emit('update:modelValue', $event.target.checked)"
    >
  </div>
  <div class="ml-2 text-sm">
    <label :for="`helper-checkbox-${checkboxId}`" class="font-medium text-gray-900 dark:text-gray-300">{{ labelText }}</label>
    <p v-if="hasHelper" id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { toRef, watch, ref, computed } from "vue"

defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  labelText: {
    type: String,
    required: true
  },
  hasHelper: {
    type: Boolean,
    default: false
  },
  helperText: {
    type: String,
    required: false,
    default: ""
  }
})

const checked = toRef(props, "modelValue")
const isChecked = ref<boolean>(checked.value)

const checkboxId = computed<string>(() => {
  return props.labelText.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
})

watch(checked, (newVal) => {
  isChecked.value = newVal
})
</script>
