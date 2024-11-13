import BffClient from "@/commons/repositories/clients/BffClient"
import { objectToQueryParams } from "@/commons/utils"

const v1BaseUrl = "/v1/entity"

export default {

  getClients () {
    return BffClient.get(`${v1BaseUrl}/client`)
  },

  getBusiness (clientId: string) {
    return BffClient.get(`${v1BaseUrl}/client/${clientId}/business`)
  },

  getFormats () {
    return BffClient.get(`${v1BaseUrl}/format-file`)
  },

  async uploadFile (data: {
    idClient: number,
    idBusiness: number,
    idFormat: number,
    dateImport: string,
    file: Blob
  }) {
    const formData = new FormData()

    formData.append("file", data.file)
    formData.append("idClient", String(data.idClient))
    formData.append("idBusiness", String(data.idBusiness))
    formData.append("idFormat", String(data.idFormat))
    formData.append("dateImport", data.dateImport)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFileResponse = await BffClient.post(`${v1BaseUrl}/puc/upload`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })


    return { response: uploadFileResponse }
  },

  async getAccounting ({ clientId, businessId, params }: { clientId: string, businessId: string, params: any }) {

    const result = await BffClient.get(`${v1BaseUrl}/client/${clientId}/business/${businessId}/accounting${objectToQueryParams(params)}`)

    return result.data.accounting.filter((item: any) => item.transactional === "S")
  },

  async deletePUC ({ clientId, businessId, dateImport }: { clientId: string, businessId: string, dateImport: string }) {
    const formData = new FormData()

    formData.append("idClient", String(clientId))
    formData.append("idBusiness", String(businessId))
    formData.append("dateImport", dateImport)

    const result = await BffClient.delete(`${v1BaseUrl}/puc`, {
      data: formData
    })

    return result
  }

}
