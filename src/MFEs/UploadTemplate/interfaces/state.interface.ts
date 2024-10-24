import { ApiResponse } from "@/commons/interfaces"

export interface State {
	clients: ApiResponse<unknown>
	business: ApiResponse<unknown>
	formats: ApiResponse<unknown>
	completedSteps: number[]
	uploadFile: ApiResponse<unknown>
	accounting: ApiResponse<unknown>
}