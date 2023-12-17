import { BASE_URL } from '../constants/constants'
import axios from 'axios'

class Api {
  private readonly _url: string

  constructor(options: { url: string }) {
    this._url = options.url
  }

  getSites() {
    return axios.get(`${this._url}/sites`)
  }

  getTests() {
    return axios.get(`${this._url}/tests`)
  }

  getTestById(id: string) {
    return axios.get(`${this._url}/tests/${id}`)
  }
}

export const api = new Api({
  url: BASE_URL,
})
