import { State } from "../interfaces/state.interface"

export const initialState = () => ({
  accounting: {
    data: [],
    error: null,
    isLoading: false
  },
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
  levels: {
    data: [],
    error: null,
    isLoading: false
  },
  levelsByBusiness: {
    data: [],
    error: null,
    isLoading: false
  },
  createCategoriesByTemplate: {
    data: {},
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