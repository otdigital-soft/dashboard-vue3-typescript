<template>
  <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars -->
  <Popover v-slot="{ open }" as="template">
    <header
      class="dark:bg-gray-900"
      :class="[open ? 'fixed inset-0 z-40 overflow-y-auto' : 'flex h-14', 'bg-white border-b border-gray-100 dark:border-gray-800 lg:static lg:overflow-y-visible']"
    >
      <div class="relative flex justify-between w-full py-2 px-3 sm:px-5">
        <div
          class="flex items-center md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2"
          :class="open? 'hidden' : ''"
        >
          <div class="flex-shrink-0 flex items-center">
            <button @click="isSideBarCollapsed = !isSideBarCollapsed">
              <Bars3Icon class="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <ThemeSwitcher class="mt-2 ml-4" />
        </div>

        <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
          <!-- Mobile menu button -->
          <PopoverButton
            class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>

        <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
          <Notification />

          <ProfileMenu />

          <router-link
            to="/service-requests/create"
            class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            New Request
          </router-link>
        </div>
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="absolute left-0 top-14 z-10 w-screen px-4 "
          >
            <div
              class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div class="relative grid gap-8 dark:bg-slate-700 dark:text-white p-4 lg:grid-cols-2">
                <router-link
                  to="/notifications"
                  class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                >
                  <BellIcon class="h-6 w-6 " aria-hidden="true" />
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      See All Notifications
                    </p>
                  </div>
                </router-link>
                <router-link
                  to="/profile"
                  class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                >
                  <User class="h-6 w-6" aria-hidden="true" />
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      Profile
                    </p>
                  </div>
                </router-link>
              </div>
              <div class="bg-gray-50 dark:bg-slate-800 p-4">
                <router-link
                  to="#"
                  class="dark:text-white text-gray-700 dark:hover:bg-slate-700 inline-flex items-start w-full "
                  @click.prevent="logout"
                >
                  <LogOut class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                  Sign out
                </router-link>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </div>
    </header>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/vue/24/outline"
import { LogOut, User } from "lucide-vue-next"
import Notification from "./header/Notification.vue"
import ProfileMenu from "./header/ProfileMenu.vue"
import ThemeSwitcher from "./header/ThemeSwitcher.vue"
import useUser from "@/composables/useUser"
import { useUserStore } from "@/stores/user"

const { isSideBarCollapsed } = useUser()
const { logout } = useUserStore()

</script>

<style scoped>

</style>
