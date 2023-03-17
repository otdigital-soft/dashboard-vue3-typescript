import { useNotificationStore } from "@/stores/notification"
import { computed } from "vue"

export default () => {
  const notificationStore = useNotificationStore()

  // Computed:
  const notificationList = computed(() => notificationStore.notificationList)
  const notificationSummary = computed(() => notificationStore.notificationSummary)
  const notificationDetail = computed(() => notificationStore.notification)

  return {
    notificationList,
    notificationSummary,
    notificationDetail
  }
}
