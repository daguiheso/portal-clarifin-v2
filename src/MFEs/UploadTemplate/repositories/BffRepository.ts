import BffClient from "@/commons/repositories/clients/BffClient"
import { getClientId, objectToQueryParams } from "@/commons/utils"

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
  }) {
    const formData = new FormData()

    formData.append("file", data.file)
    formData.append("idClient", String(getClientId()))
    formData.append("idBusiness", String(data.companyId))
    formData.append("idFormat", String(data.idFormat))
    formData.append("dateImport", data.dateImport)
    formData.append("ignorePreviousBalance", String(data.ignorePreviousBalance))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFileResponse = await BffClient.post(`${v1BaseUrl}/puc/upload`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })


    return { response: uploadFileResponse }
  },

  async getAccounting ({ companyId, params }: { companyId: string, params: any }) {

    const result = await BffClient.get(`${v1BaseUrl}/client/${getClientId()}/business/${companyId}/accounting${objectToQueryParams(params)}`)

    return result.data.accounting.filter((item: any) => item.transactional === "S")
  },

  async deletePUC ({ companyId, dateImport }: { companyId: string, dateImport: string }) {
    const formData = new FormData()

    formData.append("idClient", String(getClientId()))
    formData.append("idBusiness", String(companyId))
    formData.append("dateImport", dateImport)

    const result = await BffClient.delete(`${v1BaseUrl}/puc`, {
      data: formData
    })

    return result
  }

}
