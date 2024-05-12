'use client'

import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export interface QueryProviderProps {
	children: React.ReactNode
}

const DEFAULT_ERROR = 'Something went wrong'
const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
	queryCache: new QueryCache({
		onError: cause => {
			const { response } = cause as AxiosError<BaseResponse>
			toast.error(response?.data.message ?? DEFAULT_ERROR)
		},
	}),
	mutationCache: new MutationCache({
		onError: cause => {
			const { response } = cause as AxiosError<BaseResponse>
			toast.error(response?.data.message ?? DEFAULT_ERROR)
		},
	}),
})

export function QueryProvider({ children }: QueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
