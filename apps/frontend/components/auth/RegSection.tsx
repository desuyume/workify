import axios, { AxiosError } from 'axios'
import { AuthSection } from './AuthModalContent'
import { AuthFormInput, AuthFormPasswordInput, Button } from '@workify/ui'
import { toast } from 'sonner'
import { regsiterSchema } from '@/lib/constants'

interface RegSectionProps {
	setActiveSection: (section: AuthSection) => void
}

export function RegSection({ setActiveSection }: RegSectionProps) {
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const validatedFields = regsiterSchema.safeParse({
			login: formData.get('login'),
			email: formData.get('email'),
			password: formData.get('password'),
			rePassword: formData.get('re-password'),
		})

		if (!validatedFields.success) {
			toast.error('Заполните все поля')
			console.log({
				errors: validatedFields.error.flatten().fieldErrors,
				message: 'Заполните все поля',
			})
			return
		}

		const { login, email, password, rePassword } = validatedFields.data

		try {
			await axios.post(`${process.env.API_URL}/auth/register`, {
				login,
				email,
				password,
				rePassword,
			})
		} catch (e) {
			if (e instanceof AxiosError) {
				toast.error(e.response?.data.message)
			}
		}
	}

	return (
		<form onSubmit={onSubmit} className='flex flex-col items-center'>
			<AuthFormInput
				name='login'
				placeholder='Логин'
				className='mb-[0.625rem]'
			/>
			<AuthFormInput
				name='email'
				placeholder='Электронная почта'
				type='email'
				className='mb-[0.625rem]'
			/>
			<AuthFormPasswordInput
				name='password'
				placeholder='Пароль'
				className='mb-[0.625rem]'
				type='password'
			/>
			<AuthFormPasswordInput
				name='re-password'
				placeholder='Повторите пароль'
				className='mb-[2.5rem]'
				type='password'
			/>
			<Button
				title='Присоединиться'
				variant='dark'
				width='14.1875rem'
				height='2.5rem'
				borderRadius='1.6875rem'
				fontSize='1rem'
				fontWeight='600'
				className='mb-[1.5625rem]'
			/>
			<button
				onClick={() => setActiveSection('login')}
				className='text-[1rem] leading-5 text-primary-dark'
			>
				Уже есть аккаунт?
			</button>
		</form>
	)
}
