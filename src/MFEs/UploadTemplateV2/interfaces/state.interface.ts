import { ApiResponse } from "@/commons/interfaces"
import { Process, ProcessStatus } from "./response.interface"

export interface State {
	formats: ApiResponse<unknown>
	completedSteps: number[]
	uploadedFile: ApiResponse<Partial<ProcessStatus>>
	accounting: ApiResponse<unknown>
	deletePUC: ApiResponse<unknown>
	processStatus: ApiResponse<Partial<ProcessStatus>>,
	proccessResult: ApiResponse<Partial<Process>>
}