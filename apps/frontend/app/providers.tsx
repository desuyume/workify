import { AuthProvider } from '@/contexts/auth'
import { ProfileProvider } from '@/contexts/profile'
import { QueryProvider } from '@/contexts/query'

export interface ProvidersProps {
	children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<AuthProvider>
			<QueryProvider>
				<ProfileProvider>{children}</ProfileProvider>
			</QueryProvider>
		</AuthProvider>
	)
}
