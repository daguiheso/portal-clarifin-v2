import { State } from "../interfaces/state.interface"

const state: State = {
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
  accounting: {
    data: [],
    error: null,
    isLoading: false
  },
  completedSteps: [],
  deletePUC: {
    data: {},
    error: null,
    isLoading: false
  }
}

export default state