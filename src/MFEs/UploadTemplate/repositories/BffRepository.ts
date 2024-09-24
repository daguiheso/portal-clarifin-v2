import BffClient from "@/commons/repositories/clients/BffClient"

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
  }
}
