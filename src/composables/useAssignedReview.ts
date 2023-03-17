import { useAssignedReviewStore } from "@/stores/assignedReview"
import { computed } from "vue"

export default () => {
  const assignedReviewStore = useAssignedReviewStore()

  // Computed:
  const assignedReviews = computed(() => assignedReviewStore.assignedReviewList)

  return {
    assignedReviews
  }
}
