import axios from "axios"

const API_URL = import.meta.env.VITE_CONCIERGE_API_ENDPOINT

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
})

export default instance
