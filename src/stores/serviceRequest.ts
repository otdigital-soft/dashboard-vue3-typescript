import { useAppStore } from "./app"
import { useToast } from "vue-toastification"
import { DateTime } from "luxon"
import { defineStore } from "pinia"
import { findIndex, path } from "ramda"
import serviceRequestApi from "@/apiResources/serviceRequestApi"
import { DeployedServiceRequest, DeployedResource } from "@/models/serviceRequests/deployedServiceRequest"
import type { ServiceRequestSummary } from "@/models/serviceRequests/serviceRequestSummary"
import type { PendingState, ServiceRequestDetail, Status } from "@/models/serviceRequests/serviceRequestDetail"
import { useUserStore } from "./user"
import { SimpleUser } from "@/models/simpleUser"
import type { LifetimeUpdate } from "@/models/policies/policyDetail"

export const useServiceStore = defineStore("serviceRequest", {
  state: () => ({
    serviceRequest: (new DeployedServiceRequest()) as DeployedServiceRequest,
    serviceRequests: [] as Array<ServiceRequestSummary>
  }),

  actions: {
    async fetchServiceRequestById (id: string) {
      const toast = useToast()
      const { setLoading } = useAppStore()

      setLoading(true)
      try {
        const { data } = await serviceRequestApi.get(id)

        this.serviceRequest = data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      } finally {
        setLoading(false)
      }
    },

    async fetchServiceRequests () {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.list()

        this.serviceRequests = data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async fetchAwaitingDeployment () {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.awaitingDeployment()

        this.serviceRequests = data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async fetchExpiringSoon (days: number) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.expiringSoon(days)

        this.serviceRequests = data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async fetchReadyToRemove () {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.readyToRemove()

        this.serviceRequests = data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async createServiceRequest (request: ServiceRequestDetail) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.create(request)
        this.serviceRequest = data
        toast.success("Service request created")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async extendServiceRequest (id:string, request: LifetimeUpdate) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.extend(id, request)
        this.serviceRequest = data
        toast.success("Service request updated")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async updateServiceRequest (id:string, request: DeployedServiceRequest) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.update(id, request)
        this.serviceRequest = data
        toast.success("Service request updated")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async addResourceRequest (id: string, request: DeployedResource) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.addDeployedResource(id, request)
        this.serviceRequest = data
        toast.success("Deployed Resource added")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async cancelServiceRequestReview (id:string) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.cancelReview(id)
        this.serviceRequest = data
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async removeResourceRequest (serviceRequestId: string, deployedResourceId: string) {
      const toast = useToast()
      try {
        await serviceRequestApi.removeDeployedResource(serviceRequestId, deployedResourceId)

        const idx = findIndex(r => r.id === deployedResourceId, this.serviceRequest.deployedResources)
        if (idx > -1) {
          this.serviceRequest.deployedResources.splice(idx, 1)
        }
        toast.success("Deployed Resource removed")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },
    async recordResourceRemoved (serviceRequestId: string, deployedResourceId: string) {
      const toast = useToast()
      const userInfo = useUserStore()
      try {
        await serviceRequestApi.recordResourceRemoved(serviceRequestId, deployedResourceId)

        if (this.serviceRequest.id === serviceRequestId) {
          const idx = findIndex(r => r.id === deployedResourceId, this.serviceRequest.deployedResources)
          if (idx > -1) {
            this.serviceRequest.deployedResources[idx].removedDateUtc = DateTime.utc().toISO()

            if (userInfo.userInfo) {
              const simpleUser: SimpleUser = new SimpleUser()
              simpleUser.id = userInfo.userInfo.id
              simpleUser.email = userInfo.userInfo.email
              this.serviceRequest.deployedResources[idx].removedBy = simpleUser
            }
          }
        }
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async changeStatus (id:string, status: Status, pendingState: PendingState | null) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.changeStatus(id, status, pendingState)
        this.serviceRequest = data
        const idx = findIndex(u => u.id === id, this.serviceRequests)
        if (idx > -1) {
          this.serviceRequests[idx].status = status
          if (pendingState !== null) {
            this.serviceRequests[idx].pendingState = pendingState
          }
        }
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async deleteServiceRequest (id:string) {
      const toast = useToast()
      try {
        await serviceRequestApi.delete(id)

        // find the index in serviceRequests array, and then remove that serviceRequest:
        const idx = findIndex(u => u.id === id, this.serviceRequests)
        if (idx > -1) {
          this.serviceRequests.splice(idx, 1)
        }

        toast.success("Service request deleted")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    },

    async modifyServiceRequest (id:string, request: DeployedServiceRequest) {
      const toast = useToast()
      try {
        const { data } = await serviceRequestApi.modify(id, request)
        this.serviceRequest = data
        toast.success("Sent modify request")
      } catch (error) {
        toast.error(path(["response", "data", "errors", 0, "message"], error) as string)
      }
    }
  },

  getters: {
    serviceRequestList: (state) => state.serviceRequests,
    currentServiceRequest: (state) => state.serviceRequest

  }
})
