import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosRequestConfig } from "axios"
import IdentityProviderRepository from "../IdentityProviderRepository"
import { getIdentityProviderUrlBase } from "@/commons/utils"

const baseURL = getIdentityProviderUrlBase()

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
    response: { status }
  } = error

  debugger
  if (config && status) {
    if (!config?.headers?.token || status === 500) {
      debugger
      window.location.href = `${baseURL}/auth`
    } else {
      try {
        await IdentityProviderRepository.logout()
        window.localStorage.clear()
        window.location.href = `${baseURL}/auth`
      } catch (errorTemp) {
        console.log("error Logout", errorTemp)
        window.localStorage.clear()
        window.location.href = `${baseURL}/auth`
        throw new Error("More than one failure")
      }
    }
  }

  return Promise.reject(error)
}

IdentityProviderClient.interceptors.response.use(undefined, handleError)
IdentityProviderClient.interceptors.request.use(injectToken)

export default IdentityProviderClient
