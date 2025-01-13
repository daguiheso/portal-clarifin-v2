import IdentityProviderClient from "./clients/IdentityProviderClient"

export default {
  // TODO: Add profileMe interface
  async getProfileMe (): Promise<any> {

    const result = await IdentityProviderClient.get("/profile/me")

    const {
      access_token,
    } = result.data

    window.localStorage.setItem("tokenSession", access_token)

    return result.data
  },

  logout () {
    return IdentityProviderClient.post("/logout")
  }
}
