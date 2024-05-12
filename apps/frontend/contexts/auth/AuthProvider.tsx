'use client'

import { SessionProvider } from 'next-auth/react'

export interface AuthProviderProps {
	children: React.ReactNode
}

export function AuthProvider({ children, ...props }: AuthProviderProps) {
	return <SessionProvider {...props}>{children}</SessionProvider>
}
