'use client'

import { signOut, useSession } from 'next-auth/react'
import ExitIcon from './icons/ExitIcon'
import Link from 'next/link'

export default function SignInOutButton() {
	const session = useSession()

	return !!session.data && !!session.data?.user ? (
		<button
			className='inline-block'
			onClick={() => signOut({ callbackUrl: '/', redirect: true })}
		>
			<ExitIcon />
		</button>
	) : (
		<Link className='inline-block' href='/?section=auth'>
			<ExitIcon />
		</Link>
	)
}
