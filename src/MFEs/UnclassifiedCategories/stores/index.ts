import { defineStore } from "pinia"
import state from "./state"
import getters from "./getters"
import actions from "./actions"

export default defineStore({
  id: "unclasifiedCategories",
  state: () => state,
  getters,
  actions
})
