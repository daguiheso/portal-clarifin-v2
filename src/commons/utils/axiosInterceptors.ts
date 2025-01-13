
import { InternalAxiosRequestConfig } from "axios"

export const baseInterceptor = (config: InternalAxiosRequestConfig) => {
  try {
    const newConfig = { ...config }
    const accessToken = window.localStorage.getItem("tokenSession")

    if (newConfig.headers) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`
    }

    return newConfig
  } catch (error: unknown) {
    throw new Error("Unauthorized")
  }
}