export class NameValuePair {
  name: string
  value: number

  constructor () {
    this.name = ""
    this.value = 0
  }
}

export class Dashboard {
  chargesThisMonth: string
  currentUserScore: number
  totalRequestCount: number
  expiringRequestCount: number
  expiringRequests: Array<any>
  monthlyCostEstimate: string
  requestedResources: NameValuePair[]
  scorePosition: number
  scoreRelativePosition: string
  waitingReviewCount: number
  waitingReviews: Array<any>

  constructor () {
    this.chargesThisMonth = "$0.00"
    this.currentUserScore = 0
    this.totalRequestCount = 0
    this.expiringRequestCount = 0
    this.expiringRequests = []
    this.monthlyCostEstimate = "$0.00"
    this.requestedResources = []
    this.scorePosition = 0
    this.scoreRelativePosition = "top 100%"
    this.waitingReviewCount = 0
    this.waitingReviews = []
  }
}
