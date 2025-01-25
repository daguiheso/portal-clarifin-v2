import BffClient from "@/commons/repositories/clients/BffClient"
import { getClientId } from "../utils"

const v1BaseUrl = "/v1/entity"

export default {

  getClients () {
    return BffClient.get(`${v1BaseUrl}/client`)
  },

  getCompanies () {
    return BffClient.get(`${v1BaseUrl}/client/${getClientId()}/company`)
  }

}
