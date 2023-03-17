export class SimpleUser {
  id: string
  email: string | null

  constructor () {
    this.id = crypto.randomUUID()
    this.email = null
  }
}

export class SimpleUserWithAttributes extends SimpleUser {
  firstName: string | null
  lastName: string | null
  title: string | null
  profilePictureLarge: string | null
  ProfilePictureSmall: string | null
  department: string | null
  city: string | null
  state: string | null
  country: string | null
  postalCode: string | null
  officeLocation: string | null
  usageLocation: string | null

  constructor () {
    super()
    this.firstName = null
    this.lastName = null
    this.title = null
    this.profilePictureLarge = null
    this.ProfilePictureSmall = null
    this.department = null
    this.city = null
    this.state = null
    this.country = null
    this.postalCode = null
    this.officeLocation = null
    this.usageLocation = null
  }
}
