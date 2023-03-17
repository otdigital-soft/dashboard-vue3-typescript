import { useToast } from "vue-toastification"
import type { LoginResponse, Theme } from "@/models/loginResponse"
import { getToken, setToken, setAuthUser, destroyAuthUser, destroyToken, getAuthUser, setKey, destroyKey } from "@/services/jwt.service"
import { defineStore } from "pinia"
import { findIndex, isNil, path, pickBy, toString } from "ramda"
import type { UserAccountDetail } from "@/models/userAccountDetail"
import userApi from "@/apiResources/userApi"
import type { Role } from "@/models/roles"
import { useAccountSettingsStore } from "./accountSettings"

export const useUserStore = defineStore("user", {
  state: () => ({
    user: getAuthUser(),
    users: [] as Array<UserAccountDetail>,
    isAuthenticated: !!getToken()
  }),

  actions: {
    setUser (login: LoginResponse) {
      if (login.token.access_token && login.token.refresh_token && login.token.expires_in) {
        setToken(login.token.access_token)
        setKey("refresh_token", login.token.refresh_token)
        setKey("token_expires", toString(login.token.expires))
      }

      // remove token from user object:
      const userInfo: LoginResponse = pickBy((item: any, key: string) => key !== "token", login)
      setAuthUser(userInfo)

      this.isAuthenticated = true
      this.user = login
    },

    /**
     * Use the current token to fetch account information
     * this is mainly used to check if token is still valid
     */
    async getMe () {
      const currentUser = getAuthUser()
      const { data } = await userApi.get(currentUser.id)

      this.user = data
      setAuthUser(data)
    },

    async updateUserInfo (user: UserAccountDetail) {
      const toast = useToast()

      if (user.id) {
        try {
          const { data } = await userApi.update(user.id, user)
          const foundIndex = this.users.findIndex(u => u.id === data.id)
          this.users[foundIndex] = data
          toast.success("Updated successfully")
          return data
        } catch (error) {
          toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
          return false
        }
      }
    },

    setTheme (theme: Theme) {
      if (!isNil(this.user)) {
        this.user.theme = theme
        setAuthUser(this.user)

        userApi.setTheme(theme)
      }
    },

    logout () {
      try {
        userApi.signout()
      } catch (error) {

      }

      const { destroyAccount } = useAccountSettingsStore()

      destroyAuthUser()
      destroyToken()
      destroyKey("refresh_token")

      this.user = null
      this.isAuthenticated = false
      destroyAccount()
    },

    async fetchUserList () {
      const { data }: {data: Array<UserAccountDetail>} = await userApi.getAllUser()

      this.users = data
    },

    async deleteUser (id: string) {
      const toast = useToast()
      try {
        await userApi.delete(id)

        // find the index in users array, and then remove that user:
        const userIndex = findIndex(u => u.id === id, this.users)
        this.users.splice(userIndex, 1)

        toast.success("Deleted successfully")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async updateRole (id: string, roles: Role[]) {
      const toast = useToast()
      try {
        await userApi.updateRole(id, roles)

        const user = this.users[findIndex(u => u.id === id, this.users)]

        user.roles = roles
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    }

  },

  getters: {
    userInfo: (state) => {
      const user: any = { ...state.user }
      user.fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`

      return user
    },

    userList: (state) => state.users
  }
})
