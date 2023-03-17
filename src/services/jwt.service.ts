import type { LoginResponse } from "@/models/loginResponse"

const ID_TOKEN_KEY = "access_token"
const AUTH_USER = "user"

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY)
}

export const setToken = (token: string) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

export const getAuthUser = () => {
  const user = window.localStorage.getItem(AUTH_USER)
  return user ? JSON.parse(user) : null
}

export const setAuthUser = (user: LoginResponse) => {
  window.localStorage.setItem(AUTH_USER, JSON.stringify(user))
}

export const destroyAuthUser = () => {
  window.localStorage.removeItem(AUTH_USER)
}

export const setKey = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const getKey = (key: string) => {
  return window.localStorage.getItem(key)
}

export const destroyKey = (key: string) => {
  return window.localStorage.removeItem(key)
}

export const clear = () => {
  window.localStorage.clear()
}

export default {
  getToken,
  setToken,
  destroyToken,
  setAuthUser,
  getAuthUser,
  destroyAuthUser,
  getKey,
  setKey,
  destroyKey
}
