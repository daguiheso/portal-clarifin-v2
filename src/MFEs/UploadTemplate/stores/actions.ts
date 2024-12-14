import { handleError } from "@/commons/utils"
import repositoryFactory from "../repositories/RepositoryFactory"
import useUploadTemplateStore from "../stores"
import { claToast } from "@/commons/utils/toast"

const bffRepository = repositoryFactory.bffRepository

export default {
  async getClients () {
    const store = useUploadTemplateStore()

    store.clients.isLoading = true

    try {
      const result = await bffRepository.getClients()

      store.clients.data = result.data

    } catch (error: unknown) {
      store.clients.error = error

      handleError(error)
    } finally {
      store.clients.isLoading = false
    }
  },

  async getBusiness (clientId: string) {
    const store = useUploadTemplateStore()

    store.business.isLoading = true

    try {
      const result = await bffRepository.getBusiness(clientId)

      store.business.data = result.data

    } catch (error: unknown) {
      store.business.error = error

      handleError(error)
    } finally {
      store.business.isLoading = false
    }
  },

  async getFormats () {
    const store = useUploadTemplateStore()

    store.formats.isLoading = true

    try {
      const result = await bffRepository.getFormats()

      store.formats.data = result.data

    } catch (error: unknown) {
      store.formats.error = error

      handleError(error)
    } finally {
      store.formats.isLoading = false
    }
  },

  async uploadFile (data: {
    idClient: number,
    idBusiness: number,
    idFormat: number,
    dateImport: string,
    file: Blob,
    ignorePreviousBalance: boolean,
  }) {
    const store = useUploadTemplateStore()

    store.uploadFile.isLoading = true

    try {
      const result = await bffRepository.uploadFile(data)

      store.uploadFile.data = result.response.data
      store.uploadFile.error = null

      return true

    } catch (error: any) {
      if (!error?.response?.data?.errorDescription) {
        store.uploadFile.error = error
      } else {
        store.uploadFile.error = error.response.data
      }
      handleError(error)

      return false

    } finally {
      store.uploadFile.isLoading = false
    }
  },

  async getAccounting (data: { clientId: string, businessId: string, params: any }) {
    const store = useUploadTemplateStore()

    store.accounting.isLoading = true

    try {
      const result = await bffRepository.getAccounting(data)

      store.accounting.data = result

    } catch (error: unknown) {
      store.accounting.error = error

      handleError(error)
    } finally {
      store.accounting.isLoading = false
    }
  },

  async deletePUC (data: { clientId: string, businessId: string, dateImport: string }) {
    const store = useUploadTemplateStore()

    store.deletePUC.isLoading = true

    try {
      const result = await bffRepository.deletePUC(data)

      store.deletePUC.data = result

      claToast.successToast(
        "<strong class=' me-auto'>ClariFIN</strong>" +
        "<div class='toast-body'>PUC´s eliminados correctamente</div>",
      )

    } catch (error: unknown) {

      claToast.errorToast(
        "<strong class=' me-auto'>ClariFIN</strong>" +
        "<div class='toast-body'>Hubo un problema y no se pudo eliminar los PUC´s</div>",
      )
      store.deletePUC.error = error

    } finally {
      store.deletePUC.isLoading = false
    }
  }

}