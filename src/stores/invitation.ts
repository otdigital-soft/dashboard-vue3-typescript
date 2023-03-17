import type { Invitation, SendInviteRequest } from "@/models/invitation"
import invitationApi from "@/apiResources/invitationApi"
import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import { findIndex, isNil, map, path } from "ramda"
import { DateTime } from "luxon"
import userApi from "@/apiResources/userApi"

export const useInvitationStore = defineStore("invitation", {
  state: () => ({
    invitations: [] as Invitation[]
  }),
  getters: {
    invitationList (state) {
      if (!isNil(state.invitations)) {
        return map(invitation => {
          invitation.senderFullName = `${invitation.senderFirstName} ${invitation.senderLastName}`
          invitation.recipientFullName = `${invitation.recipientFirstName} ${invitation.recipientLastName}`

          if (invitation.createdDateUtc) {
            invitation.sent = DateTime.fromISO(invitation.createdDateUtc).toRelative()
          }

          return invitation
        }, state.invitations)
      }

      return []
    }
  },
  actions: {
    async fetchInvitations () {
      try {
        const { data } = await invitationApi.getInvitations()
        this.invitations = data
      } catch (error) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async deleteInvitation (id: string) {
      try {
        await invitationApi.deleteInvitation(id)

        // find the index in invitations array, and then remove that invitation:
        const userIndex = findIndex(i => i.id === id, this.invitations)
        this.invitations.splice(userIndex, 1)
      } catch (error) {
        const toast = useToast()

        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async inviteUser (user: SendInviteRequest) {
      const toast = useToast()
      try {
        await userApi.inviteUser(user)

        toast.success("Invite sent")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    }
  }
})
