import { ApiResponse } from "@/commons/interfaces"

export interface State {
	clientSelected: any,
	businessSelected: any,
	clients: ApiResponse<unknown>
	business: ApiResponse<unknown>
	formats: ApiResponse<unknown>
	completedSteps: number[]
	uploadFile: ApiResponse<unknown>
	accounting: ApiResponse<unknown>
	deletePUC: ApiResponse<unknown>
}