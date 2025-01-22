import { State } from "../interfaces/state.interface"

export const initialState = () => ({
  businessSelected: null,
  businessUnitSelected: null,
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
  keys: {
    data: [],
    error: null,
    isLoading: false
  },
  keysByCompany: {
    data: [],
    error: null,
    isLoading: false
  },
  createCategoriesByTemplate: {
    data: {},
    error: null,
    isLoading: false
  }
})

const state: State = initialState()

export default state