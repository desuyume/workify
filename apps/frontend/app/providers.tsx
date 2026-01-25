'use client'

import { AuthProvider } from '@/contexts/auth'
import { ProfileProvider } from '@/contexts/profile'

export interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </AuthProvider>
  )
}
