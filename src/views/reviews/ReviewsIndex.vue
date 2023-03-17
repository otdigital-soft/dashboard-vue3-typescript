<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          My reviews
        </h1>
      </div>
    </div>
    <div v-if="assignedReviews.length === 0" class="mt-10 text-gray-700 dark:text-gray-200">
      No reviews assigned to you.
    </div>
    <div v-else class="grid grid-cols-5 gap-4 mt-10">
      <div
        v-for="(review, index) in assignedReviews"
        :key="index"
        class="bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700
        transition-shadow p-5 cursor-pointer relative group"
      >
        <button
          class="absolute top-2 right-2 invisible group-hover:visible"
          type="button"
          @click="openDeleteModal(review.id)"
        >
          <XMarkIcon class="text-red-500 h-4 w-4" />
        </button>
        <router-link class="flex flex-col items-center place-content-center" :to="{ name: 'review-service-request', params: { id: review.serviceRequestId }}">
          <ShieldCheckIcon class="w-14 h-14 text-green-500" />
          <div class="my-2 text-xs text-gray-500 dark:text-gray-300">
            Review request from
          </div>
          <div class="font-medium">
            {{ review.requestOwnerFirstName }} {{ review.requestOwnerLastName }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-200">
            {{ review.requestOwnerEmail }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-300 mt-2">
            {{ DateTime.fromISO(review.createdDateUtc).toRelative() }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <DeleteConfirmation
    message="delete this review request"
    :open="isDeleteDialogOpen"
    @close="isDeleteDialogOpen = false"
    @deleted="removeReviewRequest"
  />
</template>

<script setup lang="ts">
import useAccountReview from "@/composables/useAssignedReview"
import { useAssignedReviewStore } from "@/stores/assignedReview"
import { ShieldCheckIcon } from "@heroicons/vue/24/outline"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import { onMounted, ref } from "vue"
import { useAppStore } from "@/stores/app"
import DeleteConfirmation from "@/components/dialogs/DeleteConfirmation.vue"
import { DateTime } from "luxon"

const { assignedReviews } = useAccountReview()
const { fetchMyReviews, deleteReview } = useAssignedReviewStore()
const { setLoading } = useAppStore()
const isDeleteDialogOpen = ref(false)
const selectedReviewRequest = ref<string | null>(null)

onMounted(async () => {
  setLoading(true)
  await fetchMyReviews()
  setLoading(false)
})

const removeReviewRequest = () => {
  isDeleteDialogOpen.value = false
  if (selectedReviewRequest.value) {
    deleteReview(selectedReviewRequest.value)
  }
}

const openDeleteModal = (id: string) => {
  selectedReviewRequest.value = id
  isDeleteDialogOpen.value = true
}

</script>
