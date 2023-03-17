import { useToast } from "vue-toastification"
import assignedReviewApi from "@/apiResources/assignedReviewApi"
import { defineStore } from "pinia"
import { findIndex, path } from "ramda"
import type { AssignedReview } from "@/models/assignedReview"

export const useAssignedReviewStore = defineStore("assignedReview", {
  state: () => ({
    assignedReviews: [] as AssignedReview[]
  }),
  getters: {
    assignedReviewList: (state) => state.assignedReviews
  },
  actions: {
    async fetchReviews () {
      try {
        const { data } = await assignedReviewApi.getAssignedReviews()
        this.assignedReviews = data
      } catch (error) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async fetchMyReviews () {
      try {
        const { data } = await assignedReviewApi.getMyAssignedReviews()
        this.assignedReviews = data
      } catch (error) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async deleteReview (id:string) {
      try {
        await assignedReviewApi.deleteAssignedReview(id)

        const idx = findIndex(u => u.id === id, this.assignedReviews)
        if (idx > -1) {
          this.assignedReviews.splice(idx, 1)
        }
      } catch (error) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    }
  }
})
