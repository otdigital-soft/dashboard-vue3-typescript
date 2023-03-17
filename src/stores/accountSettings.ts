import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import accountApi from "@/apiResources/accountApi"
import type { AccountDetail } from "@/models/accountDetail"
import type { UserAccountDetail } from "@/models/userAccountDetail"
import { useUserStore } from "./user"
import { path } from "ramda"

export const useAccountSettingsStore = defineStore("accountSettings", {
  state: () => ({
    accountSettings: null as null | AccountDetail
  }),
  getters: {
    accountInfo (state) {
      return state.accountSettings
    }
  },
  actions: {
    async register (accountInfo: UserAccountDetail) {
      try {
        const response = await accountApi.register(accountInfo)
        const { setUser } = useUserStore()

        // after registering, maybe we need to save the response account information?
        this.accountSettings = response.data
        if (this.accountSettings) {
          setUser(this.accountSettings)
        }
      } catch (error) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async deactivateAccount (id: string) {
      const toast = useToast()
      try {
        await accountApi.deactivateAccount(id)
        toast.success("Your account has been deactivated and is scheduled for deletion.")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async getAccountSettings () {
      const toast = useToast()
      try {
        const { data } = await accountApi.getAccount()
        this.accountSettings = data
      } catch (error) {
        toast.error("Error retrieving account settings")
      }
    },

    async updateAccountSettings (id: string, accountSettings: AccountDetail) {
      const toast = useToast()
      try {
        if (accountSettings.id !== null) {
          await accountApi.updateAccount(id, accountSettings)
          this.accountSettings = accountSettings
          toast.success("Settings updated")
        }
      } catch (error) {
        toast.error("Error updating account settings")
      }
    },

    async setTenantId (id: string | null) {
      const toast = useToast()
      try {
        await accountApi.setTenantId(id)
        if (this.accountSettings !== null) {
          this.accountSettings.tenantId = id
        }
      } catch (error) {
        toast.error("Error updating account settings")
      }
    },

    destroyAccount () {
      this.accountSettings = null
    }
  }
})
