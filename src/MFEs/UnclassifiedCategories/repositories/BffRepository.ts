import BffClient from "@/commons/repositories/clients/BffClient"
import { objectToQueryParams } from "@/commons/utils"
import { CreateCategoriesByTemplateClientRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"

const v1BaseUrl = "/v1/entity"

export default {

  async getAccounting ({ clientId, businessId, params }: { clientId: string, businessId: string, params: any }) {

    const result = await BffClient.get(`${v1BaseUrl}/client/${clientId}/business/${businessId}/accounting${objectToQueryParams(params)}`)

    return result.data.accounting.filter((item: any) => item.transactional === "S")
  },

  getLevels () {
    return BffClient.get(`${v1BaseUrl}/levels`)
  },

  getLevelsByBusiness ({ clientId, businessId }: { clientId: string, businessId: string }) {
    return BffClient.get(`${v1BaseUrl}/levels/client/${clientId}/business/${businessId}`)
  },

  getTemplateCategoriesByClient ({ clientId }: { clientId: string }) {
    return BffClient.get(`${v1BaseUrl}/client/${clientId}/template_categories`)
  },

  createTemplateCategoryByClient ({ clientId, businessId, data }: { clientId: string, businessId: string, data: CreateTemplateCategoryByClientRequest }) {
    return BffClient.post(`${v1BaseUrl}/client/${clientId}/business/${businessId}/template_categories`, data)
  },

  createCategoriesByTemplateClient ({
    clientId,
    businessId,
    templateId,
    data
  }: { clientId: string, businessId: string, templateId: string, data: CreateCategoriesByTemplateClientRequest }) {
    return BffClient.post(`${v1BaseUrl}/client/${clientId}/business/${businessId}/template/${templateId}/categories`, [data])
  }

}
