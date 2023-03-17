import api from "./api"
import type { SendInviteRequest } from "@/models/invitation"
import type { LoginResponse } from "@/models/loginResponse"

class UserApi {
  get (id: string) {
    return api.get(`/api/user/${id}`)
  }

  update (id: string, data: any) {
    return api.post(`/api/user/${id}`, data)
  }

  // this deletes a refresh token from the user's account
  signout () {
    return api.post("/api/user/sign-out")
  }

  setTheme (theme: string) {
    return api.post(`/api/user/set-theme/${theme}`)
  }

  sendVerificationEmail () {
    return api.post("/api/user/request-email-verification")
  }

  changePassword (
    oldPassword: string,
    newPassword: string,
    userId: string
  ) {
    return api.post(
      `/api/user/change-password/${userId}`,
      {
        originalPassword: oldPassword,
        newPassword
      }
    )
  }

  getAllUser () {
    return api.get("/api/user")
  }

  delete (userId: string) {
    return api.delete(`/api/user/${userId}`)
  }

  inviteUser (inviteRequest: SendInviteRequest) {
    return api.post("/api/user/invite", inviteRequest)
  }

  addUser (addRequest: SendInviteRequest) {
    return api.post("/api/user/create", addRequest)
  }

  updateRole (userId: string, roles: string[]) {
    return api.post(`/api/user/update-role/${userId}`, { roles })
  }

  setPhoto (file: File) {
    return api.post("/api/user/set-photo", { file })
  }

  search (query: string) {
    return api.get(`/api/user/search?query=${query}`)
  }

  refreshToken (refreshToken: string) {
    return api.post<LoginResponse>("/api/token", {
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  }

  registerWithSlack (token: string) {
    return api.post(`/api/user/register-with-slack/${token}`)
  }
}

export default new UserApi()
