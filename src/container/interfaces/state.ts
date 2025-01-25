import { ApiResponse } from "@/commons/interfaces"

export interface State {
  clients: ApiResponse<unknown>
  companies: ApiResponse<unknown>
}