import { State } from "../interfaces/state.interface"

export const initialState = () => ({
  proccessResult: {
    data: [],
    error: null,
    isLoading: false
  }
})

const state: State = initialState()

export default state