import axios, { InternalAxiosRequestConfig } from "axios"

import { baseInterceptor } from "../../utils/axiosInterceptors"
import { handleAxiosError } from "../../utils/axiosHandleError"

const baseURL = "https://api.clarifin.co"

const ProxyClient = axios.create({
  baseURL
})

const injectToken = (config: InternalAxiosRequestConfig) => {
  try {
    return baseInterceptor(config)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error)
  }
}

ProxyClient.interceptors.response.use(undefined ,(error) => handleAxiosError(error, ProxyClient))
ProxyClient.interceptors.request.use(injectToken)



export default ProxyClient
