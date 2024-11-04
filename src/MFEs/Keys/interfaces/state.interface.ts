import { ApiResponse } from "@/commons/interfaces"
import { Accounting, Level, TemplateCategory } from "./response.interface"

export interface State {
	accounting: ApiResponse<Partial<Accounting>>,
	templateCategories: ApiResponse<Partial<TemplateCategory[]>>,
	createTemplateCategory: ApiResponse<Partial<TemplateCategory>>,
	levels: ApiResponse<Partial<Level[]>>,
	levelsByBusiness: ApiResponse<Partial<Level[]>>,
	createCategoriesByTemplate: ApiResponse<Partial<Level>>,
	createKey: ApiResponse<Partial<Level[]>>,
}