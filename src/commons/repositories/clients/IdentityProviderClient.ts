import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosRequestConfig } from "axios"
import { getIdentityProviderUrlBase } from "@/commons/utils"
import { useSession } from "@/hooks/useSession"

const baseURL = getIdentityProviderUrlBase()
const { logout } = useSession()


const IdentityProviderClient = axios.create({
  baseURL
})

const injectToken = (config: AxiosRequestConfig) => {
  try {
    const newConfig = config
    const idSession = window.localStorage.getItem("idSession") || ""

    if (newConfig.headers) newConfig.headers.token = idSession

    return newConfig as InternalAxiosRequestConfig<any>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Unauthorized")
  }
}

const handleError = async (error: AxiosError) => {
  const {
    config,
    response
  } = error

  if (config && response?.status) {
    if (!config?.headers?.token || response.status === 500) {
      window.location.href = `${baseURL}/auth`
    } else {
      logout()
    }
  }

  return Promise.reject(error)
}

IdentityProviderClient.interceptors.response.use(undefined, handleError)
IdentityProviderClient.interceptors.request.use(injectToken)

export default IdentityProviderClient
