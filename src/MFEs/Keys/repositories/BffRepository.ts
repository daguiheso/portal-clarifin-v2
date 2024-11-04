import BffClient from "@/commons/repositories/clients/BffClient"
import { objectToQueryParams } from "@/commons/utils"
import { CreateCategoriesByTemplateClientRequest, CreateKeyRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"
import { Accounting } from "../interfaces/response.interface"

const v1BaseUrl = "/v1/entity"

export default {

  async getAccounting ({ clientId, businessId, params }: { clientId: string, businessId: string, params: any }) {

    const result = await BffClient.get(`${v1BaseUrl}/client/${clientId}/business/${businessId}/accounting${objectToQueryParams(params)}`)

    return result.data.accounting.filter((item: any) => item.transactional === "S")
  },

  async getUnclassifiedCategoriesByBusiness ({ clientId, businessId, params }: { clientId: string, businessId: string, params: any }): Promise<Accounting[]> {

    const result = await BffClient.get(`${v1BaseUrl}/client/${clientId}/business/${businessId}/accounting${objectToQueryParams(params)}`)

    return result.data.accounting
      .filter((item: Accounting) => item.transactional === "S")
      .filter((item: Accounting) => item.category?.toLocaleLowerCase()?.includes("unclassified"))
  },

  getLevels () {
    return BffClient.get(`${v1BaseUrl}/levels`)
  },

  createLevels ({ clientId, businessId, keys }: { clientId: string, businessId: string, keys: CreateKeyRequest[] }) {
    return BffClient.post(`${v1BaseUrl}/levels/client/${clientId}/business/${businessId}`, keys)
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
