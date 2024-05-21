import { Button } from '@workify/ui'
import Link from 'next/link'

export default function Unauthorized() {
	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
			<p className='text-4xl font-medium text-center mb-8'>
				Вы не авторизованы
			</p>
			<Link href='/?section=auth'>
				<Button title='Войти' variant='light' />
			</Link>
		</div>
	)
}
