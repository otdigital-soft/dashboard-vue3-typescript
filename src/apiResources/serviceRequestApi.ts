import type { PendingState, ServiceRequestDetail, Status } from "@/models/serviceRequests/serviceRequestDetail"
import type { DeployedResource, DeployedServiceRequest } from "@/models/serviceRequests/deployedServiceRequest"
import api from "./api"
import type { LifetimeUpdate } from "@/models/policies/policyDetail"
import type { ServiceRequestSummary } from "@/models/serviceRequests/serviceRequestSummary"

class ServiceRequestApi {
  list () {
    return api.get<ServiceRequestSummary[]>("api/service-request")
  }

  awaitingDeployment () {
    return api.get<ServiceRequestSummary[]>("api/service-request/awaiting-deployment")
  }

  expiringSoon (days: number) {
    return api.get<ServiceRequestSummary[]>("api/service-request/expiring-soon", { params: { days } })
  }

  readyToRemove () {
    return api.get<ServiceRequestSummary[]>("api/service-request/ready-to-remove")
  }

  get (id: string) {
    return api.get<DeployedServiceRequest>(`api/service-request/${id}`)
  }

  update (id: string, request: DeployedServiceRequest) {
    return api.post<DeployedServiceRequest>(`api/service-request/${id}`, request)
  }

  extend (id: string, request: LifetimeUpdate) {
    return api.post<DeployedServiceRequest>(`api/service-request/extend/${id}`, request)
  }

  modify (id: string, request: DeployedServiceRequest) {
    return api.post<DeployedServiceRequest>(`api/service-request/modify/${id}`, request)
  }

  create (request: ServiceRequestDetail) {
    return api.post<DeployedServiceRequest>("api/service-request/", request)
  }

  review (id: string, approved: boolean, comment: string | null) {
    return api.post(`api/service-request/add-review/${id}`, { approved, comment })
  }

  cancelReview (id: string) {
    return api.post(`api/service-request/cancel-review/${id}`)
  }

  addDeployedResource (id: string, request: DeployedResource) {
    return api.post(`api/service-request/add-resource/${id}`, request)
  }

  removeDeployedResource (id: string, deployedResourceId: string) {
    return api.post(`api/service-request/remove-resource/${id}/${deployedResourceId}`)
  }

  recordResourceRemoved (id: string, deployedResourceId: string) {
    return api.post(`api/service-request/record-resource-removed/${id}/${deployedResourceId}`)
  }

  delete (id: string) {
    return api.delete(`api/service-request/${id}`)
  }

  changeStatus (id: string, status: Status, pendingState: PendingState | null) {
    const payload = { status }
    if (pendingState !== null) {
      Object.assign(payload, { pendingState })
    }
    return api.post(`api/service-request/change-status/${id}`, payload)
  }
}

export default new ServiceRequestApi()
