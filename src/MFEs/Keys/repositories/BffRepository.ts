import BffClient from "@/commons/repositories/clients/BffClient"
import { getClientId } from "@/commons/utils"
import { CreateKeyRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"

const v1BaseUrl = "/v1/entity"

export default {

  createKeys ({ companyId, idBusinessUnit, keys }: { companyId: string, idBusinessUnit: string, keys: CreateKeyRequest[] }) {
    return BffClient.post(`${v1BaseUrl}/keys/client/${getClientId()}/company/${companyId}/business_unit/${idBusinessUnit}`, keys)
  },

  getKeysByCompany ({ companyId }: { companyId: string }) {
    return BffClient.get(`${v1BaseUrl}/keys/client/${getClientId()}/company/${companyId}`)
  },

  getTemplateCategoriesByClient () {
    return BffClient.get(`${v1BaseUrl}/client/${getClientId()}/template_categories`)
  },

  createTemplateCategoryByClient ({ companyId, idBusinessUnit, data }: { companyId: string, idBusinessUnit: string, data: CreateTemplateCategoryByClientRequest }) {
    return BffClient.post(`${v1BaseUrl}/client/${getClientId()}/company/${companyId}/business_unit/${idBusinessUnit}/template_categories`, data)
  },

}
