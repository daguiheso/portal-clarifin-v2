import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { useSession } from "@/hooks/useSession"

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
  const { getProfileMe } = useSession()

  if ((isUnauthorized || isForbidden || error.code === "ERR_NETWORK") && shouldRetry) {
    if (config) config.retry = true

    try {
      refreshingToken = refreshingToken || getProfileMe()
      await refreshingToken

      refreshingToken = null

      return client(config!)
    } catch {
      throw new Error("More than one failure")
    }
  }

  return Promise.reject(error)
}