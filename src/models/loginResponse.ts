import { Token } from "./token"

enum Theme {
  light = "light",
  dark = "dark"
}

class UserResponse {
  id: string | null

  accountId: string | null

  createdDateUtc: Date | null

  firstName: string | null

  lastName: string | null

  email: string | null

  emailConfirmed: boolean

  profilePictureLarge: string | null

  profilePictureSmall: string | null

  theme: Theme

  roles: string[] | null

  constructor () {
    this.id = null
    this.accountId = null
    this.createdDateUtc = null
    this.firstName = null
    this.lastName = null
    this.email = null
    this.emailConfirmed = false
    this.profilePictureLarge = null
    this.profilePictureSmall = null
    this.theme = Theme.light
    this.roles = []
  }

  populateValues (jsonObj: any) {
    this.id = jsonObj.id ?? null
    this.accountId = jsonObj.accountId ?? null
    this.createdDateUtc = jsonObj.createdDateUtc ?? null
    this.firstName = jsonObj.firstName ?? null
    this.lastName = jsonObj.lastName ?? null
    this.email = jsonObj.email ?? null
    this.emailConfirmed = jsonObj.emailConfirmed ?? null
    this.theme = jsonObj.theme ?? null
    this.roles = jsonObj.roles ?? []
  }
}

class LoginResponse extends UserResponse {
  token: Token

  constructor () {
    super()
    this.token = new Token()
  }
}

export { LoginResponse, UserResponse, Token, Theme }
