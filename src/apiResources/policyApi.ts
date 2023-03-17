import type { PolicyDetail } from "@/models/policies/policyDetail"
import type { PolicySummary } from "@/models/policies/policySummary"
import type { AxiosResponse } from "axios"
import api from "./api"

class PolicyApi {
  async list (): Promise<PolicySummary[]> {
    const response = await api
      .get<PolicySummary[]>("/api/policy")
      .then((response: AxiosResponse<PolicySummary[], any>) => {
        return response.data
      })
    return response
  }

  setDefaultPolicy (
    userId: string,
    policyId: string | null
  ) {
    if (policyId !== null) {
      return api.post(`/api/user/${userId}/set-policy/${policyId}`)
    } else {
      return api.post(`/api/user/${userId}/set-policy`)
    }
  }

  togglePolicy (policyId: string, active: boolean) {
    return api.put(`/api/policy/${policyId}/toggle-active/${active}`)
  }

  copy (policyId: string) {
    return api.put(`/api/policy/${policyId}/copy`)
  }

  create (
    name: string,
    isActive: boolean | false
  ) {
    return api.post("/api/policy/create", { name, isActive })
  }

  get (policyId: string) {
    return api.get(`/api/policy/${policyId}`)
  }

  update (
    policyId: string,
    policyDetail: PolicyDetail
  ) {
    return api.post(`/api/policy/${policyId}`, { ...policyDetail })
  }

  delete (policyId: string) {
    return api.delete(`/api/policy/${policyId}`)
  }

  updatePolicyOrder (
    accountId: string,
    updatedList: string[]
  ) {
    return api.post(`/api/account/update-policies/${accountId}`, { policies: updatedList })
  }
}

export default new PolicyApi()
