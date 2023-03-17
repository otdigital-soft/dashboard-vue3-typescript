import api from "./api"

class LookupApi {
  getCultures () {
    return api.get("/api/lookup/cultures")
  }

  getADGroups (searchPhase: string) {
    return api.get(`/api/lookup/groups/${searchPhase}`)
  }
}

export default new LookupApi()
