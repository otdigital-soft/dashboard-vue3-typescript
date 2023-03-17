export class SendInviteRequest {
  firstName: string | null
  lastName: string | null
  email: string | null
  requireAzure: boolean

  constructor () {
    this.firstName = null
    this.lastName = null
    this.email = null
    this.requireAzure = false
  }
}

export class Invitation {
  id: string
  recipientEmail: string | null
  recipientFirstName: string | null
  recipientLastName: string | null
  senderFirstName: string | null
  senderLastName: string | null
  senderEmail: string | null
  senderOrganization: string | null
  createdDateUtc: string | null
  requireAzure: boolean

  // this two properties are used in invitation store:
  senderFullName: string | null
  recipientFullName: string | null
  sent: string | null

  constructor () {
    this.id = crypto.randomUUID()
    this.recipientEmail = null
    this.recipientFirstName = null
    this.recipientLastName = null
    this.senderFirstName = null
    this.senderLastName = null
    this.senderEmail = null
    this.senderOrganization = null
    this.createdDateUtc = null
    this.requireAzure = false

    this.senderFullName = null
    this.recipientFullName = null
    this.sent = null
  }
}
