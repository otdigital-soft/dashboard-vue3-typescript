import api from "./api"

class DashboardApi {
  getDashboardInfo () {
    return api.get("/api/dashboard")
  }
}

export default new DashboardApi()
