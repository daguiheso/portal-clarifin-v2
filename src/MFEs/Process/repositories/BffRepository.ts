import { AxiosResponse } from "axios"
import BffClient from "@/commons/repositories/clients/BffClient"
import { Process } from "../interfaces/response.interface"
import { getClientId } from "@/commons/utils"

const v1BaseUrl = "/v1/entity"

export default {

  getProcessByCompanyId (companyId: string): Promise<AxiosResponse<Process[]>> {
    return BffClient.get(`${v1BaseUrl}/client/${getClientId()}/accounting/process?id_company=${companyId}`)
  }
}
