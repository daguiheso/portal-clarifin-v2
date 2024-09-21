import { State } from "../interfaces/state.interface"

const state: State = {
  clients: {
    data: [],
    error: null,
    isLoading: false
  },
  business: {
    data: [],
    error: null,
    isLoading: false
  },
  formats: {
    data: [],
    error: null,
    isLoading: false
  },
  uploadFile: {
    data: {},
    error: null,
    isLoading: false
  },
  completedSteps: []
}

export default state