import axios, { AxiosError } from 'axios'
import { AuthSection } from './AuthModalContent'
import { AuthFormInput, AuthFormPasswordInput, Button } from '@workify/ui'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IRegFields, regValidation } from '@/lib/utils/validation'

interface RegSectionProps {
	setActiveSection: (section: AuthSection) => void
}

export function RegSection({ setActiveSection }: RegSectionProps) {
	const router = useRouter()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const fields: IRegFields = {
			login: formData.get('login')?.toString() ?? '',
			email: formData.get('email')?.toString() ?? '',
			password: formData.get('password')?.toString() ?? '',
			rePassword: formData.get('re-password')?.toString() ?? '',
		}

		const isValid = regValidation(fields)
		if (!isValid) return

		try {
			await axios.post(`${process.env.API_URL}/auth/register`, {
				login: fields.login,
				email: fields.email,
				password: fields.password,
				rePassword: fields.rePassword,
			})
		} catch (e) {
			if (e instanceof AxiosError) {
				toast.error(e.response?.data.message)
			}
			return
		}

		console.log(fields);
		

		const data = await signIn('credentials', {
			username: fields.login,
			password: fields.password,
			redirect: false,
		})

		if (data?.ok) {
			toast.success('Вход выполнен')
			router.push('/vacancy')
		} else {
			toast.error('Что-то пошло не так')
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
