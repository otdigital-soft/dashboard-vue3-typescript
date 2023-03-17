<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Edit Policy
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="submit" class="btn-outline btn-blue mr-2" @click="submit">
          Save
          <ArrowDownOnSquareIcon class="ml-3 h-5 w-5" />
        </button>
        <button type="button" class="btn-outline btn-gray mr-2" @click="copyPolicy">
          Copy
          <Square2StackIcon class="ml-3 h-5 w-5" />
        </button>
        <button type="button" class="btn-outline btn-red" @click="deleteConfirmationOpen = true">
          Delete
          <TrashIcon class="ml-3 h-5 w-5" />
        </button>
      </div>
    </div>

    <Form class="mt-12" @submit="submit">
      <div class="flex items-center">
        <div class="w-1/3">
          <div class="mt-1 relative">
            <Field
              id="name"
              v-model="policy.name"
              name="name"
              type="text"
              rules="required"
              placeholder="Policy name"
              class="peer h-10 w-full border-b-2 border-gray-300 rounded-md p-2 placeholder-transparent focus:outline-none focus:border-blue-600  dark:bg-gray-800 dark:border-gray-600"
            />
            <label
              for="name"
              class="text-gray-500 absolute left-0 -top-6 text-sm transition-all
                          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-gray-500
                          peer-focus:text-sm"
            >
              Policy name
            </label>
            <ErrorMessage name="name" class="text-red-700 text-xs font-medium" />
          </div>
        </div>
        <div class="ml-6">
          <SwitchGroup>
            <SwitchLabel class="mr-4 text-gray-500 dark:text-gray-200">
              Active:
            </SwitchLabel>
            <Switch
              v-model="policy.isActive"
              :class="policy.isActive ? 'bg-blue-600':'bg-gray-200 dark:bg-gray-400'"
              class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span
                class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                :class="policy.isActive ? 'translate-x-5' : 'translate-x-0'"
              >
                <span
                  class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                  :class="policy.isActive ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                  aria-hidden="true"
                />
                <span
                  class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                  :class="policy.isActive ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                  aria-hidden="true"
                />
              </span>
            </Switch>
          </SwitchGroup>
        </div>
      </div>

      <div class="mt-10 w-2/3">
        <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200">
          Service Request Resource Lifetime
        </h3>
        <div class="relative flex items-start mt-5">
          <div class="flex items-center">
            <Switch
              v-model="policy.unlimitedResourceLifetime"
              :class="policy.unlimitedResourceLifetime ? 'bg-blue-600':'bg-gray-200 dark:bg-gray-600'"
              class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @update:model-value="toggleResourceLifetime"
            >
              <span
                class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                :class="policy.unlimitedResourceLifetime ? 'translate-x-5' : 'translate-x-0'"
              >
                <span
                  class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                  :class="policy.unlimitedResourceLifetime ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                  aria-hidden="true"
                />
                <span
                  class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                  :class="policy.unlimitedResourceLifetime ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                  aria-hidden="true"
                />
              </span>
            </Switch>
          </div>
          <div class="ml-3 text-sm">
            <p class="text-gray-500 dark:text-gray-200 cursor-pointer" @click="toggleLifetimeSwitch">
              Resource lifetimes have no limits
            </p>
          </div>
          <div class="ml-8">
            <div v-if="policy.resourceLifetime">
              <div>
                <h4 class="text-sm font-semibold">
                  Maximum resource lifetime
                </h4>
              </div>
              <div class="flex items-end">
                <div class="w-24">
                  <div class="mt-2">
                    <label
                      for="lifetimeDuration"
                      class="block text-sm font-medium text-gray-500 dark:text-gray-200"
                    >Duration</label>
                    <Field
                      id="lifetimeDuration"
                      v-model="policy.resourceLifetime.duration"
                      type="number"
                      name="lifetimeDuration"
                      rules="required|minMax:1,365"
                      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-2 py-2 border  dark:bg-gray-800 dark:border-gray-600"
                    />
                    <ErrorMessage name="lifetimeDuration" class="text-red-700 text-xs font-medium" />
                  </div>
                </div>
                <div class="w-32 ml-2">
                  <Field
                    id="lifetimeType"
                    v-model="policy.resourceLifetime.lifetimeType"
                    name="lifetimeType"
                    as="select"
                    rules="required"
                    class="mt-1 block w-full pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600
text-gray-700 dark:text-gray-200"
                  >
                    <option value="Days">
                      Days
                    </option>
                    <option value="Weeks">
                      Weeks
                    </option>
                    <option value="Months">
                      Months
                    </option>
                    <option value="Years">
                      Years
                    </option>
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-20">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
          <Field
            id="tabs"
            name="tabs"
            as="select"
            rules="required"
            class="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
          >
            <option :selected="activeTab==1">
              Filters
            </option>
            <option :selected="activeTab==2">
              Reviews
            </option>
            <option :selected="activeTab==3">
              Notifications
            </option>
          </Field>
        </div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200 dark:border-gray-400">
            <nav class="-mb-px flex space-x-12" aria-label="Tabs">
              <button
                class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                type="button"
                :class="activeTab===1 ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                @click="activeTab=1"
              >
                <FunnelIcon
                  class="-ml-0.5 mr-2 h-5 w-5"
                  :class="activeTab === 1 ? 'text-blue-500':'text-gray-400 group-hover:text-gray-500'"
                  aria-hidden="true"
                />
                <span>Filters</span>
              </button>
              <button
                class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                type="button"
                :class="activeTab===2 ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                @click="activeTab=2"
              >
                <ShieldCheckIcon
                  class="-ml-0.5 mr-2 h-5 w-5"
                  :class="activeTab === 2 ? 'text-blue-500':'text-gray-400 group-hover:text-gray-500'"
                  aria-hidden="true"
                />
                <span>Reviews</span>
              </button>
              <button
                class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                type="button"
                :class="activeTab===3 ? 'border-blue-500 text-blue-600 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100'"
                @click="activeTab=3"
              >
                <BellIcon
                  class="-ml-0.5 mr-2 h-5 w-5"
                  :class="activeTab === 3 ? 'text-blue-500':'text-gray-400 group-hover:text-gray-500'"
                  aria-hidden="true"
                />
                <span>Notifications</span>
              </button>
            </nav>
          </div>
        </div>
        <div>
          <div v-if="activeTab===1" class="py-5 px-2 text-sm">
            <div v-for="(filter, index) in policy.filters" :key="index" class="inline-block mr-4">
              <div
                class="bg-gray-100 rounded border-gray-200 border divide-x divide-gray-300 flex
                dark:border-gray-500 dark:divide-gray-500 text-xs dark:text-gray-200 dark:bg-gray-700 dark:hover:text-gray-100"
              >
                <div class="mr-2 pl-2 py-2">
                  {{ DisplayText.getTypeDisplayText(filter.appliesTo) }}
                </div>
                <div class="mr-2 pl-2 py-2 italic">
                  {{ ComparisonMapper[filter.comparison] }}
                </div>
                <div v-if="filter.comparisonDisplay" class="mr-2 pl-2 py-2 font-medium">
                  {{ filter.comparisonDisplay }}
                </div>
                <div
                  class="px-2 py-2 cursor-pointer hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500 dark:hover:text-gray-100"
                  @click="removeFilter(index)"
                >
                  <XMarkIcon class="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
            <div class="mt-3">
              <PolicyFilter @add="addFilter" />
            </div>
          </div>
          <div v-if="activeTab===2" class="p-8">
            <ReviewTab @review-requirements-changed="updateReviewRequirements" />
            <div class="mt-6">
              <h4 class="text-sm font-semibold">
                Maximum time for reviews to complete
              </h4>
              <div class="flex items-end">
                <div class="w-24">
                  <div class="mt-2">
                    <label
                      for="maximumReviewLengthDuration"
                      class="block text-sm font-medium text-gray-500 dark:text-gray-200"
                    >Duration</label>
                    <Field
                      id="maximumReviewLengthDuration"
                      v-model="policy.maximumReviewLength.duration"
                      type="number"
                      name="maximumReviewLengthDuration"
                      rules="required|minMax:1,365"
                      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-2 py-2 border  dark:bg-gray-800 dark:border-gray-600"
                    />
                    <ErrorMessage name="maximumReviewLengthDuration" class="text-red-700 text-xs font-medium" />
                  </div>
                </div>
                <div class="w-32 ml-2">
                  <Field
                    id="maximumReviewLengthType"
                    v-model="policy.maximumReviewLength.lifetimeType"
                    name="maximumReviewLengthType"
                    as="select"
                    rules="required"
                    class="mt-1 block w-full pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-sm px-2 py-2 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600
                        text-gray-900 dark:text-gray-200"
                  >
                    <option value="Days">
                      Days
                    </option>
                    <option value="Weeks">
                      Weeks
                    </option>
                    <option value="Months">
                      Months
                    </option>
                    <option value="Years">
                      Years
                    </option>
                  </Field>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab===3" class="p-8">
            <div>
              <div class="relative flex items-start">
                <div class="flex items-center">
                  <Switch
                    v-model="policy.useDefaultNotificationSettings"
                    :class="policy.useDefaultNotificationSettings ? 'bg-blue-600' :'bg-gray-200 dark:bg-gray-600'"
                    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    @update:model-value="toggleNotificationStrategy"
                  >
                    <span
                      class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      :class="policy.useDefaultNotificationSettings ? 'translate-x-5' : 'translate-x-0'"
                    >
                      <span
                        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                        :class="policy.useDefaultNotificationSettings ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                        aria-hidden="true"
                      />
                      <span
                        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                        :class="policy.useDefaultNotificationSettings ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                        aria-hidden="true"
                      />
                    </span>
                  </Switch>
                </div>
                <div class="ml-3 text-sm">
                  <label for="useDefaultNotificationSettings" class="font-medium text-gray-700 dark:text-gray-400">Use
                    Account
                    notification strategy</label>
                </div>
                <div class="ml-8">
                  <div v-if="policy.notificationSettings !== null">
                    <h3 class="text-base font-semibold mb-3">
                      Policy Notification Strategy
                    </h3>
                    <NotificationSettingsUI
                      v-if="policy.notificationSettings"
                      v-model:reminder-email-interval="policy.notificationSettings.reminderEmailInterval"
                      v-model:expiration-warning-first-email="policy.notificationSettings.expirationWarningFirstEmail"
                      v-model:expiration-warning-second-email="policy.notificationSettings.expirationWarningSecondEmail"
                      v-model:expiration-warning-third-email="policy.notificationSettings.expirationWarningThirdEmail"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <DeleteConfirmationModal
      message="delete this policy"
      :open="deleteConfirmationOpen"
      @close="deleteConfirmationOpen=false"
      @deleted="deletePolicy"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"
import policyApi from "@/apiResources/policyApi"
import { SwitchGroup, SwitchLabel, Switch } from "@headlessui/vue"
import { ArrowDownOnSquareIcon, TrashIcon, BellIcon, ShieldCheckIcon, FunnelIcon, Square2StackIcon } from "@heroicons/vue/24/outline"
import { Field, Form, ErrorMessage } from "vee-validate"
import DeleteConfirmationModal from "@/components/dialogs/DeleteConfirmation.vue"
import { Lifetime, NotificationSettings, ComparisonMapper } from "@/models/policies/policyDetail"
import NotificationSettingsUI from "@/components/NotificationSettings.vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import PolicyFilter from "@/components/policy/Filter.vue"
import { DisplayText } from "@/services/displayText"
import ReviewTab from "@/components/policy/ReviewTab.vue"
import { usePolicyStore } from "@/stores/policy"
import usePolicy from "@/composables/usePolicy"

const router = useRouter()
const toast = useToast()
const deleteConfirmationOpen = ref(false)

const activeTab = ref(1)

const props = defineProps<{
  id: string
}>()

const { getPolicyById, deletePolicy: deletePolicyStore, updatePolicy } = usePolicyStore()
const { currentPolicy: policy } = usePolicy()

onMounted(() => {
  getPolicyById(props.id)
})

const deletePolicy = async () => {
  await deletePolicyStore(props.id)
  deleteConfirmationOpen.value = false
  router.push("/admin/policies")
}

const submit = () => {
  updatePolicy(policy.value)
}

const copyPolicy = () => {
  policyApi.copy(props.id)
    .then(() => {
      toast.success("Successfully copied policy")
      router.push("/admin/policies")
    })
    .catch(() => {
      toast.error("Error copying policy")
    })
}

const toggleNotificationStrategy = () => {
  if (policy.value.useDefaultNotificationSettings) {
    policy.value.notificationSettings = null
  } else {
    const notificationSettings: NotificationSettings = new NotificationSettings()
    policy.value.notificationSettings = notificationSettings
  }
}

const addFilter = (newFilter: any) => {
  policy.value.filters.push(newFilter)
}

const removeFilter = (index: number) => {
  policy.value.filters.splice(index, 1)
}

const updateReviewRequirements = (requirements: any) => {
  policy.value.requiredCreationReviews = requirements.requiredCreationReviews
  policy.value.requiredExtensionReviews = requirements.requiredExtensionReviews
  policy.value.requiredModificationReviews = requirements.requiredModificationReviews
  policy.value.requiredTransferReviews = requirements.requiredTransferReviews
}

const toggleResourceLifetime = () => {
  if (policy.value.unlimitedResourceLifetime) {
    policy.value.resourceLifetime = null
  } else {
    const resourceLifetime: Lifetime = new Lifetime()
    policy.value.resourceLifetime = resourceLifetime
  }
}

const toggleLifetimeSwitch = () => {
  policy.value.unlimitedResourceLifetime = !policy.value.unlimitedResourceLifetime
  toggleResourceLifetime()
}

</script>

<style scoped>

</style>
