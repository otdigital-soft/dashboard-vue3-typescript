class PolicySummary {
  id: string
  createdDateUtc: Date | null
  name: string | null
  isActive: boolean
  deleteAllowed: boolean

  constructor () {
    this.id = ""
    this.createdDateUtc = null
    this.name = null
    this.isActive = false
    this.deleteAllowed = true
  }
}

export { PolicySummary }
