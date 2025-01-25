import { State } from "../interfaces/state"

const state: State = {
  clients: {
    data: [],
    error: null,
    isLoading: false
  },
  companies: {
    data: [],
    error: null,
    isLoading: false
  },
  profileMe: {
    data: [],
    error: null,
    isLoading: false
  }
}

export default state
