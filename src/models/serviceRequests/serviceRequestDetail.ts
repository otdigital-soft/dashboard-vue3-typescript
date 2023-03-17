import { Lifetime, OperationType, ResourceType } from "../policies/policyDetail"
import type { Location } from "../accountDetail"

export enum Status {
    Draft = "Draft",
    Submitted = "Submitted",
    ReturnedForQuestions = "ReturnedForQuestions",
    WaitingForApprovals = "WaitingForApprovals",
    ApprovalsComplete = "ApprovalsComplete",
    DeploymentInProgress = "DeploymentInProgress",
    DeploymentComplete = "DeploymentComplete",
    Expired = "Expired",
    ReadyToRemove = "ReadyToRemove",
    PendingDelete = "PendingDelete",
}

export enum PendingState {
    None = "None",
    Create = "Create",
    Extend = "Extend",
    Modify = "Modify",
    Transfer = "Transfer",
}

export interface IServiceResource {
  id: string
  description: string | null
  location: Location | null
  operationType: OperationType
  resourceType: ResourceType
  otherConfiguration: string | null
}

export class ServiceResource implements IServiceResource {
  id: string
  description: string | null
  location: Location | null
  operationType: OperationType
  resourceType: ResourceType
  otherConfiguration: string | null

  constructor () {
    this.id = crypto.randomUUID().substring(0, 8)
    this.description = null
    this.location = null
    this.operationType = OperationType.Create
    this.resourceType = ResourceType.NotSet
    this.otherConfiguration = null
  }
}

export class AnalyticsResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Analytics
  }
}

export class BlockchainResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Blockchain
  }
}

export class ComputeResource extends ServiceResource {
  memoryGb: number
  vcpus: number | null
  operatingSystem: string | null
  virtual: boolean

  constructor () {
    super()
    this.resourceType = ResourceType.Compute
    this.memoryGb = 2
    this.vcpus = 1
    this.operatingSystem = null
    this.virtual = true
  }
}

export class ContainerResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Container
  }
}

export class DatabaseResource extends ServiceResource {
  databaseType: string | null
  databaseVersion: string | null
  databaseName: string | null
  databaseServer: string | null
  maxSizeGb: number | null

  constructor () {
    super()
    this.resourceType = ResourceType.Database
    this.databaseType = null
    this.databaseVersion = null
    this.databaseName = null
    this.databaseServer = null
    this.maxSizeGb = null
  }
}

export class DeveloperToolResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.DeveloperTool
  }
}

export class DevOpsResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.DevOps
  }
}

export class EmailResource extends ServiceResource {
  emailAddress: string | null
  groupName: string | null
  contactName: string | null
  otherAccount: string | null

  constructor () {
    super()
    this.resourceType = ResourceType.Email
    this.emailAddress = null
    this.groupName = null
    this.contactName = null
    this.otherAccount = null
  }
}

export class IdentityResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Identity
  }
}

export class IntegrationResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Integration
  }
}

export class ManagementToolResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.ManagementTool
  }
}

export class MediaResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Media
  }
}

export class MigrationResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Migration
  }
}

export class NetworkingResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Networking
  }
}

export class SecurityResource extends ServiceResource {
  userAccount: string | null
  groupName: string | null
  contactName: string | null
  otherAccount: string | null
  constructor () {
    super()
    this.resourceType = ResourceType.Security
    this.userAccount = null
    this.groupName = null
    this.contactName = null
    this.otherAccount = null
  }
}

export class SoftwareResource extends ServiceResource {
  product: string | null
  version: string | null
  constructor () {
    super()
    this.resourceType = ResourceType.Software
    this.product = null
    this.version = null
  }
}

export class StorageResource extends ServiceResource {
  storageType: string | null
  storageVersion: string | null
  storageName: string | null
  storageServer: string | null
  maxSizeGb: number | null

  constructor () {
    super()
    this.resourceType = ResourceType.Storage
    this.storageType = null
    this.storageVersion = null
    this.storageName = null
    this.storageServer = null
    this.maxSizeGb = null
  }
}

export class WebResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Web
  }
}

export class OtherResource extends ServiceResource {
  constructor () {
    super()
    this.resourceType = ResourceType.Other
  }
}

// There is more to this class, but this is all of the data needed now
export class ServiceRequestDetail {
  id: string
  name: string | null
  unlimitedLifetimeRequested: boolean
  lifetimeRequested: Lifetime | null
  requestedByDateUtc: string | null
  status: Status
  pendingState: PendingState
  requestedResources: IServiceResource[]

  constructor () {
    this.id = crypto.randomUUID().substring(0, 8)
    this.name = null
    this.unlimitedLifetimeRequested = false
    this.lifetimeRequested = new Lifetime()
    this.requestedByDateUtc = null
    this.status = Status.Draft
    this.pendingState = PendingState.Create
    this.requestedResources = []
  }
}

export const ResourceTypes: any = {
  Analytics: AnalyticsResource,
  Blockchain: BlockchainResource,
  Compute: ComputeResource,
  Container: ContainerResource,
  Database: DatabaseResource,
  DeveloperTool: DeveloperToolResource,
  DevOps: DevOpsResource,
  Email: EmailResource,
  Identity: IdentityResource,
  Integration: IntegrationResource,
  ManagementTool: ManagementToolResource,
  Media: MediaResource,
  Migration: MigrationResource,
  Networking: NetworkingResource,
  Security: SecurityResource,
  Software: SoftwareResource,
  Storage: StorageResource,
  Web: WebResource,
  Other: OtherResource
}
