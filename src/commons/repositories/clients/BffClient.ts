import { handleAxiosError } from "@/commons/utils/axiosHandleError"
import { baseInterceptor } from "@/commons/utils/axiosInterceptors"
import axios, { InternalAxiosRequestConfig } from "axios"

// const baseURL = "https://api.clarifin.co"
const baseURL = "https://apigw-v2.clarifin.co"

const BffClient = axios.create({
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

BffClient.interceptors.response.use(undefined, (error) => handleAxiosError(error, BffClient))
BffClient.interceptors.request.use(injectToken)

export default BffClient
