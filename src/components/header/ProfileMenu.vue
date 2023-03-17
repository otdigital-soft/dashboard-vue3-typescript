<template>
  <!-- Profile dropdown -->
  <Menu as="div" class="flex-shrink-0 relative ml-5">
    <div>
      <MenuButton class="bg-white dark:bg-gray-900 text-gray-400 dark:text-white rounded-full flex hover:text-gray-500">
        <span class="sr-only">Open user menu</span>
        <img v-if="userInfo.profilePictureSmall" class="h-8 w-8 rounded-full" :src="userInfo.profilePictureSmall">
        <UserCircleIcon v-else class="h-6 w-6" />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="origin-top-right dark:bg-slate-800 border dark:border-gray-700 absolute z-10 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
      >
        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
          <router-link
            v-if="item.name !== 'Sign out'"
            :to="item.href"
            class="dark:text-white text-gray-700 dark:hover:bg-slate-700  inline-flex items-start w-full"
            :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm']"
          >
            <User class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            {{ item.name }}
          </router-link>
          <router-link
            v-else
            :to="item.href"
            class="dark:text-white text-gray-700 dark:hover:bg-slate-700 inline-flex items-start w-full"
            :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm ']"
            @click.prevent="logout"
          >
            <LogOut class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            {{ item.name }}
          </router-link>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
</script>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue"
import { UserCircleIcon } from "@heroicons/vue/24/outline"
import { LogOut, User } from "lucide-vue-next"
import { useUserStore } from "@/stores/user"
import useUser from "@/composables/useUser"

const { logout } = useUserStore()
const { userInfo } = useUser()

const userNavigation = [
  { name: "Profile", href: "/profile" },
  { name: "Sign out", href: "#" }
]
</script>

<style scoped>

</style>
