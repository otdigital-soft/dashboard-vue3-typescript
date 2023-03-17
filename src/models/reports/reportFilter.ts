import type { LocationQueryValue } from "vue-router"
import { ReportComparison } from "../policies/policyDetail"

export class ReportFilter {
  field: string | null
  comparison: ReportComparison | null
  value: string | null

  constructor () {
    this.field = null
    this.comparison = ReportComparison.Equal
    this.value = null
  }

  toString (): string {
    return `${this.field} -${this.comparison} '${this.value}'`
  }

  static parse (filter: string | LocationQueryValue): ReportFilter {
    const reportFilter:ReportFilter = new ReportFilter()
    if (filter === null) return reportFilter

    if (filter.indexOf("'") > -1) {
      const startIndex: number = filter.indexOf("'")
      const endIndex: number = filter.lastIndexOf("'")
      reportFilter.value = filter.substring(startIndex + 1, endIndex).trim()
      filter = filter.slice(0, startIndex).trim()
      const parts: string[] = filter.split(" ")
      reportFilter.field = parts[0]
      reportFilter.comparison = this.getComparison(parts[1].trim())
    } else {
      const parts:string[] = filter.split(" ")
      if (parts.length === 3) {
        reportFilter.field = parts[0]
        reportFilter.comparison = this.getComparison(parts[1].trim())
        reportFilter.value = parts[2].trim()
      }
    }

    return reportFilter
  }

  static getComparison (val: string): ReportComparison {
    if (val.indexOf("-") > -1) {
      val = val.replace("-", "")
    }
    switch (val.toLowerCase()) {
      case "equal":
        return ReportComparison.Equal
      case "notequal":
        return ReportComparison.NotEqual
      case "greaterthan":
        return ReportComparison.GreaterThan
      case "greaterthanorequal":
        return ReportComparison.GreaterThanOrEqual
      case "lessthan":
        return ReportComparison.LessThan
      case "lessthanorequal":
        return ReportComparison.LessThanOrEqual
      case "startswith":
        return ReportComparison.StartsWith
      case "endswith":
        return ReportComparison.EndsWith
      case "isnull":
        return ReportComparison.IsNull
      case "isnotnull":
        return ReportComparison.IsNotNull
      default:
        throw new Error(`No comparison defined for ${val}`)
    }
  }
}
