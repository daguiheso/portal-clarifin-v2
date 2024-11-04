import useErrorManagement from "@/hooks/useErrorManagement"

import repositoryFactory from "../repositories/RepositoryFactory"
import useKeysStore from "../stores"
import { CreateCategoriesByTemplateClientRequest, CreateKeyRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"

const bffRepository = repositoryFactory.bffRepository

export default {

  async getUnclassifiedCategoriesByBusiness (data: { clientId: string, businessId: string, params: any }) {
    const store = useKeysStore()
    const { addSnackbarError } = useErrorManagement()

    store.accounting.isLoading = true

    try {
      const result = await bffRepository.getUnclassifiedCategoriesByBusiness(data)

      store.accounting.data = result

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.accounting.error = error

    } finally {
      store.accounting.isLoading = false
    }
  },

  async getTemplateCategoriesByClient (clientId: string) {
    const store = useKeysStore()
    const { addSnackbarError } = useErrorManagement()

    store.templateCategories.isLoading = true

    try {
      const result = await bffRepository.getTemplateCategoriesByClient({ clientId })

      store.templateCategories.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.templateCategories.error = error

    } finally {
      store.templateCategories.isLoading = false
    }
  },

  async createTemplateCategoryByClient (data: { clientId: string, businessId: string, data: CreateTemplateCategoryByClientRequest }) {
    const store = useKeysStore()
    const { addSnackbarError } = useErrorManagement()

    store.createTemplateCategory.isLoading = true

    try {
      const result = await bffRepository.createTemplateCategoryByClient(data)

      store.createTemplateCategory.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.createTemplateCategory.error = error

    } finally {
      store.createTemplateCategory.isLoading = false
    }
  },

  async getLevels () {
    const store = useKeysStore()
    const { addSnackbarError } = useErrorManagement()

    store.levels.isLoading = true

    try {
      const result = await bffRepository.getLevels()

      store.levels.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.levels.error = error

    } finally {
      store.levels.isLoading = false
    }
  },

  async createKey (data: { clientId: string, businessId: string, keys: CreateKeyRequest[] }) {
    const store = useKeysStore()
    const { addSnackbarError } = useErrorManagement()

    store.createKey.isLoading = true

    try {
      const result = await bffRepository.createLevels(data)

      store.createKey.data = result.data

      return true
    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.createKey.error = error

      return false
    } finally {
      store.createKey.isLoading = false
    }
  },

  async getLevelsByBusiness (data: { clientId: string, businessId: string }) {
    const store = useKeysStore()
    const { addSnackbarError } = useErrorManagement()

    store.levelsByBusiness.isLoading = true

    try {
      const result = await bffRepository.getLevelsByBusiness(data)

      store.levelsByBusiness.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.levelsByBusiness.error = error

    } finally {
      store.levelsByBusiness.isLoading = false
    }
  },

  async createCategoriesByTemplateClient (data: { clientId: string, businessId: string, templateId: string, data: CreateCategoriesByTemplateClientRequest }) {
    const store = useKeysStore()
    const { addSnackbarError } = useErrorManagement()

    store.createCategoriesByTemplate.isLoading = true

    try {
      const result = await bffRepository.createCategoriesByTemplateClient(data)

      debugger

      store.createCategoriesByTemplate.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.createCategoriesByTemplate.error = error

    } finally {
      store.createCategoriesByTemplate.isLoading = false
    }
  }

}