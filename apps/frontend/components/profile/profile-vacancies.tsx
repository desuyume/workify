import { Button } from '@workify/ui'
import Vacancy from '../vacancy/vacancy'
import Link from 'next/link'

export default function ProfileVacancies() {
	return (
		<div
			className={'w-[68rem] pb-[5.25rem] flex flex-col realtive transition-all'}
		>
			<Vacancy inProfile />
			<Vacancy inProfile />

			<Link className='absolute right-8 top-8' href='/vacancy/create'>
				<Button
					variant='light-transparent'
					title='Создать анкету'
					width='15rem'
					height='2.5rem'
					fontSize='1.25rem'
					fontWeight='500'
				/>
			</Link>
		</div>
	)
}
