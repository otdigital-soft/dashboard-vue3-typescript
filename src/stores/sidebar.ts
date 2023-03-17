import { defineStore } from "pinia"

export const useSideBarStore = defineStore("sideBar", {
  state: () => ({
    sideBarValue: localStorage.getItem("sideBar-collapsed") ? Boolean(JSON.parse(localStorage.getItem("sideBar-collapsed") ?? "false")) : false
  }),
  getters: {
    sideBarCollapsed (state) {
      if (localStorage.getItem("sideBar-collapsed") === null) {
        localStorage.setItem("sideBar-collapsed", "false")
      }

      return state.sideBarValue
    }
  },
  actions: {
    setSideBarCollapsed (collapsed: boolean) {
      localStorage.setItem("sideBar-collapsed", collapsed.toString())

      this.sideBarValue = collapsed
    }
  }
})
