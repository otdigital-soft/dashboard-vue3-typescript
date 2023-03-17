import { defineStore } from "pinia"

export const useMsalConfigStore = defineStore("msalConfig", {
  state: () => {
    return {
      msalConfig: {
        auth: {
          clientId: "ad19cc1f-6477-4be9-a254-ca28014fcb93",
          authority: "https://login.microsoftonline.com/organizations"
        },
        cache: {
          cacheLocation: "sessionStorage"
        }
      },
      accessToken: ""
    }
  },
  actions: {
    setAccessToken (token: string) {
      this.accessToken = token
    }
  }
})
