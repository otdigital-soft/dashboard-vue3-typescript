<template>
  <template v-if="fieldKey !== 'resourceType'">
    <label :for="fieldKey" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
      {{ localResourceFieldType[fieldKey]?.label }}
    </label>

    <template v-if="localResourceFieldType[fieldKey]">
      <Field
        v-if="localResourceFieldType[fieldKey].type === 'select'"
        :id="fieldKey"
        v-model="resourceFieldRef"
        :placeholder="localResourceFieldType[fieldKey].placeholder"
        :rules="!localResourceFieldType[fieldKey].nullable ? 'required' : ''"
        :name="fieldKey"
        as="select"
        :disabled="readonly"
        class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
      >
        <option value="">
          Select
        </option>
        <option v-for="value in localResourceFieldType[fieldKey].options" :key="value" :value="value">
          {{ value }}
        </option>
      </Field>
      <Field
        v-if="localResourceFieldType[fieldKey].type === 'operation'"
        :id="fieldKey"
        v-model="resourceFieldRef"
        :placeholder="localResourceFieldType[fieldKey].placeholder"
        :rules="!localResourceFieldType[fieldKey].nullable ? 'required' : ''"
        :name="fieldKey"
        as="select"
        :disabled="readonly"
        class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
      >
        <option value="Create">
          Create
        </option>
        <option value="Modify">
          Modify
        </option>
      </Field>
      <Field
        v-else-if="localResourceFieldType[fieldKey].type === 'location'"
        :id="fieldKey"
        v-model="selectedLocation"
        :name="fieldKey"
        :placeholder="localResourceFieldType[fieldKey].placeholder"
        as="select"
        :disabled="readonly"
        :rules="!localResourceFieldType[fieldKey].nullable ? 'locationRequired' : ''"
        class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
        @change="onLocationChange()"
      >
        <template v-if="accountInfo && accountInfo.locations">
          <option value="">
            Not sure
          </option>
          <option v-for="(location, index) in accountInfo.locations" :key="index" :value="index">
            {{ location.name }} ({{ location.type }})
          </option>
        </template>
        <template v-else>
          <option value="" disabled>
            No locations found
          </option>
        </template>
      </Field>

      <SwitchGroup v-else-if="localResourceFieldType[fieldKey].type === 'boolean'" class="ml-3">
        <Switch
          v-model="resourceFieldRef"
          :class="resourceField ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-400'"
          :disabled="readonly"
          class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span
            class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            :class="resourceField ? 'translate-x-5' : 'translate-x-0'"
          >
            <span
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              :class="resourceField ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
              aria-hidden="true"
            />
            <span
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              :class="resourceField ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
              aria-hidden="true"
            />
          </span>
        </Switch>
      </SwitchGroup>

      <Field
        v-else-if="localResourceFieldType[fieldKey].type === 'textarea'"
        :id="fieldKey"
        v-model="resourceFieldRef"
        :name="fieldKey"
        :placeholder="localResourceFieldType[fieldKey].placeholder"
        :rules="!localResourceFieldType[fieldKey].nullable ? 'required' : ''"
        :disabled="readonly"
        as="textarea"
        class="peer h-20 w-full px-3 py-2 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
      />

      <Field
        v-else
        :id="fieldKey"
        v-model="resourceFieldRef"
        :name="fieldKey"
        :placeholder="localResourceFieldType[fieldKey].placeholder"
        :rules="!localResourceFieldType[fieldKey].nullable ? 'required' : ''"
        :type="localResourceFieldType[fieldKey].type"
        :disabled="readonly"
        class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
      />
    </template>

    <ErrorMessage :name="fieldKey" class="text-red-700 text-xs font-medium" />
  </template>
</template>

<script setup lang="ts">
import ServiceResourceFieldType from "@/models/resourceFieldType"
import { onMounted, ref, watch } from "vue"
import useAccount from "@/composables/useAccount"
import { Field, ErrorMessage } from "vee-validate"
import { SwitchGroup, Switch } from "@headlessui/vue"
import { findIndex, isNil } from "ramda"
import type { Location } from "@/models/accountDetail"

const emit = defineEmits(["change"])
const props = defineProps({
  fieldKey: {
    type: String,
    required: true
  },
  resourceField: {
    type: [String, Number, Boolean, Object],
    required: false,
    default: null
  },
  readonly: {
    type: Boolean,
    default: false
  },
  resourceType: {
    type: String,
    default: null,
    required: false
  }
})
// Composable:
const { accountInfo } = useAccount()

const selectedLocation = ref<any>(null)
const resourceFieldRef = ref(props.resourceField)
const localResourceFieldType = ref<any>(ServiceResourceFieldType)

// Methods
const onLocationChange = () => {
  if (accountInfo.value && accountInfo.value.locations) {
    resourceFieldRef.value = accountInfo.value.locations[selectedLocation.value]
  }
}

// Hook:
watch(resourceFieldRef, (newVal) => {
  emit("change", newVal)
})

onMounted(() => {
  localResourceFieldType.value = ServiceResourceFieldType
  if (props.fieldKey === "location" && !isNil(props.resourceField)) {
    selectedLocation.value = findIndex((location: Location) => location.type === props.resourceField.type && location.name === props.resourceField.name, accountInfo.value.locations)
  }
})

</script>
