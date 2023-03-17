<template>
  <div class="px-6 w-[550px]">
    <div class="sm:flex sm:items-center pb-4 mt-4 mb-8">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Notifications
        </h1>
      </div>
    </div>
    <div
      v-if="todayNotifications.length!==0"
      class="w-full bg-white dark:bg-slate-700 border-gray-200 dark:border-gray-700 border p-4 mb-6 rounded-sm"
    >
      <h2 class="font-semibold text-lg mb-4 text-gray-500 dark:text-gray-200">
        Today
      </h2>
      <div v-for="(notification, index) in todayNotifications" :key="index">
        <div class="border-gray-200 dark:border-gray-600 border p-2 shadow-lg mb-2 cursor-pointer">
          <div class="flex place-content-between items-center">
            <div class="my-1">
              <button type="button" class="text-left" @click="showNotificationDialog(notification.id!)">
                <span :class="notification.read ? 'font-normal' : 'font-bold'">
                  {{ notification.subject }} <br>
                  <span class="font-normal"> {{ DateTime.fromISO(notification.createdDateUtc!).toRelative() }}</span>
                </span>
              </button>
            </div>
            <div class="mr-2" title="Delete notification">
              <XMarkIcon class="h-5 w-5 text-red-500" aria-hidden="true" @click="removeNotification(notification.id!)" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="todayNotifications.length===0">
        No new notifications
      </div>
    </div>
    <div
      v-if="earlierNotifications.length !==0"
      class="w-full bg-white dark:bg-slate-700 border-gray-200 dark:border-gray-700 border p-4 rounded-sm"
    >
      <h2 class="font-semibold text-lg mb-4 text-gray-500 dark:text-gray-200">
        Earlier
      </h2>
      <div v-for="(notification, index) in earlierNotifications" :key="index">
        <div class="border-gray-200 dark:border-gray-600 border p-2 shadow-lg mb-2 cursor-pointer">
          <div class="flex place-content-between items-center">
            <div class="my-1">
              <button type="button" class="text-left" @click="showNotificationDialog(notification.id!)">
                <span :class="notification.read ? 'font-normal' : 'font-bold'">
                  {{ notification.subject }} <br>
                  <span class="font-normal"> {{ DateTime.fromISO(notification.createdDateUtc!).toRelative() }}</span>
                </span>
              </button>
            </div>
            <div class="mr-2" title="Delete notification">
              <XMarkIcon class="h-5 w-5 text-red-500" aria-hidden="true" @click="removeNotification(notification.id!)" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="earlierNotifications.length===0">
        No notifications
      </div>
    </div>
    <div
      v-if="todayNotifications.length===0 && earlierNotifications.length===0"
      class="w-full bg-white dark:bg-slate-700 border-gray-200 dark:border-gray-700 border p-4 rounded-sm text-gray-500 dark:text-gray-200"
    >
      You have no notifications
    </div>
    <ViewNotification :id=" selectedNotificationId" :open="isViewDialogOpen" @close="isViewDialogOpen=false" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { DateTime } from "luxon"
import useNotification from "@/composables/useNotification"
import { XMarkIcon } from "@heroicons/vue/24/outline"
import { useNotificationStore } from "@/stores/notification"
import { useAppStore } from "@/stores/app"
import ViewNotification from "@/components/dialogs/ViewNotification.vue"

const { notificationList } = useNotification()
const { fetchNotifications, deleteNotification } = useNotificationStore()
const selectedNotificationId = ref<string | null>(null)
const isViewDialogOpen = ref(false)
const { setLoading } = useAppStore()
onMounted(async () => {
  setLoading(true)
  await fetchNotifications()
  setLoading(false)
})

const todayNotifications = computed(() => {
  return notificationList.value.filter(notification => DateTime.fromISO(notification.createdDateUtc) > DateTime.local().startOf("day"))
})

const earlierNotifications = computed(() => {
  return notificationList.value.filter(notification => DateTime.fromISO(notification.createdDateUtc) < DateTime.local().startOf("day"))
})

const removeNotification = (id: string) => {
  deleteNotification(id)
}

const showNotificationDialog = (id: string) => {
  selectedNotificationId.value = id
  isViewDialogOpen.value = true
}

</script>
