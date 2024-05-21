'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Modal from './modal'
import { AuthModalContent } from '@/components/auth/AuthModalContent'
import { signOut, useSession } from 'next-auth/react'

export default function LoginRegButton() {
	const [isAuthModalVisible, setIsAuthModalVisible] = useState<boolean>(false)
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()
	const session = useSession()

	useEffect(() => {
		if (
			searchParams.get('section') === 'auth' &&
			session.status !== 'loading'
		) {
			setIsAuthModalVisible(session.status === 'unauthenticated')
			router.replace(pathname)
		}
	}, [session])

	if (session.status === 'loading') return null

	return (
		<>
			{session.data?.user ? (
				<button
					onClick={() => signOut({ callbackUrl: '/', redirect: false })}
					className='text-2xl text-primary-light underline skip-ink-none hover:uppercase hover:no-underline pl-[4.28125rem]'
				>
					Выход
				</button>
			) : (
				<button
					onClick={() => setIsAuthModalVisible(true)}
					className='text-2xl text-primary-light underline skip-ink-none hover:uppercase hover:no-underline pl-[4.28125rem]'
				>
					Вход / Регистрация
				</button>
			)}

			<Modal
				isVisible={isAuthModalVisible}
				onClose={() => setIsAuthModalVisible(false)}
				children={
					<AuthModalContent onClose={() => setIsAuthModalVisible(false)} />
				}
			/>
		</>
	)
}
