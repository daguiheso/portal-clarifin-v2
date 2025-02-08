import repositoryFactory from "../repositories/RepositoryFactory"
import useUnclassifiedCategoriesStore from "../stores"

import { handleError } from "@/commons/utils"

const bffRepository = repositoryFactory.bffRepository

export default {

  async getProcessByCompanyId (companyId: string) {
    const store = useUnclassifiedCategoriesStore()

    store.proccessResult.isLoading = true

    try {
      const response = await bffRepository.getProcessByCompanyId(companyId)

      store.proccessResult.data = response.data
    } catch (error: unknown) {
      store.proccessResult.error = error

      handleError(error)
    } finally {
      store.proccessResult.isLoading = false
    }
  }

}