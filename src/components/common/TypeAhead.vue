<template>
  <div class="relative">
    <Combobox v-if="selectedValue" v-model="selectedValue">
      <ComboboxInput
        :display-value="displaySelectedValue ? (value: any) => value[displayField] : undefined"
        class="bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200 p-3 block w-full border-b-2"
        :class="inputClasses"
        :placeholder="placeholder"
        @change="changeSearchQuery($event.target.value)"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
        <div v-if="isLoading" class="lds-dual-ring" />
        <ChevronUpDownIcon v-else class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>
      <ComboboxOptions class="bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 py-2 block w-full mt-2 absolute z-10 rounded shadow-lg shadow-gray-100 dark:shadow-gray-700 text-gray-900 dark:text-gray-200">
        <ComboboxOption
          v-for="(result, index) in filteredResults"
          :key="index"
          :value="result"
          class="py-1 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200 cursor-pointer"
        >
          {{ result[displayField] }}
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
  </div>
</template>

<script setup lang="ts">

import { ref, toRef, watch } from "vue"

import { debounce } from "debounce"
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton
} from "@headlessui/vue"
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid"

const emit = defineEmits(["selectedValue"])
const props = defineProps({
  searchFunction: {
    type: Function,
    required: true
  },
  // Filter function is used to filter the results of the search function
  filterFunction: {
    type: Function,
    required: false,
    default: (result: any) => result
  },
  value: {
    type: Object,
    default: () => ({
      id: "",
      displayName: ""
    })
  },
  displayField: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: "Search"
  },
  displaySelectedValue: {
    type: Boolean,
    default: true
  },
  inputClasses: {
    type: String,
    required: false,
    default: ""
  }
})

// Data:
const propSelectedValue = toRef(props, "value")
const selectedValue = ref({
  id: "",
  displayName: ""
})

const searchQuery = ref("")
const filteredResults = ref<any>([])
const isLoading = ref(false)

// Method:
const changeSearchQuery = debounce((newQuery: string) => {
  searchQuery.value = newQuery
}, 200)

// Hook:
watch(searchQuery, async (newQuery) => {
  isLoading.value = true
  const { data } = await props.searchFunction(newQuery)

  filteredResults.value = props.filterFunction(data)
  isLoading.value = false
})

watch(selectedValue, (newValue) => {
  emit("selectedValue", newValue)
})

watch(propSelectedValue, (newValue: any) => {
  selectedValue.value = newValue
}, {})

</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 32px;
  height: 32px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 24px;
  height: 24px;
  margin: 4px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
