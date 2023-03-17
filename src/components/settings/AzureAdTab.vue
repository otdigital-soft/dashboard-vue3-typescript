<template>
  <div class="w-1/2">
    <div v-if="accountSettings?.tenantId === null">
      <div class=" bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-400 p-4">
        <div class="flex content-center items-center">
          <div class="flex-shrink-0">
            <ExclamationTriangleIcon class="h-10 w-10 text-yellow-500 dark:text-yellow-200" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700 dark:text-yellow-100">
              Your Concierge account is not connected to an Azure AD tenant.
            </p>
          </div>
        </div>
      </div>

      <router-link to="/admin/link-ad" class="btn-outline btn-blue mt-6">
        Connect now
      </router-link>
    </div>
    <div v-if="accountSettings?.tenantId !== null">
      <div class="bg-green-50 dark:bg-gray-700 border-l-4 border-green-400 p-4">
        <div class="flex content-center items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-10 w-10 text-green-400 dark:text-green-200" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700 dark:text-green-200">
              Your Concierge account is connected to an Azure AD tenant.
            </p>
            <p v-if="accountSettings?.lastDirectorySync !== null" class="text-sm text-green-700 dark:text-green-300">
              Last update: <strong>{{ DateTime.fromISO(accountSettings?.lastDirectorySync!).toRelative() }}</strong>
            </p>
            <p v-if="accountSettings?.lastDirectorySync === null" class="text-sm text-green-700 dark:text-green-300">
              Last update: <strong>never</strong>
            </p>
          </div>
        </div>
      </div>

      <button type="button" class="btn-outline btn-red mt-16" @click="disconnectDialogOpen=true">
        Disconnect tenant
      </button>
    </div>
  </div>

  <DisconnectTenant :open="disconnectDialogOpen" @close="disconnectDialogOpen=false" @disconnect="disconnectTenant" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { DateTime } from "luxon"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/vue/20/solid"
import { useAccountSettingsStore } from "@/stores/accountSettings"
import { useToast } from "vue-toastification"
import DisconnectTenant from "@/components/dialogs/DisconnectTenant.vue"

const accountSettingsStore = useAccountSettingsStore()
const accountSettings = computed(() => accountSettingsStore.accountInfo)
const toast = useToast()
const disconnectDialogOpen = ref(false)

const disconnectTenant = () => {
  disconnectDialogOpen.value = false
  accountSettingsStore.setTenantId(null).then(() => {
    toast.success("Disconnected from Azure AD tenant")
  })
}

</script>

<style scoped>

</style>
