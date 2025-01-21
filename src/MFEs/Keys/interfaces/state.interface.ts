import { ApiResponse } from "@/commons/interfaces"
import { Key, TemplateCategory } from "./response.interface"

export interface State {
	templateCategories: ApiResponse<Partial<TemplateCategory[]>>,
	createTemplateCategory: ApiResponse<Partial<TemplateCategory>>,
	keysByCompany: ApiResponse<Partial<Key[]>>,
	createKey: ApiResponse<Partial<Key[]>>,
}