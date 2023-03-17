import { useServiceStore } from "@/stores/serviceRequest"

import { computed } from "vue"

export default () => {
  const serviceStore = useServiceStore()

  // Computed:
  const serviceRequestList = computed(() => serviceStore.serviceRequestList)
  const currentServiceRequest = computed(() => serviceStore.currentServiceRequest)

  return {
    serviceRequestList,
    currentServiceRequest
  }
}
