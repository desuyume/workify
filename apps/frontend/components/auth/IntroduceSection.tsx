import { AuthSection } from './AuthModalContent'
import { Button } from '@workify/ui'

interface IntroduceSectionProps {
	setActiveSection: (section: AuthSection) => void
}

export function IntroduceSection({ setActiveSection }: IntroduceSectionProps) {
	return (
		<>
			<div className='w-[16.5625rem] flex flex-col items-center mb-[3.4375rem]'>
				<p className='text-[1.12rem] text-primary-dark mb-[0.9375rem]'>
					Уже есть аккаунт?
				</p>
				<Button
					title='Авторизация'
					variant='light'
					width='16.5625rem'
					height='2.75rem'
					fontSize='1.25rem'
					fontWeight='600'
					borderRadius='1.6875rem'
					onClick={() => setActiveSection('login')}
				/>
			</div>

			<div className='w-[16.5625rem] flex flex-col items-center'>
				<p className='text-[1.12rem] text-primary-dark mb-[0.9375rem]'>
					Еще не зарегестрированы?
				</p>
				<Button
					title='Регистрация'
					variant='dark'
					width='16.5625rem'
					height='2.75rem'
					fontSize='1.25rem'
					fontWeight='600'
					borderRadius='1.6875rem'
					onClick={() => setActiveSection('reg')}
				/>
			</div>
		</>
	)
}
