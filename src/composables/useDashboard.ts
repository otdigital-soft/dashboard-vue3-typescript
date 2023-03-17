
import { useDashboardStore } from "@/stores/dashboard"
import { computed } from "vue"

export default () => {
  const dashboardStore = useDashboardStore()

  // Computed:
  const dashboardInfo = computed(() => dashboardStore.dashboardInfo)

  return {
    dashboardInfo
  }
}
