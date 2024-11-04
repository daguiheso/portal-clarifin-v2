import useErrorManagement from "@/hooks/useErrorManagement"

import repositoryFactory from "../repositories/RepositoryFactory"
import useUnclassifiedCategoriesStore from "../stores"
import { CreateCategoriesByTemplateClientRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"

const bffRepository = repositoryFactory.bffRepository

export default {

  async getAccounting (data: { params: any }) {
    const store = useUnclassifiedCategoriesStore()
    const { addSnackbarError } = useErrorManagement()

    store.accounting.isLoading = true

    try {
      const result = await bffRepository.getAccounting({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.accounting.data = result

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.accounting.error = error

    } finally {
      store.accounting.isLoading = false
    }
  },

  async getTemplateCategoriesByClient () {
    const store = useUnclassifiedCategoriesStore()
    const { addSnackbarError } = useErrorManagement()

    store.templateCategories.isLoading = true

    try {
      const result = await bffRepository.getTemplateCategoriesByClient({ clientId: store.clientSelected?.id })

      store.templateCategories.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.templateCategories.error = error

    } finally {
      store.templateCategories.isLoading = false
    }
  },

  async createTemplateCategoryByClient (data: { data: CreateTemplateCategoryByClientRequest }) {
    const store = useUnclassifiedCategoriesStore()
    const { addSnackbarError } = useErrorManagement()

    store.createTemplateCategory.isLoading = true

    try {
      const result = await bffRepository.createTemplateCategoryByClient({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.createTemplateCategory.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.createTemplateCategory.error = error

    } finally {
      store.createTemplateCategory.isLoading = false
    }
  },

  async getLevels () {
    const store = useUnclassifiedCategoriesStore()
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

  async getLevelsByBusiness () {
    const store = useUnclassifiedCategoriesStore()
    const { addSnackbarError } = useErrorManagement()

    store.levelsByBusiness.isLoading = true

    try {
      const result = await bffRepository.getLevelsByBusiness({
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.levelsByBusiness.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.levelsByBusiness.error = error

    } finally {
      store.levelsByBusiness.isLoading = false
    }
  },

  async createCategoriesByTemplateClient (data: { templateId: string, data: CreateCategoriesByTemplateClientRequest }) {
    const store = useUnclassifiedCategoriesStore()
    const { addSnackbarError } = useErrorManagement()

    store.createCategoriesByTemplate.isLoading = true

    try {
      const result = await bffRepository.createCategoriesByTemplateClient({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.createCategoriesByTemplate.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.createCategoriesByTemplate.error = error

    } finally {
      store.createCategoriesByTemplate.isLoading = false
    }
  },

  async updateCategoriesByTemplateClient (data: { templateId: string, data: CreateCategoriesByTemplateClientRequest }) {
    const store = useUnclassifiedCategoriesStore()
    const { addSnackbarError } = useErrorManagement()

    store.createCategoriesByTemplate.isLoading = true

    try {
      const result = await bffRepository.updateCategoriesByTemplateClient({
        ...data,
        clientId: store.clientSelected?.id,
        businessId: store.businessSelected?.id
      })

      store.createCategoriesByTemplate.data = result.data

    } catch (error: unknown) {
      addSnackbarError({ error, errorKey: "bulkMovementTemplate" })
      store.createCategoriesByTemplate.error = error

    } finally {
      store.createCategoriesByTemplate.isLoading = false
    }
  }

}