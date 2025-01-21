import repositoryFactory from "../repositories/RepositoryFactory"
import useKeysStore from "../stores"
import { CreateKeyRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"
import { handleError } from "@/commons/utils"

const bffRepository = repositoryFactory.bffRepository

export default {

  async getTemplateCategoriesByClient () {
    const store = useKeysStore()

    store.templateCategories.isLoading = true

    try {
      const result = await bffRepository.getTemplateCategoriesByClient()

      store.templateCategories.data = result.data

    } catch (error: unknown) {
      store.templateCategories.error = error

      handleError(error)
    } finally {
      store.templateCategories.isLoading = false
    }
  },

  async createTemplateCategoryByClient (data: { companyId: string, idBusinessUnit: string, data: CreateTemplateCategoryByClientRequest }) {
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

  async createKey (data: { companyId: string, idBusinessUnit: string, keys: CreateKeyRequest[] }) {
    const store = useKeysStore()

    store.createKey.isLoading = true

    try {
      const result = await bffRepository.createKeys(data)

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

  async getKeysByCompany (data: { companyId: string }) {
    const store = useKeysStore()

    store.keysByCompany.isLoading = true

    try {
      const result = await bffRepository.getKeysByCompany(data)

      store.keysByCompany.data = result.data

    } catch (error: unknown) {
      store.keysByCompany.error = error

      handleError(error)
    } finally {
      store.keysByCompany.isLoading = false
    }
  },

}