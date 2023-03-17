import type { LoginResponse } from "../models/loginResponse"

import axios, { type AxiosResponse } from "axios"

export class ConciergeService {
  loginPassword = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    const userCredentials: any = {
      email,
      password
    }

    const response = await axios
      .post<LoginResponse>(
        `${this.baseUrl}/api/account/log-in`,
        userCredentials
      )
      .then((resp: AxiosResponse<LoginResponse, any>) => {
        return resp.data
      })

    return response
  }

  loginAzure = async (authToken: string): Promise<LoginResponse> => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }

    const response = await axios
      .get<LoginResponse>(
        `${this.baseUrl}/api/account/log-in-with-azure`,
        config
      )
      .then((resp: AxiosResponse<LoginResponse, any>) => {
        return resp.data
      })

    return response
  }

  baseUrl: string

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }
}
