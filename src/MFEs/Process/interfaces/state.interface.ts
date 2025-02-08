import { ApiResponse } from "@/commons/interfaces"
import { Process } from "./response.interface"

export interface State {
	proccessResult: ApiResponse<Partial<Process[]>>
}