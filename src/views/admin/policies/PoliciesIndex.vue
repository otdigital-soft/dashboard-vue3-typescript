<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Policies
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="btn-outline btn-blue" @click="addPolicy">
          Create Policy
          <DocumentPlusIcon class="ml-3 h-5 w-5" />
        </button>
      </div>
    </div>
    <p class="font-sm">
      Use drag and drop to change the order that your policies are evaluated. The Default Policy cannot be reordered.
    </p>

    <draggable
      v-model="policies"
      class="mt-10 w-[410px]"
      item-key="id"
      draggable=".draggable"
      handle=".handle"
      ghost-class="ghost"
      @end="savePolicyOrder"
    >
      <template #item="{ element }">
        <div class="flex flex-col list-group-item" :class="element.deleteAllowed ? 'draggable' : 'not-draggable'">
          <div class="overflow-x-auto">
            <div class="inline-block w-auto py-2 align-middle md:px-6 lg:px-8">
              <div
                class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg bg-white dark:bg-gray-800 "
              >
                <div class="min-w-[350px] w-full rounded overflow-hidden shadow-lg">
                  <div class="pl-2 pr-2 py-4">
                    <div class="flex justify-between items-center mb-1 h-15">
                      <div class="font-normal text-sm h-full">
                        <div class="flex items-center">
                          <div class="pr-4 handle">
                            <GripVertical class="inline h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <div class="break-words font-bold">
                              {{ element.name }}
                            </div>
                            <div class="flex items-center mt-2">
                              <div class="relative inline-flex mr-4">
                                Active:
                              </div>
                              <Switch
                                v-model="element.isActive"
                                :class="element.isActive ? 'bg-blue-600':'bg-gray-200 dark:bg-gray-600'"
                                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                @update:model-value="toggleActive(element.id, $event)"
                              >
                                <span
                                  class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                  :class="element.isActive ? 'translate-x-5' : 'translate-x-0'"
                                >
                                  <span
                                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                    :class="element.isActive ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                                    aria-hidden="true"
                                  />
                                  <span
                                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                    :class="element.isActive ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Switch>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="element.deleteAllowed" class="flex h-15">
                        <div class="align-middle pr-5 h-full">
                          <router-link :to="{ name: 'policies-edit', params: { id: element.id} }">
                            <a class="cursor-pointer">
                              <PencilSquareIcon class="inline h-5 w-5 text-gray-400" />
                            </a>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <AddPolicyModal :open="addModalOpen" @close="addModalOpen=false" @reload="loadPolicies" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useToast } from "vue-toastification"
import { Switch } from "@headlessui/vue"
import policyApi from "@/apiResources/policyApi"
import { DocumentPlusIcon, PencilSquareIcon } from "@heroicons/vue/24/outline"
import { GripVertical } from "lucide-vue-next"
import type { PolicySummary } from "@/models/policies/policySummary"
import draggable from "vuedraggable"
import AddPolicyModal from "@/components/dialogs/AddPolicy.vue"
import useUser from "@/composables/useUser"
const { userInfo } = useUser()

const toast = useToast()
const policies = ref<PolicySummary[]>()
const isLoading = ref(false)
const addModalOpen = ref(false)

onMounted(() => {
  loadPolicies()
})

const addPolicy = () => {
  addModalOpen.value = true
}

const loadPolicies = () => {
  isLoading.value = true
  addModalOpen.value = false
  policyApi.list().then((resp) => {
    policies.value = resp
    isLoading.value = false
  })
    .catch(() => {
      toast.error("Failed to load policies")
      isLoading.value = false
    })
}

const savePolicyOrder = () => {
  if (policies.value === undefined) return
  const idElements: string[] = policies.value.map((x) => x.id)
  const accountId = userInfo.value.accountId
  policyApi.updatePolicyOrder(accountId, idElements)
    .catch(() => {
      toast.error("Failed to update policy order")
    })
}

const toggleActive = (itemId: string, value: boolean) => {
  policyApi.togglePolicy(itemId, value)
    .catch(() => {
      toast.error("Failed to update policy active state")
    })
}

</script>

<style scoped>

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #d1d5db;
}

.list-group-item.draggable .handle {
  cursor: move;
}

.list-group-item.not-draggable {
  cursor: no-drop;
}

</style>
