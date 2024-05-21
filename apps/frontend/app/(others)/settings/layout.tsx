'use client'

import Loading from '@/app/ui/loading'
import Unauthorized from '@/app/ui/unauthorized'
import { useSession } from 'next-auth/react'

export default function Layout({ children }: { children: React.ReactNode }) {
	const session = useSession()

	if (session.status === 'loading') {
		return <Loading className='w-full h-full' />
	}

	if (session.status === 'unauthenticated') {
		return <Unauthorized />
	}

	return children
}
