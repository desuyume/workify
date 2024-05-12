import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export const apiInstance = axios.create({
	baseURL: process.env.API_URL,
})

export const authApiInstance = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
})

authApiInstance.interceptors.request.use(async config => {
	const session = await getServerSession(authOptions)
	config.headers.Authorization = `Bearer ${session?.tokens.accessToken}`
	return config
})
