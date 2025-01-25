import { computed } from "vue"
import useContainerStore from "@/container/store" // Ruta del store
import { getIdentityProviderUrlBase, handleError } from "@/commons/utils"
import IdentityProviderClient from "@/commons/repositories/clients/IdentityProviderClient"
import { jwtDecode } from "jwt-decode"
import { AxiosResponse } from "axios"

interface DecodedAccessToken {
  "client-id": string;
  [key: string]: any;
}

interface ProfileMeResp {
  sub: string
  workplacebanks: any[]
  preferred_username: string
  exp_session: number
  access_token: string
  auth_time: number
  name: string
  exp: number
  iat: number
  email: string
}

export interface ProfileMe extends ProfileMeResp, DecodedAccessToken {}

const baseURL = getIdentityProviderUrlBase()

export function useSession () {
  const store = useContainerStore()

  const getProfileMe = async () => {
    store.profileMe.isLoading = true

    try {
      const response: AxiosResponse<ProfileMeResp> = await IdentityProviderClient.get("/profile/me")

      const {
        access_token,
      } = response.data

      const decodedAccessToken = jwtDecode<DecodedAccessToken>(access_token)

      const clientId = decodedAccessToken?.["client-id"]

      window.localStorage.setItem("tokenSession", access_token)
      window.localStorage.setItem("clientId", clientId)

      const result = {
        ...response.data,
        "client-id": clientId
      }

      store.profileMe.data = result

      return result
    } catch (error: unknown) {
      store.profileMe.error = error

      handleError(error)
    } finally {
      store.profileMe.isLoading = false
    }
  }

  const profileMe = computed(() => ({
    data: store.profileMe.data,
    isLoading: store.profileMe.isLoading,
    error: store.profileMe.error
  }))

  const logout = async () => {


    try {
      await IdentityProviderClient.post("/logout")
      window.localStorage.clear()
      window.location.href = `${baseURL}/auth`
    } catch (error) {
      console.log("error Logout", error)
      window.localStorage.clear()
      window.location.href = `${baseURL}/auth`
      throw new Error("More than one failure")
    }

  }

  const checkToken = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const idSession = urlParams.get("token") || window.localStorage.getItem("idSession") || ""
      const realm = urlParams.get("id")

      localStorage.setItem("idSession", `${idSession}`)
      localStorage.setItem("realm", `${realm}`)

      if (idSession) return getProfileMe()

      window.location.href = `${baseURL}/auth`

      return null
    } catch {
      window.location.href = `${baseURL}/auth`

      return null
    }
  }

  return {
    getProfileMe,
    profileMe,
    checkToken,
    logout
  }
}
