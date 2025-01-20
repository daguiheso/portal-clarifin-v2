import { TemplateCategory } from "../interfaces/response.interface"

export default {
  existTemplateCategoryForBusinessUnit: (state: any) => (idBusinessUnit: string): TemplateCategory | null => {
    if (!state.templateCategories.data || !state.templateCategories.data.length) {
      return null
    }

    return state.templateCategories.data.find((item: any) => item.idBusinessUnit === idBusinessUnit)
  }
}