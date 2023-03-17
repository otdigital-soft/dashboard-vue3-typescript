import type { Role } from "@/models/roles"

class UserAccountDetail {
  id: string | null
  accountType: string
  accountName: string | null
  firstName: string | null
  lastName: string | null
  title: string | null
  email: string | null
  emailVerified: boolean
  department: string | null
  password: string | null
  azureId: string | null
  defaultPolicy: any | null
  tenantId: string | null
  roles: Role[]
  city: string | null
  state: string | null
  country: string | null
  officeLocation: string | null
  postalCode: string | null
  usageLocation: string | null
  culture: string | null

  constructor () {
    this.id = null
    this.accountType = "Standard"
    this.accountName = null
    this.firstName = null
    this.lastName = null
    this.title = null
    this.email = null
    this.emailVerified = false
    this.department = null
    this.password = null
    this.azureId = null
    this.defaultPolicy = null
    this.tenantId = null
    this.city = null
    this.state = null
    this.country = null
    this.officeLocation = null
    this.postalCode = null
    this.usageLocation = null
    this.culture = null
    this.roles = []
  }
}

export { UserAccountDetail }
