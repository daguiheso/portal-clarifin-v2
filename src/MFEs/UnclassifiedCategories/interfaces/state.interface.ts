import { ApiResponse } from "@/commons/interfaces"
import { Accounting, Key, TemplateCategory } from "./response.interface"

export interface State {
	businessSelected: any,
	businessUnitSelected: any,
	accounting: ApiResponse<Partial<Accounting>>,
	templateCategories: ApiResponse<Partial<TemplateCategory[]>>,
	createTemplateCategory: ApiResponse<Partial<TemplateCategory>>,
	keys: ApiResponse<Partial<Key[]>>,
	keysByCompany: ApiResponse<Partial<Key[]>>,
	createCategoriesByTemplate: ApiResponse<Partial<Key>>
}