import type { ResourceType, Lifetime } from "../policies/policyDetail"
import type { SimplePolicy } from "../policies/simplePolicy"
import { SimpleUser, type SimpleUserWithAttributes } from "../simpleUser"
import { Status, PendingState, type IServiceResource } from "./serviceRequestDetail"
import type { Location } from "../accountDetail"
import { DateTime } from "luxon"

export class ReviewerResponse {
  responseDateUtc: string
  reviewer: SimpleUser
  comment: string | null
  approved: boolean

  constructor () {
    this.responseDateUtc = DateTime.now().toISO()
    this.reviewer = new SimpleUser()
    this.comment = null
    this.approved = false
  }
}

export class Comment {
  commentId: string
  replyToCommentId: string | null
  createdDateUtc: string
  author: SimpleUser | null
  content: string | null
  isPublic: boolean

  constructor () {
    this.commentId = crypto.randomUUID().substring(0, 8)
    this.replyToCommentId = null
    this.createdDateUtc = DateTime.now().toISO()
    this.author = null
    this.content = null
    this.isPublic = true
  }
}

export class DeployedResource {
  id: string | null
  createdDateUtc: string
  removedDateUtc: string | null
  deployedBy: SimpleUser | null
  removedBy: SimpleUser | null
  name: string | null
  description: string | null
  location: Location | null
  monthlyCost: number
  internalAssetId: string | null
  regionOrZone: string | null
  resourceGroup: string | null
  resourceType: ResourceType | null
  subscription: string | null
  url: string | null
  comments: Comment[]

  constructor () {
    this.id = crypto.randomUUID().substring(0, 8)
    this.createdDateUtc = DateTime.now().toISO()
    this.removedDateUtc = null
    this.deployedBy = null
    this.removedBy = null
    this.description = null
    this.internalAssetId = null
    this.location = null
    this.monthlyCost = 0
    this.name = null
    this.regionOrZone = null
    this.resourceGroup = null
    this.resourceType = null
    this.subscription = null
    this.url = null
    this.comments = []
  }
}

export class StatusEvent {
  message: string | null
  statusType: Status | null
  statusDateTimeUtc: string

  constructor () {
    this.message = null
    this.statusType = null
    this.statusDateTimeUtc = DateTime.now().toISO()
  }
}

export class ReviewResponseCollection {
  creationReviewerResponses: ReviewerResponse[]
  extensionReviewerResponses: ReviewerResponse[]
  modificationReviewerResponses: ReviewerResponse[]
  transferReviewerResponses: ReviewerResponse[]

  constructor () {
    this.creationReviewerResponses = []
    this.extensionReviewerResponses = []
    this.modificationReviewerResponses = []
    this.transferReviewerResponses = []
  }
}

export class ChangeItem {
  id: string
  location: Location | null
  resourceType: ResourceType | null
  property: string | null
  oldValue: string | null
  newValue: string | null

  constructor () {
    this.id = crypto.randomUUID().substring(0, 8)
    this.location = null
    this.resourceType = null
    this.property = null
    this.oldValue = null
    this.newValue = null
  }
}

export class ChangeEvent {
  createdDateUtc: string
  changes: ChangeItem[]

  constructor () {
    this.createdDateUtc = DateTime.now().toISO()
    this.changes = []
  }
}

export class DeployedServiceRequest {
  id: string
  name: string | null
  activePolicy: SimplePolicy | null
  currentRequestOwner: SimpleUserWithAttributes | null
  pendingRequestOwner: SimpleUser | null
  unlimitedLifetimeRequested: boolean
  lifetimeRequested: Lifetime | null
  requestedByDateUtc: string | null
  expirationDateUtc: string | null
  expirationDateSet: boolean
  status: Status
  pendingState: PendingState
  requestedResources: IServiceResource[]
  deployedResources: DeployedResource[]
  events: StatusEvent[]
  comments: Comment[]
  reviewResponses: ReviewResponseCollection
  changeList: ChangeEvent[]

  constructor () {
    this.id = crypto.randomUUID()
    this.name = null
    this.activePolicy = null
    this.currentRequestOwner = null
    this.pendingRequestOwner = null
    this.unlimitedLifetimeRequested = false
    this.lifetimeRequested = null
    this.requestedByDateUtc = null
    this.expirationDateUtc = null
    this.expirationDateSet = false
    this.status = Status.Draft
    this.pendingState = PendingState.Create
    this.events = []
    this.comments = []
    this.requestedResources = []
    this.deployedResources = []
    this.reviewResponses = new ReviewResponseCollection()
    this.changeList = []
  }
}
