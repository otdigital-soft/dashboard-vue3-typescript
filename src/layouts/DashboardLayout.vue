<template>
  <Loader :loading="isLoading" />
  <div
    :data-layout="layout"
    :data-collapsed="isSideBarCollapsed"
    :data-background="isDarkModeEnabled ? 'dark' : 'light'"
    class="font-sans antialiased text-sm disable-scrollbars"
  >
    <div class="wrapper">
      <Sidebar />
      <div class="main w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Header />
        <div class="w-full min-h-screen p-4">
          <router-view />
        </div>
        <Footer />
      </div>
    </div>
  </div>
  <v-idle :duration="idleDuration" @idle="onIdle" />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import Sidebar from "../components/Sidebar.vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { useUserStore } from "@/stores/user"
import { useNotificationStore } from "@/stores/notification"
import useUser from "@/composables/useUser"
import { useAccountSettingsStore } from "@/stores/accountSettings"
import Loader from "@/components/common/Loader.vue"
import useApp from "@/composables/useApp"
import { getKey, clear } from "@/services/jwt.service"
import userApi from "@/apiResources/userApi"
import { DateTime } from "luxon"

const layout = ref("dashboard") // this needs to be changed to come from pinia
const idleDuration = ref<number>(parseInt(import.meta.env.VITE_IDLE_TIMEOUT))

const { isSideBarCollapsed, isDarkModeEnabled } = useUser()
const { getMe, setUser, logout } = useUserStore()
const { fetchNotifications } = useNotificationStore()
const { getAccountSettings } = useAccountSettingsStore()
const { isLoading } = useApp()
const router = useRouter()

onBeforeMount(async () => {
  const tokenExpires = getKey("token_expires")

  // if token is about to expire, we need to refresh it:
  if (tokenExpires && DateTime.fromSeconds(parseInt(tokenExpires)) <= DateTime.now().plus({ minute: 10 })) {
    const refreshToken = getKey("refresh_token")
    if (refreshToken) {
      const { data } = await userApi.refreshToken(refreshToken)
      setUser(data)
    }
  }
})

onMounted(() => {
  getMe().then(() => {
    fetchNotifications().then(() => {
      getAccountSettings()
    })
  })
})

const onIdle = () => {
  logout()
  router.push("/sign-in")
  clear()
}
</script>

<style lang="">

</style>
