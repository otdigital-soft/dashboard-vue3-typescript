class GraphMeResponse {
  id: string | null
  department: string | null
  mail: string | null
  givenName: string | null
  surname: string | null
  jobTitle: string | null
  city: string | null
  state: string | null
  country: string | null
  officeLocation: string | null
  postalCode: string | null
  usageLocation: string | null
  emailVerified: boolean

  constructor () {
    this.id = null
    this.department = null
    this.mail = null
    this.givenName = null
    this.surname = null
    this.jobTitle = null
    this.city = null
    this.state = null
    this.country = null
    this.officeLocation = null
    this.postalCode = null
    this.usageLocation = null
    this.emailVerified = true
  }
}

export { GraphMeResponse }
