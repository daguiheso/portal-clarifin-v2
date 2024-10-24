import useErrorManagement from "@/hooks/useErrorManagement"

import repositoryFactory from "../repositories/RepositoryFactory"
import useUploadTemplateStore from "../stores"

const bffRepository = repositoryFactory.bffRepository

export default {
  async getClients () {
    const store = useUploadTemplateStore()
    // const { addSnackbarError } = useErrorManagement()

    store.clients.isLoading = true

    try {
      const result = await bffRepository.getClients()

      store.clients.data = result.data

    } catch (error: unknown) {
      // addSnackbarError({ error, errorKey: "bulkMovementClients" })
      store.clients.error = error

    } finally {
      store.clients.isLoading = false
    }
  },

  async getBusiness (clientId: string) {
    const store = useUploadTemplateStore()
    // const { addSnackbarError } = useErrorManagement()

    store.business.isLoading = true

    try {
      const result = await bffRepository.getBusiness(clientId)

      store.business.data = result.data

    } catch (error: unknown) {
      // addSnackbarError({ error, errorKey: "bulkMovementBusiness" })
      store.business.error = error

    } finally {
      store.business.isLoading = false
    }
  },

  async getFormats () {
    const store = useUploadTemplateStore()
    const { addSnackbarError } = useErrorManagement()

    store.formats.isLoading = true

    try {
      const result = await bffRepository.getFormats()

      store.formats.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.formats.error = error

    } finally {
      store.formats.isLoading = false
    }
  },

  async uploadFile (data: {
    idClient: number,
    idBusiness: number,
    idFormat: number,
    dateImport: string,
    file: Blob
  }) {
    const store = useUploadTemplateStore()
    const { addSnackbarError } = useErrorManagement()

    store.uploadFile.isLoading = true

    try {
      const result = await bffRepository.uploadFile(data)

      store.uploadFile.data = result.response.data
      store.uploadFile.error = null

      return true

    } catch (error: any) {
      if (!error?.response?.data?.errorDescription) {
        addSnackbarError({ error: error.message, errorKey: "bulkMovementUpload"})
        store.uploadFile.error = error
      } else {
        store.uploadFile.error = error.response.data
      }

      return false

    } finally {
      store.uploadFile.isLoading = false
    }
  },

  async getAccounting (data: { clientId: string, businessId: string, params: any }) {
    const store = useUploadTemplateStore()
    const { addSnackbarError } = useErrorManagement()

    store.accounting.isLoading = true

    try {
      const result = await bffRepository.getAccounting(data)

      store.accounting.data = result

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.accounting.error = error

    } finally {
      store.accounting.isLoading = false
    }
  },

}