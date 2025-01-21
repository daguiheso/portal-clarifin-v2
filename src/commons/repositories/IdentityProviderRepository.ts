import IdentityProviderClient from "./clients/IdentityProviderClient"
import { jwtDecode } from "jwt-decode"

interface DecodedAccessToken {
  "client-id": string;
  [key: string]: any;
}

export default {
  // TODO: Add profileMe interface
  async getProfileMe (): Promise<any> {

    const result = await IdentityProviderClient.get("/profile/me")
    const {
      access_token,
    } = result.data
    const decodedAccessToken = jwtDecode<DecodedAccessToken>(access_token)

    const clientId = decodedAccessToken?.["client-id"]

    window.localStorage.setItem("tokenSession", access_token)
    window.localStorage.setItem("clientId", clientId)

    return result.data
  },

  logout () {
    window.localStorage.clear()

    return IdentityProviderClient.post("/logout")
  }
}
