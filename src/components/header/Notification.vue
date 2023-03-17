<template>
  <Menu as="div" class="relative hidden lg:inline-block text-left">
    <MenuButton
      class="ml-5 flex-shrink-0 bg-white dark:bg-gray-900 dark:text-white rounded-full p-1 text-gray-400 hover:text-gray-500 relative"
    >
      <span class="sr-only">View notifications</span>
      <div v-if="notificationSummary.length > 0" class="absolute rounded-full bg-red-600 h-4 w-4 -top-0.5 left-4 text-white text-xs z-10">
        {{ notificationSummary.length }}
      </div>
      <BellIcon class="h-6 w-6" aria-hidden="true" />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute z-10 origin-top-left right-0 dark:bg-slate-800 dark:border-gray-700 bg-white border-slate-100 border shadow-lg shadow-slate-200 dark:shadow-slate-800 rounded-md divide-y dark:divide-gray-700 w-[250px]"
      >
        <MenuItem
          v-for="(notification, index) in notificationSummary"
          :key="index"
          as="div"
          class="py-2 px-5 hover:bg-slate-50 dark:hover:bg-slate-700 first:pt-4 last:pb-4"
        >
          <button type="button" class="text-left" @click="showNotificationDialog(notification.id!)">
            <span class="font-medium pb-1">
              {{ notification.subject }} <br>
              <span class="text-slate-500 font-normal"> {{ DateTime.fromISO(notification.createdDateUtc!).toRelative()
              }}</span>
            </span>
          </button>
        </MenuItem>
        <MenuItem
          as="div"
          class="pt-4 px-5 hover:bg-slate-50 dark:hover:bg-slate-700 first:pt-4 last:pb-4 text-blue-600 dark:text-blue-400 font-semibold"
        >
          <router-link to="/notifications">
            See All Notifications
          </router-link>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
  <ViewNotification :id="selectedNotificationId" :open="isViewDialogOpen" @close="isViewDialogOpen=false" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { BellIcon } from "@heroicons/vue/24/outline"
import { DateTime } from "luxon"
import ViewNotification from "../dialogs/ViewNotification.vue"
import useNotification from "@/composables/useNotification"
const selectedNotificationId = ref<string | null>(null)
const isViewDialogOpen = ref(false)

const { notificationSummary } = useNotification()

const showNotificationDialog = (id: string) => {
  selectedNotificationId.value = id
  isViewDialogOpen.value = true
}
</script>

<style scoped>

</style>
