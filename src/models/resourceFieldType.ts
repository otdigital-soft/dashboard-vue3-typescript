import { values } from "ramda"
import { ResourceType } from "./policies/policyDetail"

export default {
  description: {
    type: "text",
    label: "Description",
    nullable: true,
    placeholder: "Describe this resource",
    placement: "common"
  },
  location: {
    type: "location",
    label: "Location",
    nullable: true,
    placeholder: "Location",
    placement: "common"
  },
  operationType: {
    type: "operation",
    label: "Operation",
    options: ["Add", "Modify", "Delete"],
    placeholder: "Operation",
    placement: "common"
  },
  resourceType: {
    type: "select",
    label: "Resource",
    options: values(ResourceType),
    placeholder: "Resource type",
    placement: "common"
  },
  otherConfiguration: {
    type: "textarea",
    label: "Other configuration",
    nullable: true,
    placeholder: "Additonal configuration notes",
    placement: "common"
  },
  memoryGb: {
    type: "number",
    label: "Memory (GB)",
    placeholder: "Memory (GB)",
    placement: "custom"
  },
  vcpus: {
    type: "number",
    label: "CPUs",
    nullable: true,
    placeholder: "CPUs",
    placement: "custom"
  },
  operatingSystem: {
    type: "text",
    label: "Operating system",
    nullable: true,
    placeholder: "Specify an operating system",
    placement: "custom"
  },
  virtual: {
    type: "boolean",
    label: "Virtual",
    placement: "custom"
  },
  databaseType: {
    type: "text",
    label: "Database type",
    nullable: true,
    placeholder: "Specify a database type",
    placement: "custom"
  },
  databaseVersion: {
    type: "text",
    label: "Version",
    nullable: true,
    placeholder: "Specify a database version",
    placement: "custom"
  },
  databaseName: {
    type: "text",
    label: "Database name",
    nullable: true,
    placeholder: "Provide a database name",
    placement: "custom"
  },
  databaseServer: {
    type: "text",
    label: "Database server",
    nullable: true,
    placeholder: "Specify a database server",
    placement: "custom"
  },
  maxSizeGb: {
    type: "number",
    label: "Maximum size",
    nullable: true,
    placeholder: "Max size (GB)",
    placement: "custom"
  },
  emailAddress: {
    type: "text",
    label: "Email address",
    nullable: true,
    placeholder: "Email address",
    placement: "custom"
  },
  groupName: {
    type: "text",
    label: "Group name",
    nullable: true,
    placeholder: "Group name",
    placement: "custom"
  },
  contactName: {
    type: "text",
    label: "Contact name",
    nullable: true,
    placeholder: "Contact name",
    placement: "custom"
  },
  otherAccount: {
    type: "text",
    label: "Other account",
    nullable: true,
    placeholder: "Other account",
    placement: "custom"
  },
  userAccount: {
    type: "text",
    label: "User account",
    nullable: true,
    placeholder: "User account",
    placement: "custom"
  },
  product: {
    type: "text",
    label: "Product",
    nullable: true,
    placeholder: "Product name",
    placement: "custom"
  },
  version: {
    type: "text",
    label: "Version",
    nullable: true,
    placeholder: "Product version",
    placement: "custom"
  },
  storageType: {
    type: "text",
    label: "Storage type",
    nullable: true,
    placeholder: "Storage type",
    placement: "custom"
  },
  storageVersion: {
    type: "text",
    label: "Version",
    nullable: true,
    placeholder: "Storage version",
    placement: "custom"
  },
  storageName: {
    type: "text",
    label: "Storage name",
    nullable: true,
    placeholder: "Storage name",
    placement: "custom"
  },
  storageServer: {
    type: "text",
    label: "Server",
    nullable: true,
    placeholder: "Storage server",
    placement: "custom"
  }
} as any

export const sortOrder = [
  "description",
  "location",
  "operationType",
  "resourceType",
  "otherConfiguration",
  "memoryGb",
  "vcpus",
  "operatingSystem",
  "virtual",
  "databaseType",
  "databaseVersion",
  "databaseName",
  "databaseServer",
  "maxSizeGb",
  "emailAddress",
  "groupName",
  "contactName",
  "otherAccount",
  "userAccount",
  "product",
  "version",
  "storageType",
  "storageVersion",
  "storageName",
  "storageServer"
]
