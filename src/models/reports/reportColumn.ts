export const ServiceRequestGroupbyColumns = [
  {
    value: "title",
    label: "Title"
  },
  {
    value: "email",
    label: "Email"
  },
  {
    value: "department",
    label: "Department"
  },
  {
    value: "city",
    label: "City"
  },
  {
    value: "state",
    label: "State"
  },
  {
    value: "country",
    label: "Country"
  },
  {
    value: "officeLocation",
    label: "Office location"
  },
  {
    value: "postalCode",
    label: "Postal code"
  },
  {
    value: "usageLocation",
    label: "Usage location"
  },
  {
    value: "policy",
    label: "Policy"
  },
  {
    value: "status",
    label: "Status"
  },
  {
    value: "pendingState",
    label: "Pending state"
  }
]
export const DeployedResourceGroupbyColumns = [
  {
    value: "title",
    label: "Title"
  },
  {
    value: "email",
    label: "Email"
  },
  {
    value: "department",
    label: "Department"
  },
  {
    value: "city",
    label: "City"
  },
  {
    value: "state",
    label: "State"
  },
  {
    value: "country",
    label: "Country"
  },
  {
    value: "officeLocation",
    label: "Office location"
  },
  {
    value: "postalCode",
    label: "Postal code"
  },
  {
    value: "usageLocation",
    label: "Usage location"
  },
  {
    value: "policy",
    label: "Policy"
  },
  {
    value: "status",
    label: "Status"
  },
  {
    value: "pendingState",
    label: "Pending state"
  },
  {
    value: "deployedBy",
    label: "Deployed by"
  },
  {
    value: "removedBy",
    label: "Removed by"
  },
  {
    value: "location",
    label: "Resource location"
  },
  {
    value: "regionOrZone",
    label: "Resource region or zone"
  },
  {
    value: "resourceGroup",
    label: "Resource resource group"
  },
  {
    value: "resourceType",
    label: "Resource type"
  },
  {
    value: "subscription",
    label: "Resource subscription"
  }
]
export const ResourceChargeGroupbyColumns = [
  {
    value: "title",
    label: "Title"
  },
  {
    value: "email",
    label: "Email"
  },
  {
    value: "department",
    label: "Department"
  },
  {
    value: "city",
    label: "City"
  },
  {
    value: "state",
    label: "State"
  },
  {
    value: "country",
    label: "Country"
  },
  {
    value: "officeLocation",
    label: "Office location"
  },
  {
    value: "postalCode",
    label: "Postal code"
  },
  {
    value: "usageLocation",
    label: "Usage location"
  },
  {
    value: "location",
    label: "Resource location"
  },
  {
    value: "regionOrZone",
    label: "Resource region or zone"
  },
  {
    value: "resourceGroup",
    label: "Resource resource group"
  },
  {
    value: "resourceType",
    label: "Resource type"
  },
  {
    value: "subscription",
    label: "Resource subscription"
  }
]

export class ReportColumn {
  value: string
  name: string
  checked: boolean
  key?: string | null
  constructor () {
    this.value = ""
    this.name = ""
    this.checked = false
  }
}
