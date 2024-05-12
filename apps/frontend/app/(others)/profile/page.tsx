import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getUsersId } from '@/lib/api'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import profileImg from '@/public/images/profile-img.png'
import ProfileInfo from '@/components/profile/profile-info'
import { Button, NavButton } from '@workify/ui'
import VacancyFeedback from '@/components/profile/vacancy-feedback'

export default async function Page() {
	// const session = await getServerSession(authOptions)

	// if (!session?.user.id)
	// 	return (
	// 		<div className='flex-1 h-screen flex justify-center items-center'>
	// 			<Link
	// 				href='/'
	// 				className='bg-primary-light px-10 py-4 text-primary-dark font-semibold rounded-[1.5rem]'
	// 			>
	// 				Войти
	// 			</Link>
	// 		</div>
	// 	)

	// const profile = await getUsersId({
	// 	params: { id: session.user.id },
	// })

	return (
		<div className='w-full pr-[6.375rem] flex flex-col items-center'>
			<div className='w-full foreground pt-8 pb-10 rounded-t-[0.625rem] border-t-primary-light border-t'>
				<Image
					alt='profile-img'
					src={profileImg}
					width={231}
					height={283}
					className='rounded-[10.71875rem] mx-auto'
				/>
			</div>

			<div className='w-full h-[8.75rem] bg-primary-dark flex justify-center items-center'>
				<ProfileInfo title='Имя' value='Даниил Соколов' />
				<ProfileInfo title='Возраст' value='21 год (17.08.2002)' />
				<ProfileInfo title='Специализация' value='Тату-мастер' />
				<ProfileInfo title='Телефон' value='8 906 267 91 99' />
			</div>

			<div className='w-full foreground flex flex-col items-center pt-10 pb-[1.875rem] mb-[3.125rem] rounded-b-[0.625rem]'>
				<div className='w-[60.6875rem] mb-10'>
					<p className='font-medium text-[1.25rem] leading-[1.5rem] mb-[1.1875rem]'>
						Описание
					</p>
					<p className='font-light text-[1.125rem] leading-[1.375rem]'>
						Привет! Я тату-мастер с опытом работы в индустрии татуировок более 3
						лет. Моя страсть к искусству и творчеству позволяет мне создавать
						уникальные и индивидуальные дизайны, которые выражают личность и
						жизненные ценности каждого клиента. Моя цель - не просто нанести
						татуировку, а создать произведение искусства, которое будет радовать
						вас на протяжении многих лет.
						<br />
						<br />
						Каждая работа для меня - это уникальный проект, который я
						разрабатываю в тесном взаимодействии с клиентом, учитывая его
						пожелания и предпочтения.
						<br />
						<br />
						Если вы ищете татуировщика, который сможет воплотить ваши идеи в
						жизнь с мастерством и тщательностью, обращайтесь ко мне. Я всегда
						готов воплотить ваши тату-идеи в реальность и создать для вас
						произведение искусства.
					</p>
				</div>
				<div className='w-full h-9 flex items-center'>
					<hr className='flex-1 border-t border-t-white rounded-full' />
					<Button
						title='Связаться'
						variant='light-transparent'
						className='mx-[2.1875rem]'
						width='11.0625rem'
						height='100%'
					/>
					<hr className='w-[17.3125rem] border-t border-t-white rounded-full' />
				</div>
			</div>

			<VacancyFeedback />
		</div>
	)
}
