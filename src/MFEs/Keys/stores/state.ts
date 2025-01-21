import { State } from "../interfaces/state.interface"

export const initialState = () => ({
  templateCategories: {
    data: [],
    error: null,
    isLoading: false
  },
  createTemplateCategory: {
    data: {},
    error: null,
    isLoading: false
  },
  keysByCompany: {
    data: [],
    error: null,
    isLoading: false
  },
  createKey: {
    data: [],
    error: null,
    isLoading: false
  }
})

const state: State = initialState()

export default state