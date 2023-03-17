import { NotificationSettings } from "./policies/policyDetail"

export enum AccountType {
    Standard = "Standard",
    Premium = "Premium",
    Enterprise = "Enterprise",
    Custom = "Custom"
}

export enum LocationType {
    Internal = "Internal",
    Amazon = "Amazon",
    Azure = "Azure",
    Google = "Google",
    Other = "Other"
}

export class Location {
  type: LocationType
  name: string

  constructor () {
    this.type = LocationType.Internal
    this.name = ""
  }
}

export class AccountDetail {
  id: string
  accountType: AccountType
  directAccount: boolean
  isTrial: boolean
  trialExpires: string | null
  name: string | null
  defaultCulture: string
  currencySymbol: string
  tenantId: string | null
  tenantName: string | null
  logoImageLargeUrl: string | null
  logoImageSmallUrl: string | null
  lastDirectorySync: string | null
  slackRegistered: boolean
  locations: Location[]
  notificationSettings: NotificationSettings

  constructor () {
    this.id = crypto.randomUUID()
    this.accountType = AccountType.Standard
    this.directAccount = false
    this.isTrial = true
    this.trialExpires = null
    this.name = null
    this.defaultCulture = "en-US"
    this.currencySymbol = "$"
    this.tenantId = null
    this.tenantName = null
    this.logoImageLargeUrl = null
    this.logoImageSmallUrl = null
    this.lastDirectorySync = null
    this.slackRegistered = false
    this.locations = []
    this.notificationSettings = new NotificationSettings()
  }
}
