import { AuthProvider } from '@/contexts/auth'
import { QueryProvider } from '@/contexts/query'

export interface ProvidersProps {
	children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<AuthProvider>
			<QueryProvider>{children}</QueryProvider>
		</AuthProvider>
	)
}
