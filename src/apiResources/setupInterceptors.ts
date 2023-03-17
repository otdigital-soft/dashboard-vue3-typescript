import axiosInstance from "./api"
import jwtService from "@/services/jwt.service"
import userApi from "./userApi"
import { useUserStore } from "@/stores/user"

const setup = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = jwtService.getToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config

      if (originalConfig.url !== "/sign-in" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const refreshToken = jwtService.getKey("refresh_token")
            if (refreshToken) {
              const { data } = await userApi.refreshToken(refreshToken)
              const { setUser } = useUserStore()
              setUser(data)
            }

            return axiosInstance(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default setup
