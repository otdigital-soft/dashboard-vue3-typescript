
import dashboardApi from "@/apiResources/dashboardApi"
import { Dashboard } from "@/models/dashboard"
import { defineStore } from "pinia"
import { path } from "ramda"
import { useToast } from "vue-toastification"

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    dashboard: (new Dashboard()) as Dashboard
  }),
  getters: {
    dashboardInfo (state) {
      return state.dashboard
    }
  },
  actions: {
    async fetchDashboardData () {
      try {
        const { data } = await dashboardApi.getDashboardInfo()
        this.dashboard = data
      } catch (err) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error))
      }
    }
  }
})
