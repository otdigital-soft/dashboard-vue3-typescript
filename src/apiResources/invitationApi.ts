import api from "./api"

class InvitationApi {
  getInvitations () {
    return api.get("/api/invitation")
  }

  getInvitation (id: string) {
    return api.get(`/api/invitation/${id}`)
  }

  deleteInvitation (id: string) {
    return api.delete(`/api/invitation/${id}`)
  }
}

export default new InvitationApi()
