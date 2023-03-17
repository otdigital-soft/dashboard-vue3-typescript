
import { useAccountSettingsStore } from "@/stores/accountSettings"
import { computed } from "vue"

export default () => {
  const accountSettingsStore = useAccountSettingsStore()

  // Computed:
  const accountInfo = computed(() => accountSettingsStore.accountInfo)

  return {
    accountInfo
  }
}
