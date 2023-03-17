import api from "./api"

class AssignedReviewApi {
  getAssignedReviews () {
    return api.get("/api/assigned-review")
  }

  getMyAssignedReviews () {
    return api.get("/api/assigned-review/my")
  }

  getAssignedReview (id: string) {
    return api.get(`api/assigned-review/${id}`)
  }

  deleteAssignedReview (id: string) {
    return api.delete(`api/assigned-review/${id}`)
  }
}

export default new AssignedReviewApi()
