import axios from "axios"

const baseURL = "https://api.clarifin.co"

const BffClient = axios.create({
  baseURL
})

export default BffClient
