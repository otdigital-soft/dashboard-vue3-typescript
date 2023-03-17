import type { MyReport } from "@/models/reports/myReport"
import type { AxiosResponse } from "axios"
import api from "./api"

class ReportApi {
  getServiceRequests (top: number | null, groupBy: string | null, orderBy: string | null, orderByDesc: string | null,
    filter: string[] | null, columns: string | null) {
    const baseUrl = "api/reports/service-requests"
    const params = this.getParameters(top, groupBy, orderBy, orderByDesc, filter, columns, null)

    if (params.toString() !== "") {
      return api.get(`${baseUrl}?${params.toString()}`)
    } else {
      return api.get(baseUrl)
    }
  }

  getServiceRequestFile (top: number | null, groupBy: string | null, orderBy: string | null, orderByDesc: string | null,
    filter: string[] | null, columns: string | null, fileFormat: string) {
    const baseUrl = "api/reports/service-requests"
    const params = this.getParameters(top, groupBy, orderBy, orderByDesc, filter, columns, fileFormat)

    if (params.toString() !== "") {
      return api.get(`${baseUrl}?${params.toString()}`, { responseType: "blob" })
        .then((response) => {
          this.downloadFileData(response, "service-requests.csv")
        })
    } else {
      return api.get(baseUrl, { responseType: "blob" })
        .then((response) => {
          this.downloadFileData(response, "service-requests.csv")
        })
    }
  }

  private downloadFileData (response : AxiosResponse, fileName = "report.csv") {
    const href = URL.createObjectURL(response.data)

    const link = document.createElement("a")
    link.href = href
    link.setAttribute("download", fileName)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  getDeployedResources (top: number | null, groupBy: string | null, orderBy: string | null, orderByDesc: string | null,
    filter: string[] | null, columns: string | null) {
    const baseUrl = "api/reports/deployed-resources"
    const params = this.getParameters(top, groupBy, orderBy, orderByDesc, filter, columns, null)

    if (params.toString() !== "") {
      return api.get(`${baseUrl}?${params.toString()}`)
    } else {
      return api.get(baseUrl)
    }
  }

  getDeployedResourceFile (top: number | null, groupBy: string | null, orderBy: string | null, orderByDesc: string | null,
    filter: string[] | null, columns: string | null, fileFormat: string) {
    const baseUrl = "api/reports/deployed-resources"
    const params = this.getParameters(top, groupBy, orderBy, orderByDesc, filter, columns, fileFormat)

    if (params.toString() !== "") {
      return api.get(`${baseUrl}?${params.toString()}`, { responseType: "blob" })
        .then((response) => {
          this.downloadFileData(response, "deployed-resources.csv")
        })
    } else {
      return api.get(baseUrl, { responseType: "blob" })
        .then((response) => {
          this.downloadFileData(response, "deployed-resources.csv")
        })
    }
  }

  getResourceCharges (top: number | null, groupBy: string | null, aggregateBy: string | null, orderBy: string | null, orderByDesc: string | null,
    filter: string[] | null, columns: string | null) {
    const baseUrl = "api/reports/resource-charges"
    const params = this.getParameters(top, groupBy, orderBy, orderByDesc, filter, columns, null, aggregateBy)

    if (params.toString() !== "") {
      return api.get(`${baseUrl}?${params.toString().replace(/[^?&=]+=(?:&|$)|&[^?&=]+=(?=&|$)/g, "")}`)
    } else {
      return api.get(baseUrl)
    }
  }

  getResourceChargeFile (top: number | null, groupBy: string | null, aggregateBy: string | null, orderBy: string | null, orderByDesc: string | null,
    filter: string[] | null, columns: string | null, fileFormat: string) {
    const baseUrl = "api/reports/resource-charges"
    const params = this.getParameters(top, groupBy, orderBy, orderByDesc, filter, columns, fileFormat, aggregateBy)

    if (params.toString() !== "") {
      return api.get(`${baseUrl}?${params.toString().replace(/[^?&=]+=(?:&|$)|&[^?&=]+=(?=&|$)/g, "")}`, { responseType: "blob" })
        .then((response) => {
          this.downloadFileData(response, "resource-charges.csv")
        })
    } else {
      return api.get(baseUrl, { responseType: "blob" })
        .then((response) => {
          this.downloadFileData(response, "resource-charges.csv")
        })
    }
  }

  async getMyReport () {
    const response = await api.get("api/reports")
    return response
  }

  createReport ({ name, isPublic, groupBy, aggregateBy, orderBy, descending, columns, filters, reportType, top }: MyReport) {
    const payload : MyReport = {
      name,
      isPublic,
      groupBy,
      aggregateBy,
      orderBy,
      descending,
      columns,
      filters,
      reportType,
      top
    }
    return api.post("api/reports", payload)
  }

  deleteReport (id: string) {
    return api.delete(`api/reports/${id}`)
  }

  private getParameters (top: number | null, groupBy: string | null, orderBy: string | null, orderByDesc: string | null, filter: string[] | null, columns: string | null, fileFormat: string | null, aggregateBy?: string | null) {
    const params = new URLSearchParams()
    if (top !== null) {
      params.append("top", top.toString())
    }
    if (groupBy !== null) {
      params.append("groupBy", groupBy)
    }
    if (aggregateBy !== null && aggregateBy !== undefined) {
      params.append("aggregateBy", aggregateBy)
    }
    if (orderBy !== null) {
      params.append("orderBy", orderBy)
    }
    if (orderByDesc !== null) {
      params.append("orderByDesc", orderByDesc)
    }
    if (filter !== null) {
      for (let index = 0; index < filter.length; index++) {
        const f = filter[index]
        params.append("filter", f)
      }
    }
    if (columns !== null) {
      params.append("columns", columns)
    }

    if (fileFormat !== null) {
      params.append("fileFormat", fileFormat)
    }
    return params
  }
}

export default new ReportApi()
