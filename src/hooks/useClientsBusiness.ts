import { computed } from "vue"
import useContainerStore from "@/container/store" // Ruta del store
import bffRepository from "@/commons/repositories/BffRepository" // Ruta del repositorio
import { handleError } from "@/commons/utils"

export function useClientsBusiness () {
  const store = useContainerStore()

  const getClients = async () => {
    store.clients.isLoading = true

    try {
      const result = await bffRepository.getClients()

      store.clients.data = result.data
    } catch (error: unknown) {
      store.clients.error = error

      handleError(error)
    } finally {
      store.clients.isLoading = false
    }
  }

  const getCompanies = async () => {
    store.companies.isLoading = true

    try {
      const result = await bffRepository.getCompanies()

      store.companies.data = result.data
    } catch (error: unknown) {
      store.companies.error = error

      handleError(error)
    } finally {
      store.companies.isLoading = false
    }
  }

  const clients = computed(() => ({
    data: store.clients.data,
    isLoading: store.clients.isLoading,
    error: store.clients.error
  }))

  const companies = computed(() => ({
    data: store.companies.data,
    isLoading: store.companies.isLoading,
    error: store.companies.error
  }))

  return {
    getClients,
    getCompanies,
    clients,
    companies
  }
}
