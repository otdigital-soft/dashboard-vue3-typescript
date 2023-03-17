import { mergeAll, values } from "ramda"
import { ResourceType, OperationType } from "./policies/policyDetail"
import { LocationType } from "./accountDetail"

export const filtersMapper = {
  users: {
    Title: {
      name: "Title"
    },
    Department: {
      name: "Department"
    },
    OfficeLocation: {
      name: "Office location"
    },
    City: {
      name: "City"
    },
    State: {
      name: "State"
    },
    Country: {
      name: "Country"
    },
    PostalCode: {
      name: "Postal code"
    },
    UsageLocation: {
      name: "Usage location"
    },
    GroupMembership: {
      name: "Group member"
    }
  },
  serviceRequest: {
    ResourceType: {
      name: "Resource",
      options: values(ResourceType)
    },
    OperationType: {
      name: "Operation",
      options: values(OperationType)
    },
    Location: {
      name: "Location",
      options: values(LocationType)
    }
  },
  reportsServiceRequest: {
    Title: {
      name: "Title"
    },
    Email: {
      name: "Email"
    },
    Department: {
      name: "Department"
    },
    OfficeLocation: {
      name: "Office location"
    },
    City: {
      name: "City"
    },
    State: {
      name: "State"
    },
    Country: {
      name: "Country"
    },
    PostalCode: {
      name: "Postal code"
    },
    UsageLocation: {
      name: "Usage location"
    },
    Policy: {
      name: "Policy"
    },
    Status: {
      name: "Status"
    },
    PendingState: {
      name: "Pending State"
    }
  },
  reportsDeployedResource: {
    Title: {
      name: "Title"
    },
    Email: {
      name: "Email"
    },
    Department: {
      name: "Department"
    },
    OfficeLocation: {
      name: "Office location"
    },
    City: {
      name: "City"
    },
    State: {
      name: "State"
    },
    Country: {
      name: "Country"
    },
    PostalCode: {
      name: "Postal code"
    },
    UsageLocation: {
      name: "Usage location"
    },
    Policy: {
      name: "Policy"
    },
    Status: {
      name: "Status"
    },
    PendingState: {
      name: "Pending State"
    }
  },
  reportsCharge: {
    Title: {
      name: "Title"
    },
    Email: {
      name: "Email"
    },
    Amount: {
      name: "Amount"
    },
    Department: {
      name: "Department"
    },
    OfficeLocation: {
      name: "Office location"
    },
    City: {
      name: "City"
    },
    State: {
      name: "State"
    },
    Country: {
      name: "Country"
    },
    PostalCode: {
      name: "Postal code"
    },
    UsageLocation: {
      name: "Usage location"
    },
    Policy: {
      name: "Policy"
    },
    Status: {
      name: "Status"
    },
    PendingState: {
      name: "Pending State"
    }
  }
}

export const flatFiltersMapper = mergeAll(values(filtersMapper))
