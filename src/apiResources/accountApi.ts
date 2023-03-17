import type { UserAccountDetail } from "@/models/userAccountDetail"
import type { AccountDetail } from "@/models/accountDetail"
import api from "./api"

class AccountApi {
  join (token: string, accountInfo: UserAccountDetail) {
    return api.post(`/api/account/join/${token}`, accountInfo)
  }

  register (accountInfo: UserAccountDetail) {
    return api.post("/api/account/create-account", accountInfo)
  }

  deactivateAccount (id: string) {
    return api.post(`/api/account/deactivate/${id}`)
  }

  getAccount () {
    return api.get("/api/account")
  }

  updateAccount (id: string, accountDetail: AccountDetail) {
    return api.post(`/api/account/${id}`, accountDetail)
  }

  setTenantId (id: string | null) {
    if (id === null) {
      return api.post("/api/account/set-tenant-id")
    } else {
      return api.post(`/api/account/set-tenant-id/${id}`)
    }
  }

  registerWithSlack (accessToken: string, botUserId: string, teamId: string, teamName: string, userId: string) {
    return api.post("/api/account/register-with-slack", {
      accessToken,
      botUserId,
      teamId,
      teamName,
      userId
    })
  }
}

export default new AccountApi()
