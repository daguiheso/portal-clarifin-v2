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

    store.uploadedFile.isLoading = true

    try {
      const response = await bffRepository.uploadFile(data)

      store.uploadedFile.data = response.data
      store.uploadedFile.error = null

      return true

    } catch (error: any) {
      store.uploadedFile.error = error

      handleError(error)

      return false

    } finally {
      store.uploadedFile.isLoading = false
    }
  },

  // async getAccounting (data: { companyId: string, params: any }) {
  //   const store = useUploadTemplateStore()

  //   store.accounting.isLoading = true

  //   try {
  //     const result = await bffRepository.getAccounting(data)

  //     store.accounting.data = result

  //   } catch (error: unknown) {
  //     store.accounting.error = error

  //     handleError(error)
  //   } finally {
  //     store.accounting.isLoading = false
  //   }
  // },

  async deletePUC (data: { companyId: string, dateImport: string }) {
    const store = useUploadTemplateStore()

    store.deletePUC.isLoading = true

    try {
      const result = await bffRepository.deletePUC(data)

      store.deletePUC.data = result

      claToast.successToast(
        "<strong class=' me-auto'>ClariFIN</strong>" +
        "<div class='toast-body'>PUC´s eliminados correctamente</div>",
        true
      )

    } catch (error: unknown) {

      claToast.errorToast("Hubo un problema y no se pudo eliminar los PUC´s",
      )
      store.deletePUC.error = error

    } finally {
      store.deletePUC.isLoading = false
    }
  },

  async getProcessStatus () {
    const store = useUploadTemplateStore()

    store.processStatus.isLoading = true

    try {
      const idProcess = store.uploadedFile.data.idProcess

      if (!idProcess) throw new Error("No process id found")

      const result = await bffRepository.getProcessStatus(idProcess)

      store.processStatus.data = result.data
    } catch (error: unknown) {
      store.processStatus.error = error
    } finally {
      store.processStatus.isLoading = false
    }
  },

  async getProcessByCompanyId (companyId: string) {
    const store = useUploadTemplateStore()

    store.proccessResult.isLoading = true
    const idProcess = (store.uploadedFile.data as { idProcess: string })?.idProcess

    try {
      const result = await bffRepository.getProcessByCompanyId(companyId)

      const processAccounting = result.data.find((data: any) => data.idProcess === idProcess)

      store.proccessResult.data = processAccounting || {}
    } catch (error: unknown) {
      store.proccessResult.error = error

      handleError(error)
    } finally {
      store.proccessResult.isLoading = false
    }
  }

}