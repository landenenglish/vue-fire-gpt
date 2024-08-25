import axios, { AxiosInstance } from 'axios'

export let api: AxiosInstance

export const initApi = (token: string) => {
  if (!api && token) {
    api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
