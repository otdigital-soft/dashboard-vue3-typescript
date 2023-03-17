import { defineStore } from "pinia"
import notificationsApi from "@/apiResources/notificationsApi"
import { useToast } from "vue-toastification"
import type { Notification, NotificationDetail } from "@/models/notification"
import { findIndex, path } from "ramda"

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notification: null as NotificationDetail | null,
    notifications: [] as Array<Notification>
  }),

  getters: {
    notificationList (state): Array<Notification> {
      return state.notifications
    },
    notificationSummary (state): Array<Notification> {
      return state.notifications.filter(x => x.read === false).slice(0, 3)
    }
  },

  actions: {
    async fetchNotifications () {
      const { data } = await notificationsApi.getAllNotifications()
      this.notifications = data
    },

    async getNotification (id: string) {
      const { data } = await notificationsApi.getNotificationDetail(id)
      this.notification = data

      // find the index in notifications array, and then remove that notification:
      const notificationIndex = findIndex(u => u.id === id, this.notifications)
      this.notificationList[notificationIndex].read = true
    },

    async deleteNotification (id: string) {
      const toast = useToast()
      try {
        await notificationsApi.deleteNotification(id)

        // find the index in notifications array, and then remove that notification:
        const notificationIndex = findIndex(u => u.id === id, this.notifications)
        if (notificationIndex > -1) {
          this.notifications.splice(notificationIndex, 1)
        }

        this.notification = null
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    }
  }
})
