import BffClient from "@/commons/repositories/clients/BffClient"

const v1BaseUrl = "/v1/entity"

export default {

  getClients () {
    return BffClient.get(`${v1BaseUrl}/client`)
  },

  getBusiness (clientId: string) {
    return BffClient.get(`${v1BaseUrl}/client/${clientId}/business`)
  },

}
