import BffClient from "@/commons/repositories/clients/BffClient"

const v1BaseUrl = "/v1/entity"

export default {

  getClients () {
    return BffClient.get(`${v1BaseUrl}/client`)
  },

  getBusiness (clientId: string) {
    return BffClient.get(`${v1BaseUrl}/client/${clientId}/business`)
  },

  getFormatsByClientId (clientId: number) {
    return BffClient.get(`${v1BaseUrl}/format-file/client/${clientId}`)
  },

  async uploadFile (data: {
    idClient: number,
    idBusiness: number,
    idFormat: number,
    dateImport: string,
    file: Blob
  }) {
    const formData = new FormData()

    // Agregar los campos al FormData
    formData.append("file", data.file)  // El archivo
    formData.append("idClient", String(data.idClient))  // Convertir a string si es necesario
    formData.append("idBusiness", String(data.idBusiness))  // Mantenerlo como string
    formData.append("idFormat", String(data.idFormat))  // Convertir a string
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
