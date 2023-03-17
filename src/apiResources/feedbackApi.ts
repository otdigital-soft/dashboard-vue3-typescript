import api from "./api"

class FeedbackApi {
  sendFeedback ({ route, email, rating, comments }: {route: string, email: string, rating: number, comments: string}) {
    return api.post("/send-feedback", {
      route,
      email,
      rating,
      comments
    })
  }
}

export default new FeedbackApi()
