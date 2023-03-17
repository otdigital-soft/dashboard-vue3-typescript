import type { SimpleUser } from "../simpleUser"
import { PendingState, Status } from "./serviceRequestDetail"

export class ServiceRequestSummary {
  id: string
  name: string | null
  currentRequestOwner: SimpleUser | null
  createdDateUtc: string | null
  requestedByDateUtc: string | null
  expirationDateUtc: string | null
  expirationDateSet: boolean | null
  status: Status
  pendingState: PendingState
  resourceCount: number

  constructor () {
    this.id = crypto.randomUUID()
    this.name = null
    this.currentRequestOwner = null
    this.createdDateUtc = null
    this.requestedByDateUtc = null
    this.expirationDateUtc = null
    this.expirationDateSet = null
    this.status = Status.Draft
    this.pendingState = PendingState.Create
    this.resourceCount = 0
  }
}
