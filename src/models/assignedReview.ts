import { SimpleUser } from "./simpleUser"

export class AssignedReview {
  id: string
  createdDateUtc: string | null
  requestOwnerFirstName: string | null
  requestOwnerLastName: string | null
  requestOwnerEmail: string | null
  requestImageUrl: string | null
  assignedUser: SimpleUser
  serviceRequestId: string | null

  constructor () {
    this.id = crypto.randomUUID()
    this.createdDateUtc = null
    this.requestOwnerFirstName = null
    this.requestOwnerLastName = null
    this.requestOwnerEmail = null
    this.requestImageUrl = null
    this.assignedUser = new SimpleUser()
    this.serviceRequestId = null
  }
}
