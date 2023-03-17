import type { ReportFilter } from "@/models/reports/reportFilter"
export class MyReport {
  name: string
  isPublic: boolean
  aggregateBy: string | null
  groupBy: string | null
  orderBy: string | null
  descending: boolean
  columns: Array<any>
  filters: ReportFilter[]
  reportType: string
  top: number | null
  constructor () {
    this.name = ""
    this.isPublic = false
    this.aggregateBy = null
    this.groupBy = null
    this.orderBy = null
    this.descending = false
    this.columns = []
    this.filters = []
    this.reportType = ""
    this.top = 20
  }
}
