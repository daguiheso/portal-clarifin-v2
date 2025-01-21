import { ApiResponse } from "@/commons/interfaces"

export interface State {
	formats: ApiResponse<unknown>
	completedSteps: number[]
	uploadFile: ApiResponse<unknown>
	accounting: ApiResponse<unknown>
	deletePUC: ApiResponse<unknown>
}