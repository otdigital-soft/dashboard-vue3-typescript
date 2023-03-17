import { useToast } from "vue-toastification"
import userApi from "@/apiResources/userApi"
import { useSideBarStore } from "@/stores/sidebar"
import { useUserStore } from "@/stores/user"
import { Theme } from "@/models/loginResponse"

import { computed } from "vue"
import { path } from "ramda"

export default () => {
  const userStore = useUserStore()
  const sideBarStore = useSideBarStore()
  const toast = useToast()

  // Computed:
  const userInfo = computed(() => userStore.userInfo)
  const userList = computed(() => userStore.userList)
  const isSideBarCollapsed = computed({
    get: () => sideBarStore.sideBarCollapsed,
    set: (newVal: boolean) => sideBarStore.setSideBarCollapsed(newVal)
  })
  const isDarkModeEnabled = computed({
    get: () => {
      updateBodyTag(userInfo.value.theme)
      return userInfo.value.theme === "dark"
    },
    set: (newVal: boolean) => {
      const newTheme: Theme = newVal ? Theme.dark : Theme.light
      updateBodyTag(newTheme)
      userStore.setTheme(newTheme)
    }
  })

  const updateBodyTag = (theme: Theme) => {
    if (theme === Theme.dark) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }

  const sendVerificationEmail = async () => {
    try {
      await userApi.sendVerificationEmail()

      toast.success("Email sent")
    } catch (error) {
      toast.error(path(["response", "data", "errors", 0, "message"], error))
    }
  }

  return {
    userInfo,
    userList,
    isSideBarCollapsed,
    isDarkModeEnabled,
    sendVerificationEmail
  }
}
