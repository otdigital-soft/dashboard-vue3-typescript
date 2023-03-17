<template>
  <div v-if="resources.length === 0">
    <p class="text-gray-700 dark:text-gray-200 mt-2">
      No resources have been deployed for this service request.
    </p>
  </div>
  <div v-else>
    <span
      v-for="(resource, index) in resources"
      :key="index"
      class="relative mx-2"
    >
      <span class="rounded-md px-3 py-1 italic bg-slate-400 text-slate-50 text-sm cursor-pointer relative" @click="openDetailDialog(index)">
        {{ resource.name }}
      </span>
      <button
        v-if="resource !== null && !readonly"
        type="button"
        class="absolute bg-red-400 hover:bg-red-600 rounded-full p-1 -mt-2 -ml-2"
        @click="handleRemove(resource.id!)"
      >
        <XMarkIcon class="w-2 h-2 text-white" />
      </button>
    </span>
  </div>

  <DeployedResourceDialog
    :open="isDialogOpen"
    :readonly="readonly"
    :resource="resources[detailResourceKey]"
    @close="isDialogOpen = false"
    @updated="resourceUpdated"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { DeployedResource } from "@/models/serviceRequests/deployedServiceRequest.js"
import DeployedResourceDialog from "@/components/dialogs/DeployedResource.vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"

const emit = defineEmits(["remove", "update"])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  id: string,
  readonly: boolean,
  resources: DeployedResource[]
}>()

const isDialogOpen = ref(false)
const detailResourceKey = ref<number>(-1)

const openDetailDialog = (index: number) :void => {
  detailResourceKey.value = index
  isDialogOpen.value = true
}

const resourceUpdated = (resource: DeployedResource) :void => {
  isDialogOpen.value = false
  if (resource) {
    emit("update", resource)
  }
}

const handleRemove = (resourceId : string) => {
  if (resourceId) {
    emit("remove", resourceId)
  }
}

</script>
