import { Button } from '@workify/ui'
import Link from 'next/link'

interface ErrorUIProps {
	title: string
	link?: {
		title: string
		href: string
	}
}

export default function ErrorUI({ title, link }: ErrorUIProps) {
	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
			<p className='text-3xl font-medium mb-6'>{title}</p>
			<Link href={link?.href ?? '/vacancy'}>
				<Button
					title={link?.title ?? 'К анкетам'}
					variant='light-transparent'
					width='12rem'
					height='3rem'
				/>
			</Link>
		</div>
	)
}
