import { TemplateCategory } from "../interfaces/response.interface"

export default {
  existTemplateCategoryForBusinessUnit: (state: any) => (idBusinessUnit: string): TemplateCategory | null => {
    if (!state.templateCategories.data || !state.templateCategories.data.length) {
      return null
    }

    return state.templateCategories.data.find((item: any) => item.idBusinessUnit === idBusinessUnit)
  },

  accountingNotClassified: (state: any) => {

    if (!state.accounting.data || !state.accounting.data.length) {
      return []
    }

    return state.accounting.data
      .filter((item: any) => item.transactional === "S")
      .filter((item: any) => item.category?.toLocaleLowerCase()?.includes("unclassified"))
  }
}