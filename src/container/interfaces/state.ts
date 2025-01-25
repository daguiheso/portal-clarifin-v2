import { ApiResponse } from "@/commons/interfaces"
import type { ProfileMe } from "@/hooks/useSession"

export interface State {
  clients: ApiResponse<unknown>
  companies: ApiResponse<unknown>
  profileMe: ApiResponse<Partial<ProfileMe>>
}