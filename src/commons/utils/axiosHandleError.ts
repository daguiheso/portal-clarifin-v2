import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"
import IdentityProviderRepository from "../repositories/IdentityProviderRepository"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean;
}

// TODO: Add profileMe interfaz
let refreshingToken: null | Promise<any> = null

export const handleAxiosError = async (error: AxiosError, client: AxiosInstance) => {

  const config: CustomAxiosRequestConfig | undefined = error.config
  const isUnauthorized = error.response?.status === 401
  const isForbidden = error.response?.status === 403
  const shouldRetry = !config?.retry

  if ((isUnauthorized || isForbidden || error.code === "ERR_NETWORK") && shouldRetry) {
    if (config) config.retry = true

    try {
      refreshingToken = refreshingToken || IdentityProviderRepository.getProfileMe()
      const result = await refreshingToken

      refreshingToken = null
      window.localStorage.setItem("tokenSession", result.access_token)

      return client(config!)
    } catch {
      throw new Error("More than one failure")
    }
  }

  return Promise.reject(error)
}