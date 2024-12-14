import repositoryFactory from "../repositories/RepositoryFactory"
import useUnclassifiedCategoriesStore from "../stores"
import { CreateCategoriesByTemplateClientRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"
import { handleError } from "@/commons/utils"

const bffRepository = repositoryFactory.bffRepository

export default {

  async getAccounting (data: { params: any }) {
    const store = useUnclassifiedCategoriesStore()

    store.accounting.isLoading = true

    try {
      const result = await bffRepository.getAccounting({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.accounting.data = result

    } catch (error: unknown) {
      store.accounting.error = error

      handleError(error)
    } finally {
      store.accounting.isLoading = false
    }
  },

  async getTemplateCategoriesByClient () {
    const store = useUnclassifiedCategoriesStore()

    store.templateCategories.isLoading = true

    try {
      const result = await bffRepository.getTemplateCategoriesByClient({ clientId: store.clientSelected?.id })

      store.templateCategories.data = result.data

    } catch (error: unknown) {
      store.templateCategories.error = error

      handleError(error)
    } finally {
      store.templateCategories.isLoading = false
    }
  },

  async createTemplateCategoryByClient (data: { data: CreateTemplateCategoryByClientRequest }) {
    const store = useUnclassifiedCategoriesStore()

    store.createTemplateCategory.isLoading = true

    try {
      const result = await bffRepository.createTemplateCategoryByClient({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.createTemplateCategory.data = result.data

    } catch (error: unknown) {
      store.createTemplateCategory.error = error

      handleError(error)
    } finally {
      store.createTemplateCategory.isLoading = false
    }
  },

  async getLevels () {
    const store = useUnclassifiedCategoriesStore()

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

  async getLevelsByBusiness () {
    const store = useUnclassifiedCategoriesStore()

    store.levelsByBusiness.isLoading = true

    try {
      const result = await bffRepository.getLevelsByBusiness({
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.levelsByBusiness.data = result.data

    } catch (error: unknown) {
      store.levelsByBusiness.error = error

      handleError(error)
    } finally {
      store.levelsByBusiness.isLoading = false
    }
  },

  async createCategoriesByTemplateClient (data: { templateId: string, data: CreateCategoriesByTemplateClientRequest[] }) {
    const store = useUnclassifiedCategoriesStore()

    store.createCategoriesByTemplate.isLoading = true

    try {
      const result = await bffRepository.createCategoriesByTemplateClient({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.createCategoriesByTemplate.data = result.data

    } catch (error: unknown) {
      store.createCategoriesByTemplate.error = error

      handleError(error)
    } finally {
      store.createCategoriesByTemplate.isLoading = false
    }
  },

  async updateCategoriesByTemplateClient (data: { templateId: string, data: CreateCategoriesByTemplateClientRequest[] }) {
    const store = useUnclassifiedCategoriesStore()

    store.createCategoriesByTemplate.isLoading = true

    try {
      const result = await bffRepository.updateCategoriesByTemplateClient({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.createCategoriesByTemplate.data = result.data

    } catch (error: unknown) {
      store.createCategoriesByTemplate.error = error

      handleError(error)
    } finally {
      store.createCategoriesByTemplate.isLoading = false
    }
  }

}