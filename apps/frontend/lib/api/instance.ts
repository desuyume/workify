import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

export const apiInstance = axios.create({
  baseURL: process.env.API_URL
})

export const authApiInstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true
})

authApiInstance.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      // Server-side
      const session = await getServerSession(authOptions)

      if (session?.tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${session.tokens.accessToken}`
      }
    } else {
      // Client-side
      const session = await getSession()

      if (session?.tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${session.tokens.accessToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

authApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration or invalid token logic here
    }
    return Promise.reject(error)
  }
)

export default authApiInstance
