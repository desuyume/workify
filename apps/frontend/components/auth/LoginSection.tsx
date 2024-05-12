import { signIn } from 'next-auth/react'
import { AuthSection } from './AuthModalContent'
import { AuthFormInput, AuthFormPasswordInput, Button } from '@workify/ui'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface LoginSectionProps {
	setActiveSection: (section: AuthSection) => void
}

export function LoginSection({ setActiveSection }: LoginSectionProps) {
	const router = useRouter()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const data = await signIn('credentials', {
			username: formData.get('username'),
			password: formData.get('password'),
			redirect: false,
		})

		if (data?.ok) {
			toast.success('Вход выполнен')
			router.push('/')
		} else {
			if (data?.error === 'CredentialsSignin') {
				toast.error('Неверная почта или пароль')
			} else {
				toast.error('Что-то пошло не так')
			}
		}
	}

	return (
		<form onSubmit={onSubmit} className='flex flex-col items-center'>
			<AuthFormInput
				name='username'
				placeholder='Логин / Почта'
				className='mb-[0.625rem]'
			/>
			<AuthFormPasswordInput
				name='password'
				placeholder='Пароль'
				type='password'
				className='mb-[2.5rem]'
			/>
			<Button
				title='Войти'
				variant='dark'
				width='9.8125rem'
				height='2.5rem'
				borderRadius='1.6875rem'
				fontSize='1rem'
				fontWeight='600'
				className='mb-[1.5625rem]'
				type='submit'
			/>
			<button
				onClick={() => setActiveSection('reg')}
				className='text-[1rem] leading-5 text-primary-dark'
			>
				Еще не зарегестрированы?
			</button>
		</form>
	)
}
