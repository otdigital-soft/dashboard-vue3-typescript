import type { Status } from "@/models/serviceRequests/serviceRequestDetail"

export class DisplayText {
  static getStatusDisplayText = (status: Status | string) => {
    switch (status) {
      case "Draft":
        return "Draft"
      case "Submitted":
        return "Submitted"
      case "ReturnedForQuestions":
        return "Returned for questions"
      case "WaitingForApprovals":
        return "Waiting for reviews"
      case "ApprovalsComplete":
        return "Approvals complete"
      case "DeploymentInProgress":
        return "Deployment in progress"
      case "DeploymentComplete":
        return "Deployment complete"
      case "ReadyToRemove":
        return "Ready to remove"
      default:
        return status
    }
  }

  static getTypeDisplayText = (type: string) => {
    switch (type) {
      case "ResourceType":
        return "Resource"
      case "OperationType":
        return "Operation"
      case "OfficeLocation":
        return "Office location"
      case "PostalCode":
        return "Postal code"
      case "UsageLocation":
        return "Usage location"
      case "GroupMembership":
        return "Group membership"
      default:
        return type
    }
  }

  static getComparisonDisplayText = (type: string | undefined | null) => {
    if (type === undefined || type === null) {
      return ""
    }
    switch (type) {
      case "Equal":
        return "Equals"
      case "NotEqual":
        return "Not equals"
      case "GreaterThan":
        return "Greater than"
      case "GreaterThanOrEqual":
        return "Greater than or equal"
      case "LessThan":
        return "Less than"
      case "LessThanOrEqual":
        return "Less than or equal"
      case "StartsWith":
        return "Starts with"
      case "EndsWith":
        return "Ends with"
      case "IsNull":
        return "Is null"
      case "IsNotNull":
        return "is not null"
      default:
        return type
    }
  }
}
