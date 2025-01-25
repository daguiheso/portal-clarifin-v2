import BffClient from "@/commons/repositories/clients/BffClient"
import { getClientId, objectToQueryParams } from "@/commons/utils"
import { CreateCategoriesByTemplateClientRequest, CreateTemplateCategoryByClientRequest } from "../interfaces/request.interface"
import { Accounting } from "../interfaces/response.interface"

const v1BaseUrl = "/v1/entity"

export default {

  async getAccounting ({ companyId, params }: { companyId: string, params: any }): Promise<Accounting[]> {
    const result = await BffClient.get(`${v1BaseUrl}/client/${getClientId()}/company/${companyId}/accounting/csv${objectToQueryParams(params)}`)

    return result.data.accounting.filter((item: Accounting) => item.transactional === "S")
  },

  getKeys () {
    return BffClient.get(`${v1BaseUrl}/keys`)
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

  createCategoriesByTemplateClient ({
    companyId,
    templateId,
    data
  }: { companyId: string, templateId: string, data: CreateCategoriesByTemplateClientRequest[] }) {
    return BffClient.post(`${v1BaseUrl}/client/${getClientId()}/company/${companyId}/template/${templateId}/categories`, data)
  },

  updateCategoriesByTemplateClient ({
    companyId,
    templateId,
    data
  }: { companyId: string, templateId: string, data: CreateCategoriesByTemplateClientRequest[] }) {
    return BffClient.patch(`${v1BaseUrl}/client/${getClientId()}/company/${companyId}/template/${templateId}/categories`, data)
  }

}
