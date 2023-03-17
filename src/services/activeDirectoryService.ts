import type { AuthenticationResult, IPublicClientApplication, PopupRequest, SilentRequest } from "@azure/msal-browser"
import type { GraphMeResponse } from "@/models/graph/graphMeResponse"

import axios, { type AxiosResponse } from "axios"

export class ActiveDirectoryService {
  join = async (msal: IPublicClientApplication): Promise<AuthenticationResult> => {
    const request: PopupRequest = {
      scopes: [
        "User.Read",
        "api://79db9b07-d3c5-4d96-b4b1-2c7cdaa98a4c/Concierge.Query"
      ]
    }

    const authResult: AuthenticationResult = await msal.acquireTokenPopup(request)

    return authResult
  }

  signIn = async (msal: IPublicClientApplication): Promise<AuthenticationResult> => {
    const request: PopupRequest = {
      scopes: [
        "api://79db9b07-d3c5-4d96-b4b1-2c7cdaa98a4c/Concierge.Query"
      ]
    }

    const authResult: AuthenticationResult = await msal.acquireTokenPopup(request)

    return authResult
  }

  consent = async (msal: IPublicClientApplication): Promise<AuthenticationResult> => {
    const request: PopupRequest = {
      prompt: "select_account",
      scopes: [
        "https://graph.microsoft.com/.default"
      ]
    }

    const authResult: AuthenticationResult = await msal.acquireTokenPopup(request)

    return authResult
  }

  silentAcquireAccessToken = async (msal: IPublicClientApplication): Promise<string> => {
    const activeAccount = msal.getActiveAccount() // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
    const accounts = msal.getAllAccounts()

    if (!activeAccount && accounts.length === 0) {
      throw new Error("No account is logged in")
    }
    const request: SilentRequest = {
      scopes: ["User.Read"],
      account: activeAccount || accounts[0]
    }

    const authResult = await msal.acquireTokenSilent(request)

    return authResult.accessToken
  }

  acquireConciergeAccessToken = async (msal: IPublicClientApplication): Promise<string> => {
    const activeAccount = msal.getActiveAccount() // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
    const accounts = msal.getAllAccounts()

    if (!activeAccount && accounts.length === 0) {
      throw new Error("No account is logged in")
    }
    const request = {
      scopes: ["api://79db9b07-d3c5-4d96-b4b1-2c7cdaa98a4c/Concierge.Query"],
      account: activeAccount || accounts[0]
    }

    const authResult = await msal.acquireTokenSilent(request)

    return authResult.accessToken
  }

  callMeEndpoint = async (authToken: string): Promise<GraphMeResponse> => {
    const config: any = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
    const response = await axios.get<GraphMeResponse>(`${import.meta.env.VITE_GRAPH_ME_API_ENDPOINT}`, config)
      .then((resp: AxiosResponse<GraphMeResponse, any>) => {
        return resp.data
      })
    return response
  }
}
