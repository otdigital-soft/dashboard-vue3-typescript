<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white text-sm dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
            >
              <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  class="border rounded-md text-gray-500 dark:text-gray-200 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-600"
                  @click="$emit('close')"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <img :src="getResourceImage(deployedResource.resourceType)" class="h-6 w-6 text-blue-500" alt="">
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200 mt-2">
                    Update deployed resource
                  </DialogTitle>
                  <TabGroup>
                    <TabList class="-mb-px flex space-x-12 border-b border-gray-200 dark:border-gray-400 mt-5">
                      <Tab
                        v-slot="{ selected }"
                        as="template"
                        class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        <button
                          :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                        >
                          <ClipboardDocumentListIcon class="-ml-0.5 mr-2 h-5 w-5" />
                          <span>Common</span>
                        </button>
                      </Tab>
                      <Tab
                        v-slot="{ selected }"
                        as="template"
                        class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        <button
                          :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                        >
                          <CloudIcon class="-ml-0.5 mr-2 h-5 w-5" />
                          <span>Cloud</span>
                        </button>
                      </Tab>
                      <Tab
                        v-slot="{ selected }"
                        as="template"
                        class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        <button
                          :class="selected ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                        >
                          <ChatBubbleLeftRightIcon class="-ml-0.5 mr-2 h-5 w-5" />
                          <span>Comments</span>
                        </button>
                      </Tab>
                    </TabList>
                    <TabPanels class="pt-2">
                      <TabPanel>
                        <div class="mt-4">
                          <label for="resourceType" class="text-gray-500 dark:text-gray-200 font-medium text-sm">Resource type</label>
                          <Field
                            id="status"
                            v-model="deployedResource.resourceType"
                            name="status"
                            as="select"
                            rules="required"
                            :disabled="readonly"
                            class="mt-1 block w-full pl-3 h-10 pr-10 text-gray-500 dark:text-gray-200 bg-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 border  dark:bg-gray-800 dark:border-gray-600"
                          >
                            <option value="" disabled>
                              Select resource type
                            </option>
                            <optgroup label="Popular">
                              <option value="Compute">
                                Compute
                              </option>
                              <option value="Database">
                                Database
                              </option>
                              <option value="Email">
                                Email
                              </option>
                              <option value="Software">
                                Software
                              </option>
                              <option value="Storage">
                                Storage
                              </option>
                              <option value="Web">
                                Web
                              </option>
                            </optgroup>
                            <optgroup label="Others">
                              <option value="Analytics">
                                Analytics
                              </option>
                              <option value="Blockchain">
                                Blockchain
                              </option>
                              <option value="Container">
                                Container
                              </option>
                              <option value="DeveloperTool">
                                Developer tool
                              </option>
                              <option value="DevOps">
                                DevOps
                              </option>
                              <option value="Identity">
                                Identity
                              </option>
                              <option value="Integration">
                                Integration
                              </option>
                              <option value="ManagementTool">
                                Management tool
                              </option>
                              <option value="Media">
                                Media
                              </option>
                              <option value="Migration">
                                Migration
                              </option>
                              <option value="Networking">
                                Networking
                              </option>
                              <option value="Security">
                                Security
                              </option>
                              <option value="Other">
                                Other
                              </option>
                            </optgroup>
                          </Field>
                        </div>
                        <div class="mt-4">
                          <label for="name" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Name
                          </label>
                          <Field
                            id="name"
                            v-model="deployedResource.name"
                            name="name"
                            placeholder="Name"
                            rules="required"
                            type="text"
                            :disabled="readonly"
                            class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                          />
                        </div>
                        <div class="mt-4">
                          <label for="location" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Location
                          </label>
                          <Field
                            id="location"
                            v-model="selectedLocation"
                            name="location"
                            as="select"
                            rules="locationRequired"
                            :disabled="readonly"
                            class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                            @change="onLocationChange"
                          >
                            <template v-if="accountInfo && accountInfo.locations">
                              <option value="">
                                Not sure
                              </option>
                              <option v-for="(location, index) in accountInfo?.locations" :key="index" :value="index">
                                {{ location.name }} ({{ location.type }})
                              </option>
                            </template>
                            <template v-else>
                              <option value="" disabled>
                                No locations found
                              </option>
                            </template>
                          </field>
                        </div>
                        <div class="mt-4">
                          <label for="description" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Description
                          </label>
                          <Field
                            id="description"
                            v-model="deployedResource.description"
                            name="description"
                            placeholder="Extended description if necessary"
                            rules="required"
                            as="textarea"
                            :disabled="readonly"
                            class="peer h-20 w-full px-3 py-2 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                          />
                        </div>
                        <div class="mt-4">
                          <label for="monthlyCost" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Monthly cost ({{ accountInfo?.currencySymbol }})
                          </label>
                          <div class="relative">
                            <div class="absolute inset-y-0 left-0 px-3 flex items-center justify-center pointer-events-none">
                              <span class="text-gray-500 sm:text-sm"> {{ accountInfo?.currencySymbol }} </span>
                            </div>
                            <Field
                              id="monthlyCost"
                              v-model="deployedResource.monthlyCost"
                              name="monthlyCost"
                              placeholder="Monthly cost"
                              type="number"
                              :disabled="readonly"
                              class="w-full h-10 pl-7 block rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                            />
                          </div>
                        </div>
                        <div class="mt-4">
                          <label for="internalAssetId" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Internal asset id
                          </label>
                          <Field
                            id="internalAssetId"
                            v-model="deployedResource.internalAssetId"
                            name="internalAssetId"
                            placeholder="Internal asset id"
                            type="text"
                            :disabled="readonly"
                            class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                          />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div class="mt-4">
                          <label for="regionOrZone" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Region or zone
                          </label>
                          <Field
                            id="regionOrZone"
                            v-model="deployedResource.regionOrZone"
                            name="regionOrZone"
                            placeholder="Region or zone"
                            type="text"
                            :disabled="readonly"
                            class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                          />
                        </div>
                        <div class="mt-4">
                          <label for="resourceGroup" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Resource group
                          </label>
                          <Field
                            id="resourceGroup"
                            v-model="deployedResource.resourceGroup"
                            name="resourceGroup"
                            placeholder="Resource group"
                            type="text"
                            :disabled="readonly"
                            class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                          />
                        </div>
                        <div class="mt-4">
                          <label for="subscription" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Subscription
                          </label>
                          <Field
                            id="subscription"
                            v-model="deployedResource.subscription"
                            name="subscription"
                            placeholder="Subscription"
                            type="text"
                            :disabled="readonly"
                            class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                          />
                        </div>
                        <div class="mt-4">
                          <label for="url" class="text-gray-500 dark:text-gray-200 font-medium text-sm">
                            Url
                          </label>
                          <Field
                            id="url"
                            v-model="deployedResource.url"
                            name="url"
                            placeholder="Url"
                            type="url"
                            :disabled="readonly"
                            class="peer h-10 w-full px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                          />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div v-for="(comment, index) in deployedResource.comments" :key="index">
                          <CommentCard
                            :comment="comment"
                            :readonly="false"
                            @remove="removeComment"
                          />
                        </div>
                        <div v-if="isAddingComment">
                          <div class="mt-4 relative">
                            <Field
                              id="content"
                              v-model="content"
                              name="content"
                              as="textarea"
                              placeholder="Comment"
                              rules="required"
                              class="peer h-20 w-full px-3 py-2 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600"
                            />
                            <ErrorMessage name="content" class="text-red-700 text-xs font-medium" />
                          </div>
                          <div class="flex justify-between mt-3">
                            <div class="relative">
                              <div class="flex w-full relative">
                                <div class="relative inline-flex h-6 mr-4 text-gray-500 dark:text-gray-200">
                                  Public:
                                </div>
                                <div class="relative">
                                  <Switch
                                    v-model="isPublic"
                                    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    :class="isPublic ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-400'"
                                  >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                      class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                      :class="isPublic ? 'translate-x-5' : 'translate-x-0'"
                                    >
                                      <span
                                        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                        :class="isPublic ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                                      />
                                      <span
                                        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                        :class="isPublic ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                                      />
                                    </span>
                                  </Switch>
                                </div>
                              </div>
                            </div>
                            <div class="flex items-center space-x-2">
                              <button
                                class="btn-outline-sm btn-blue text-xs"
                                type="button"
                                @click.prevent="onSubmitComment"
                              >
                                Add comment
                              </button>
                              <button
                                class="btn-outline-sm btn-gray text-xs"
                                type="button"
                                @click.prevent="isAddingComment = false"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                        <div v-if="!isAddingComment && !readonly" class="mt-5 divide-y-4">
                          <button
                            class="border flex items-center justify-center hover:bg-gray-600 text-gray-500 dark:hover:bg-gray-400 border-gray-500 dark:border-gray-400 rounded bg-white
                                  hover:text-white dark:text-gray-200 dark:bg-gray-600 dark:hover:text-gray-100 px-3 py-1 mt-1 "
                            @click.prevent="isAddingComment = true"
                          >
                            <PlusCircleIcon class="w-5 h-5 mr-1" /> Add comment
                          </button>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
                </div>
              </div>

              <div class="mt-5 sm:mt-8 sm:flex sm:flex-row-reverse">
                <button
                  v-if="!readonly"
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                  :class="!isValidForm? 'opacity-50 cursor-not-allowed' : ''"
                  :disabled="!isValidForm"
                  @click.prevent="onSubmitResource"
                >
                  Update
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm bg-white border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
                  @click="$emit('close')"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref, toRef, onUpdated } from "vue"
import { Field, ErrorMessage } from "vee-validate"
import { Dialog, DialogPanel, DialogTitle, Switch, TransitionChild, TransitionRoot, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { XMarkIcon, ChatBubbleLeftRightIcon, ClipboardDocumentListIcon, CloudIcon } from "@heroicons/vue/24/outline"
import { PlusCircleIcon } from "@heroicons/vue/20/solid"
import { DeployedResource, Comment } from "@/models/serviceRequests/deployedServiceRequest"
import CommentCard from "../common/CommentCard.vue"
import { SimpleUser } from "@/models/simpleUser"
import useUser from "@/composables/useUser"
import useAccount from "@/composables/useAccount"
import { findIndex } from "ramda"
import type { Location } from "@/models/accountDetail"

const emit = defineEmits(["close", "updated"])

const props = defineProps<{
  resource: DeployedResource
  readonly: boolean
  open: boolean
}>()

const deployedResource = toRef(props, "resource")
const selectedLocation = ref<any>(null)
const isAddingComment = ref(false)
const { accountInfo } = useAccount()
const isPublic = ref(true)
const content = ref<string|null>(null)
const { userInfo } = useUser()

const isValidForm = computed(() => {
  if (!deployedResource.value.name || !deployedResource.value.resourceType || deployedResource.value.location === null) return false
  return true
})

onUpdated(() => {
  if (accountInfo.value) {
    selectedLocation.value = findIndex((location: Location) => location.type === deployedResource.value.location?.type && location.name === deployedResource.value.location?.name, accountInfo.value.locations)
  }
}
)

const onLocationChange = () => {
  if (accountInfo.value) {
    deployedResource.value.location = accountInfo.value.locations[selectedLocation.value]
  }
}

const onSubmitResource = () => {
  console.log("onSubmitResource")
  if (!deployedResource.value.name || !deployedResource.value.resourceType || deployedResource.value.location === null) return false
  emit("updated", deployedResource.value)
}

const getResourceImage = (resourceType: string | null) :string => {
  if (resourceType === null) {
    return "/images/resources/file-circle-question.svg"
  }
  switch (resourceType) {
    case "Analytics": return "/images/resources/chart-mixed.svg"
    case "Blockchain": return "/images/resources/bitcoin-sign.svg"
    case "Compute": return "/images/resources/server.svg"
    case "Container": return "/images/resources/docker.svg"
    case "Database": return "/images/resources/database.svg"
    case "DeveloperTool": return "/images/resources/code.svg"
    case "DevOps": return "/images/resources/terminal.svg"
    case "Email": return "/images/resources/envelope.svg"
    case "Identity": return "/images/resources/fingerprint.svg"
    case "Integration": return "/images/resources/object-intersect.svg"
    case "ManagementTool": return "/images/resources/toolbox.svg"
    case "Media": return "/images/resources/photo-film-music.svg"
    case "Migration": return "/images/resources/truck-moving.svg"
    case "Networking": return "/images/resources/network-wired.svg"
    case "Security": return "/images/resources/lock-keyhole.svg"
    case "Software": return "/images/resources/binary.svg"
    case "Storage": return "/images/resources/container-storage.svg"
    case "Web": return "/images/resources/browser.svg"
    case "Other": return "/images/resources/file-circle-question.svg"
    default: return "/images/resources/file-circle-question.svg"
  }
}

const onSubmitComment = () => {
  const newComment = new Comment()
  const author: SimpleUser = new SimpleUser()
  author.email = userInfo.value.email
  author.id = userInfo.value.id
  newComment.author = author
  newComment.content = content.value
  newComment.isPublic = isPublic.value
  deployedResource.value.comments.push(newComment)
  isAddingComment.value = false
  content.value = null
  isPublic.value = true
}

const removeComment = (id: string) => {
  const commentIndex = findIndex(c => c.commentId === id, deployedResource.value.comments)
  deployedResource.value.comments.splice(commentIndex, 1)
}
</script>
