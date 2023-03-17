import { PolicyDetail } from "../models/policies/policyDetail"
import { useToast } from "vue-toastification"

import { defineStore } from "pinia"
import { find, path } from "ramda"
import type { PolicySummary } from "@/models/policies/policySummary"
import policyApi from "@/apiResources/policyApi"

export const usePolicyStore = defineStore("policy", {
  state: () => ({
    policies: [] as Array<PolicySummary>,
    policy: (new PolicyDetail()) as PolicyDetail
  }),

  actions: {
    async fetchPolicies () {
      const toast = useToast()
      try {
        this.policies = await policyApi.list()
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    getPolicyNameById (id: string) {
      const policy = find(p => p.id === id, this.policies)
      return policy ? policy.name : "None"
    },

    async setDefaultPolicy (userId: string, policyId: string | null) {
      const toast = useToast()
      try {
        const { data } = await policyApi.setDefaultPolicy(userId, policyId)
        return data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async getPolicyById (id: string) {
      const toast = useToast()
      try {
        const { data } = await policyApi.get(id)
        this.policy = data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async deletePolicy (id: string) {
      const toast = useToast()
      try {
        await policyApi.delete(id)
        this.policies = this.policies.filter(p => p.id !== id)
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async updatePolicy (policy: PolicyDetail) {
      if (policy.id) {
        const toast = useToast()
        try {
          const { data } = await policyApi.update(policy.id, policy)
          this.policy = data

          toast.success("Successfully saved policy")
        } catch (error) {
          toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
        }
      }
    }
  },

  getters: {
    policyList: (state) => state.policies,
    currentPolicy: (state) => state.policy
  }
})
