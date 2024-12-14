import repositoryFactory from "../repositories/RepositoryFactory"
import useKeysStore from "../stores"
import { CreateCategoriesByTemplateClientRequest, CreateKeyRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"
import { handleError } from "@/commons/utils"

const bffRepository = repositoryFactory.bffRepository

export default {

  async getUnclassifiedCategoriesByBusiness (data: { clientId: string, businessId: string, params: any }) {
    const store = useKeysStore()

    store.accounting.isLoading = true

    try {
      const result = await bffRepository.getUnclassifiedCategoriesByBusiness(data)

      store.accounting.data = result

    } catch (error: unknown) {
      store.accounting.error = error

      handleError(error)
    } finally {
      store.accounting.isLoading = false
    }
  },

  async getTemplateCategoriesByClient (clientId: string) {
    const store = useKeysStore()

    store.templateCategories.isLoading = true

    try {
      const result = await bffRepository.getTemplateCategoriesByClient({ clientId })

      store.templateCategories.data = result.data

    } catch (error: unknown) {
      store.templateCategories.error = error

      handleError(error)
    } finally {
      store.templateCategories.isLoading = false
    }
  },

  async createTemplateCategoryByClient (data: { clientId: string, businessId: string, data: CreateTemplateCategoryByClientRequest }) {
    const store = useKeysStore()

    store.createTemplateCategory.isLoading = true

    try {
      const result = await bffRepository.createTemplateCategoryByClient(data)

      store.createTemplateCategory.data = result.data

    } catch (error: unknown) {
      store.createTemplateCategory.error = error

      handleError(error)
    } finally {
      store.createTemplateCategory.isLoading = false
    }
  },

  async getLevels () {
    const store = useKeysStore()

    store.levels.isLoading = true

    try {
      const result = await bffRepository.getLevels()

      store.levels.data = result.data

    } catch (error: unknown) {
      store.levels.error = error

      handleError(error)
    } finally {
      store.levels.isLoading = false
    }
  },

  async createKey (data: { clientId: string, businessId: string, keys: CreateKeyRequest[] }) {
    const store = useKeysStore()

    store.createKey.isLoading = true

    try {
      const result = await bffRepository.createLevels(data)

      store.createKey.data = result.data

      return true
    } catch (error: unknown) {
      store.createKey.error = error

      handleError(error)

      return false
    } finally {
      store.createKey.isLoading = false
    }
  },

  async getLevelsByBusiness (data: { clientId: string, businessId: string }) {
    const store = useKeysStore()

    store.levelsByBusiness.isLoading = true

    try {
      const result = await bffRepository.getLevelsByBusiness(data)

      store.levelsByBusiness.data = result.data

    } catch (error: unknown) {
      store.levelsByBusiness.error = error

      handleError(error)
    } finally {
      store.levelsByBusiness.isLoading = false
    }
  },

  async createCategoriesByTemplateClient (data: { clientId: string, businessId: string, templateId: string, data: CreateCategoriesByTemplateClientRequest }) {
    const store = useKeysStore()

    store.createCategoriesByTemplate.isLoading = true

    try {
      const result = await bffRepository.createCategoriesByTemplateClient(data)

      store.createCategoriesByTemplate.data = result.data

    } catch (error: unknown) {
      store.createCategoriesByTemplate.error = error

      handleError(error)
    } finally {
      store.createCategoriesByTemplate.isLoading = false
    }
  }

}