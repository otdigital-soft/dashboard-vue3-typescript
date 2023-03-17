import type { SimpleUser } from "../simpleUser"

export enum LifetimeType {
    Days = "Days",
    Weeks = "Weeks",
    Months = "Months",
    Years = "Years"
}

export enum Evaluation {
    And = "And",
    Or = "Or"
}

export enum OperationType {
    Create = "Create",
    Modify = "Modify",
    Delete = "Delete"
}

export enum ResourceType {
    NotSet = "NotSet",
    Analytics = "Analytics",
    Blockchain = "Blockchain",
    Compute = "Compute",
    Container = "Container",
    Database = "Database",
    DeveloperTool = "DeveloperTool",
    DevOps = "DevOps",
    Email = "Email",
    Identity = "Identity",
    Integration = "Integration",
    ManagementTool = "ManagementTool",
    Media = "Media",
    Migration = "Migration",
    Networking = "Networking",
    Security = "Security",
    Software = "Software",
    Storage = "Storage",
    Web = "Web",
    Other = "Other"
}

export enum AppliesTo {
    Everyone = "Everyone",
    Title = "Title",
    Department = "Department",
    OfficeLocation = "OfficeLocation",
    City = "City",
    State = "State",
    Country = "Country",
    PostalCode = "PostalCode",
    UsageLocation = "UsageLocation",
}

export enum Comparison {
    Equal = "Equal",
    NotEqual = "NotEqual",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    IsNull = "IsNull",
    IsNotNull = "IsNotNull"
}

export enum ReportComparison {
    Equal = "Equal",
    NotEqual = "NotEqual",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    GreaterThan = "GreaterThan",
    GreaterThanOrEqual = "GreaterThanOrEqual",
    LessThan = "LessThan",
    LessThanOrEqual = "LessThanOrEqual",
    IsNull = "IsNull",
    IsNotNull = "IsNotNull"
}

export const ComparisonMapper = {
  [Comparison.Equal]: "Equals",
  [Comparison.NotEqual]: "Not equal",
  [Comparison.StartsWith]: "Starts with",
  [Comparison.EndsWith]: "Ends with",
  [Comparison.IsNull]: "Is null",
  [Comparison.IsNotNull]: "Is not null"
}

export const ReportComparisonMapper = {
  [ReportComparison.Equal]: "Equals",
  [ReportComparison.NotEqual]: "Not equal",
  [ReportComparison.StartsWith]: "Starts with",
  [ReportComparison.EndsWith]: "Ends with",
  [ReportComparison.GreaterThan]: "Greater than",
  [ReportComparison.GreaterThanOrEqual]: "Greater than or equal",
  [ReportComparison.LessThan]: "Less than",
  [ReportComparison.LessThanOrEqual]: "Less than or equal",
  [ReportComparison.IsNull]: "Is null",
  [ReportComparison.IsNotNull]: "Is not null"
}

export enum ReviewSource {
    None = "None",
    ReviewerRole = "ReviewerRole",
    Manager = "Manager",
    SecurityGroup = "SecurityGroup",
    AllOf = "AllOf",
    AnyOf = "AnyOf",
    Ordered = "Ordered",
}

export const ReviewSourceMapper = {
  [ReviewSource.None]: "None",
  [ReviewSource.ReviewerRole]: "Reviewer role",
  [ReviewSource.Manager]: "Manager",
  [ReviewSource.SecurityGroup]: "Security group",
  [ReviewSource.AllOf]: "All of",
  [ReviewSource.AnyOf]: "Any of",
  [ReviewSource.Ordered]: "Ordered"
}

export class ADGroup {
  id: string | null
  displayName: string | null

  constructor () {
    this.id = null
    this.displayName = null
  }
}

export class Lifetime {
  duration: number
  lifetimeType: LifetimeType

  constructor () {
    this.duration = 6
    this.lifetimeType = LifetimeType.Months
  }
}

export class PolicyFilter {
  appliesTo: AppliesTo
  comparison: Comparison
  comparisonDisplay: string | null
  comparisonValue: string | null

  constructor () {
    this.appliesTo = AppliesTo.Everyone
    this.comparison = Comparison.Equal
    this.comparisonDisplay = null
    this.comparisonValue = null
  }
}

export class ReviewEntity {
  id: string | null
  displayName: string | null

  constructor () {
    this.id = null
    this.displayName = null
  }
}

export class ReviewRequirement {
  reviewSource: ReviewSource
  reviewEntity: ReviewEntity | null
  minimumApprovals: number
  reviewers: SimpleUser[]

  constructor () {
    this.reviewSource = ReviewSource.None
    this.reviewEntity = null
    this.minimumApprovals = 1
    this.reviewers = []
  }
}

export class ReviewCollection {
  reviewRequirements: ReviewRequirement[]
  evaluation: Evaluation

  constructor () {
    this.reviewRequirements = []
    this.evaluation = Evaluation.Or
  }
}

export class NotificationSettings {
  reminderEmailInterval: number
  expirationWarningFirstEmail: number
  expirationWarningSecondEmail: number
  expirationWarningThirdEmail: number

  constructor () {
    this.reminderEmailInterval = 2
    this.expirationWarningFirstEmail = 14
    this.expirationWarningSecondEmail = 7
    this.expirationWarningThirdEmail = 3
  }
}

export class RequiredReviews {
  creationReviews: ReviewCollection
  extensionReviews: ReviewCollection
  modificationReviews: ReviewCollection
  transferReviews: ReviewCollection

  constructor () {
    this.creationReviews = new ReviewCollection()
    this.extensionReviews = new ReviewCollection()
    this.modificationReviews = new ReviewCollection()
    this.transferReviews = new ReviewCollection()
  }
}

export class PolicyDetail {
  id: string | null
  name: string | null
  deleteAllowed: boolean
  isActive: boolean
  unlimitedResourceLifetime: boolean
  resourceLifetime: Lifetime | null
  maximumReviewLength: Lifetime
  filters: PolicyFilter[]
  evaluation: Evaluation
  requiredReviews: RequiredReviews
  useDefaultNotificationSettings: boolean
  notificationSettings: NotificationSettings | null

  constructor () {
    this.id = null
    this.name = null
    this.deleteAllowed = true
    this.isActive = false
    this.unlimitedResourceLifetime = true
    this.resourceLifetime = null

    const lifetime:Lifetime = new Lifetime()
    lifetime.duration = 2
    lifetime.lifetimeType = LifetimeType.Weeks
    this.maximumReviewLength = lifetime

    this.filters = []
    this.evaluation = Evaluation.Or
    this.requiredReviews = new RequiredReviews()
    this.useDefaultNotificationSettings = true
    this.notificationSettings = null
  }
}

export class LifetimeUpdate {
  unlimitedResourceLifetime: boolean
  resourceLifetime: Lifetime | null

  constructor () {
    this.unlimitedResourceLifetime = true
    this.resourceLifetime = null
  }
}
