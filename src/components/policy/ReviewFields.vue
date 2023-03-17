<template>
  <div>
    <Form class="flex">
      <div class="mr-5">
        <label :for="`reviewSourceSelect-${index}`">Review source</label>
        <Field
          :id="`reviewSourceSelect-${index}`"
          v-model="requirement.reviewSource"
          placeholder="Review source"
          rules="required"
          :name="`reviewSourceSelect-${index}`"
          as="select"
          class="peer h-[46px] w-full px-2 bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1"
        >
          <option value="" selected disabled>
            Select review source
          </option>
          <option v-for="(value, key) in ReviewSourceSelect" :key="key" :value="key">
            {{ value }}
          </option>
        </Field>
        <ErrorMessage name="reviewSourceSelect" class="text-red-700 text-xs font-medium block absolute" />
      </div>

      <div v-if="requirement.reviewSource && !['Manager', 'AllOf', 'Ordered', 'None'].includes(requirement.reviewSource)" class="mr-5">
        <label :for="`minimumApprovals-${index}`">Min approvals</label>
        <Field
          :id="`minimumApprovals-${index}`"
          v-model="requirement.minimumApprovals"
          placeholder="Minimum approvals"
          rules="required"
          :name="`minimumApprovals-${index}`"
          type="number"
          class="peer h-[46px] w-[130px] border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 px-3 rounded-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-600 mt-1 block"
        />

        <ErrorMessage name="reviewSourceSelect" class="text-red-700 text-xs font-medium block absolute" />
      </div>

      <div v-if="requirement.reviewSource && !['Manager', 'ReviewerRole', 'None'].includes(requirement.reviewSource)" class="mr-5">
        <template v-if="accountInfo !== null && accountInfo.tenantId && requirement.reviewSource === 'SecurityGroup'">
          <label for="">Select group</label>
          <TypeAhead
            input-classes="bg-white mt-1"
            :search-function="searchADGroup"
            display-field="displayName"
            :display-selected-value="false"
            placeholder="Search AD group"
            @selected-value="addSecurityGroup"
          />
        </template>

        <template v-else>
          <label for="">Select reviewer</label>
          <TypeAhead
            input-classes="bg-white mt-1"
            :search-function="searchUser"
            :filter-function="reviewerFilter"
            display-field="email"
            :display-selected-value="false"
            placeholder="Search reviewer"
            @selected-value="addReviewer"
          />
        </template>
      </div>
      <div>
        <ul v-if="requirement.reviewSource === 'SecurityGroup' && requirement.reviewEntity !== null" class="pt-7">
          <li
            class="mb-1"
          >
            <div class="inline-block bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 px-4 py-2 rounded-full border text-gray-900 dark:text-gray-200">
              {{ requirement.reviewEntity?.displayName }}
              <button
                class="text-red-800 dark:text-red-600 hover:text-red-500 dark:hover:text-red-400 text-xs font-medium ml-2"
                @click="removeSecurityGroup"
              >
                <XMarkIcon class="h-3 w-3" />
              </button>
            </div>
          </li>
        </ul>

        <ul v-else class="w-[400px] pt-6">
          <li
            v-for="(reviewer, ndx) in requirement.reviewers"
            :key="ndx"
            class="mb-1 inline"
          >
            <div class="inline-block border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 px-2 py-1 text-xs rounded-full text-gray-900 dark:text-gray-200">
              {{ reviewer.email }}
              <button
                class="text-red-800 dark:text-red-600 hover:text-red-500 dark:hover:text-red-400 text-xs font-medium ml-1"
                @click="removeReviewer(reviewer)"
              >
                <XMarkIcon class="h-3 w-3" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">

import { XMarkIcon } from "@heroicons/vue/20/solid"
import { Field, Form, ErrorMessage } from "vee-validate"
import { type ADGroup, ReviewSourceMapper, ReviewRequirement, ReviewSource } from "@/models/policies/policyDetail"
import userApi from "@/apiResources/userApi"
import lookupApi from "@/apiResources/lookupApi"
import TypeAhead from "@/components/common/TypeAhead.vue"
import type { SimpleUser } from "@/models/simpleUser"
import useAccount from "@/composables/useAccount"
import { filter, includes, isNil } from "ramda"
import { toRef, computed, watch } from "vue"

interface Props {
  reviewRequirement: ReviewRequirement
  index: number,
  selectableSources: ReviewSource[]
}

const emit = defineEmits(["requirement-changed"])
const props = defineProps<Props>()

// Composable:
const { accountInfo } = useAccount()

// Data:
const requirement = toRef(props, "reviewRequirement")
const selectableReviewSources = toRef(props, "selectableSources")

// Computed:
const ReviewSourceSelect = computed(() => {
  let selectable : any = {}

  for (const key of selectableReviewSources.value) {
    selectable[key] = ReviewSourceMapper[key]
  }

  if (isNil(accountInfo.value?.tenantId)) {
    selectable = filter((value) => value !== "Security group", selectable)
  }

  selectable[requirement.value.reviewSource] = ReviewSourceMapper[requirement.value.reviewSource]
  return selectable
})

// Methods:
const searchUser = (query: string) => {
  return userApi.search(query)
}

const searchADGroup = (query: string) => {
  return lookupApi.getADGroups(query)
}

const addReviewer = (reviewer: SimpleUser) => {
  requirement.value.reviewers.push(reviewer)
}

const addSecurityGroup = (group: ADGroup) => {
  requirement.value.reviewEntity = group
}

const removeReviewer = (reviewer: SimpleUser) => {
  requirement.value.reviewers = filter((r) => r.id !== reviewer.id, requirement.value.reviewers)
}

const removeSecurityGroup = () => {
  requirement.value.reviewEntity = null
}

const reviewerFilter = (reviewers: SimpleUser[]) => {
  return filter(reviewer => !includes(reviewer, requirement.value.reviewers), reviewers)
}

// const securityGroupFilter = (group: ADGroup[]) => {
//   return filter(group => !includes(group.id, requirement.value.reviewEntityId), group)
// }

watch(requirement, newVal => {
  emit("requirement-changed", newVal)
}, { deep: true })
</script>
