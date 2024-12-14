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

  const getBusiness = async (clientId: string) => {
    store.business.isLoading = true

    try {
      const result = await bffRepository.getBusiness(clientId)

      store.business.data = result.data
    } catch (error: unknown) {
      store.business.error = error

      handleError(error)
    } finally {
      store.business.isLoading = false
    }
  }

  const clients = computed(() => ({
    data: store.clients.data,
    isLoading: store.clients.isLoading,
    error: store.clients.error
  }))

  // Objeto computado para `business`
  const business = computed(() => ({
    data: store.business.data,
    isLoading: store.business.isLoading,
    error: store.business.error
  }))

  return {
    getClients,
    getBusiness,
    clients,
    business
  }
}
