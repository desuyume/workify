'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
	return (
		<button
			onClick={() => signOut({ callbackUrl: '/', redirect: true })}
			className='fixed right-4 bottom-4 px-6 py-2 bg-primary-light text-primary-dark rounded-[0.625rem] cursor-pointer z-30'
		>
			Выход
		</button>
	)
}
