import { usePolicyStore } from "@/stores/policy"
import { computed } from "vue"

export default () => {
  const policyStore = usePolicyStore()

  // Computed:
  const policyList = computed(() => policyStore.policyList)
  const currentPolicy = computed(() => policyStore.currentPolicy)

  return {
    policyList,
    currentPolicy
  }
}
