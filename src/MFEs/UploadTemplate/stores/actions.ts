import { handleError } from "@/commons/utils"
import repositoryFactory from "../repositories/RepositoryFactory"
import useUploadTemplateStore from "../stores"
import { claToast } from "@/commons/utils/toast"

const bffRepository = repositoryFactory.bffRepository

export default {

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
    companyId: number,
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
        store.uploadFile.error = error.response.data?.error
      }
      handleError(error)

      return false

    } finally {
      store.uploadFile.isLoading = false
    }
  },

  async getAccounting (data: { companyId: string, params: any }) {
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

  async deletePUC (data: { companyId: string, dateImport: string }) {
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

      claToast.errorToast("Hubo un problema y no se pudo eliminar los PUC´s",
      )
      store.deletePUC.error = error

    } finally {
      store.deletePUC.isLoading = false
    }
  }

}