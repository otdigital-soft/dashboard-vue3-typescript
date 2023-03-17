
import { useAppStore } from "@/stores/app"
import { computed } from "vue"

export default () => {
  const appStore = useAppStore()

  // Computed:
  const isLoading = computed(() => appStore.isAppLoading)

  return {
    isLoading
  }
}
