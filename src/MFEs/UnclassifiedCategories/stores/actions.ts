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
        companyId: store.businessSelected?.id
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
      const result = await bffRepository.getTemplateCategoriesByClient()

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
        companyId: store.businessSelected?.id,
        idBusinessUnit: store.businessUnitSelected?.id
      })

      store.createTemplateCategory.data = result.data

    } catch (error: unknown) {
      store.createTemplateCategory.error = error

      handleError(error)
    } finally {
      store.createTemplateCategory.isLoading = false
    }
  },

  async getKeys () {
    const store = useUnclassifiedCategoriesStore()

    store.keys.isLoading = true

    try {
      const result = await bffRepository.getKeys()

      store.keys.data = result.data

    } catch (error: unknown) {
      store.keys.error = error

      handleError(error)
    } finally {
      store.keys.isLoading = false
    }
  },

  async getKeysByCompany () {
    const store = useUnclassifiedCategoriesStore()

    store.keysByCompany.isLoading = true

    try {
      const result = await bffRepository.getKeysByCompany({
        companyId: store.businessSelected?.id
      })

      store.keysByCompany.data = result.data

    } catch (error: unknown) {
      store.keysByCompany.error = error

      handleError(error)
    } finally {
      store.keysByCompany.isLoading = false
    }
  },

  async createCategoriesByTemplateClient (data: { templateId: string, data: CreateCategoriesByTemplateClientRequest[] }) {
    const store = useUnclassifiedCategoriesStore()

    store.createCategoriesByTemplate.isLoading = true

    try {
      const result = await bffRepository.createCategoriesByTemplateClient({
        ...data,
        companyId: store.businessSelected?.id
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
        companyId: store.businessSelected?.id
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