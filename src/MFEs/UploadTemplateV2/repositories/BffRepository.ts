import BffClient from "@/commons/repositories/clients/BffClient"
import { getClientId } from "@/commons/utils"
import { AxiosResponse } from "axios"
import { Process, ProcessStatus } from "../interfaces/response.interface"

const v1BaseUrl = "/v1/entity"

export default {

  getFormats () {
    return BffClient.get(`${v1BaseUrl}/format-file`)
  },

  async uploadFile (data: {
    companyId: number,
    idFormat: number,
    dateImport: string,
    file: Blob,
    ignorePreviousBalance: boolean
  }): Promise<AxiosResponse<ProcessStatus>> {
    const formData = new FormData()

    formData.append("file", data.file)
    // formData.append("idClient", String(getClientId()))
    formData.append("idCompany", String(data.companyId))
    formData.append("idFormat", String(data.idFormat))
    formData.append("dateImport", data.dateImport)
    formData.append("ignorePreviousBalance", String(data.ignorePreviousBalance))

    return BffClient.post(
      `${v1BaseUrl}/puc/client/${getClientId()}/upload/async`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

  },

  // async getAccounting ({ companyId, params }: { companyId: string, params: any }) {

  //   const result = await BffClient.get(`${v1BaseUrl}/client/${getClientId()}/business/${companyId}/accounting${objectToQueryParams(params)}`)

  //   return result.data.accounting.filter((item: any) => item.transactional === "S")
  // },

  async deletePUC ({ companyId, dateImport }: { companyId: string, dateImport: string }) {
    const formData = new FormData()

    // formData.append("idClient", String(getClientId()))
    formData.append("idBusiness", String(companyId))
    formData.append("dateImport", dateImport)

    const result = await BffClient.delete(`${v1BaseUrl}/puc/client/${getClientId()}`, {
      data: formData
    })

    return result
  },

  getProcessStatus (idProcess: string): Promise<AxiosResponse<ProcessStatus>> {
    return BffClient.get(`${v1BaseUrl}/puc/client/${getClientId()}/upload/status/${idProcess}`)
  },

  getProcessByCompanyId (companyId: string): Promise<AxiosResponse<Process[]>> {
    return BffClient.get(`${v1BaseUrl}/client/${getClientId()}/accounting/process?id_company=${companyId}`)
  }

}
