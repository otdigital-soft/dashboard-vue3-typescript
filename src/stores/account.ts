import { useUserStore } from "@/stores/user"
import type { UserAccountDetail } from "@/models/userAccountDetail"
import accountApi from "@/apiResources/accountApi"
import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import { path } from "ramda"
import type { LoginResponse } from "@/models/loginResponse"

export const useAccountStore = defineStore("account", {
  state: () => ({
    account: null as null | LoginResponse
  }),
  getters: {
    accountInfo (state) {
      return state.account
    }
  },
  actions: {
    async join (token: string, accountInfo: UserAccountDetail) {
      try {
        const response = await accountApi.join(token, accountInfo)
        const { setUser } = useUserStore()

        // after registering, maybe we need to save the response account information?
        this.account = response.data
        if (this.account) {
          setUser(this.account)
        }
      } catch (error) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error))
      }
    }
  }
})
