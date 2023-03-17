import type { Role } from "@/models/roles"

export class CreateAccountResponse {
  id: string | null

  userId: string | null

  accountName: string | null

  accountType: string | null

  trialExpires: Date | null

  firstName: string | null

  lastName: string | null

  isTrial: string | null

  email: string | null

  emailConfirmed: boolean

  profilePictureLarge : string | null

  profilePictureSmall : string | null

  roles: Role[]

  constructor () {
    this.id = null
    this.userId = null
    this.accountName = null
    this.accountType = null
    this.trialExpires = null
    this.firstName = null
    this.lastName = null
    this.isTrial = null
    this.email = null
    this.emailConfirmed = false
    this.profilePictureLarge = null
    this.profilePictureSmall = null
    this.roles = []
  }
}
