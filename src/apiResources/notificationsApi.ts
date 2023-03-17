import api from "./api"

class NotificationApi {
  getAllNotifications () {
    return api.get("/api/notification")
  }

  getNotificationDetail (id: string) {
    return api.get(`api/notification/${id}`)
  }

  deleteNotification (id: string) {
    return api.delete(`api/notification/${id}`)
  }
}

export default new NotificationApi()
