'use client'

import Image from 'next/image'
import ProfileInfo from '@/components/profile/profile-info'
import { Button } from '@workify/ui'
import VacancyFeedback from '@/components/profile/vacancy-feedback'
import htmlParse from 'html-react-parser'
import defaultProfilePic from '@/public/images/default-profile-pic.webp'
import { useProfile } from '@/contexts/profile'
import { useSession } from 'next-auth/react'
import Loading from '@/app/ui/loading'
import Unauthorized from '@/app/ui/unauthorized'

export default function Page() {
	const session = useSession()
	const { profile } = useProfile()

	if (session.status === 'loading') {
		return <Loading className='w-full h-full' />
	}

	if (session.status === 'unauthenticated') {
		return <Unauthorized />
	}

	return (
		<div className='w-full flex flex-col items-center'>
			<div className='w-full foreground pt-8 pb-10 rounded-t-[0.625rem] border-t-primary-light border-t'>
				{profile.user?.avatar ? (
					<Image
						alt='profile-img'
						src={
							!!profile.user.avatar.includes('blob')
								? profile.user.avatar
								: `${process.env.SERVER_URL}/${profile.user.avatar}`
						}
						width={231}
						height={283}
						className='w-[231px] h-[283px] object-cover rounded-[10.71875rem] mx-auto'
					/>
				) : (
					<Image
						alt='profile-img'
						src={defaultProfilePic}
						width={231}
						height={283}
						className='w-[231px] h-[283px] object-cover rounded-[10.71875rem] mx-auto'
					/>
				)}
			</div>

			<div className='w-full h-[8.75rem] bg-primary-dark flex justify-center items-center'>
				<ProfileInfo title='Имя' value={profile.user?.name ?? null} />
				<ProfileInfo title='Возраст' value={profile.user?.birthday ?? null} />
				<ProfileInfo
					title='Специализация'
					value={profile.user?.specialisation ?? null}
				/>
				<ProfileInfo title='Телефон' value={profile.user?.phone ?? null} />
			</div>

			<div className='w-full foreground flex flex-col items-center pt-10 pb-[1.875rem] mb-[3.125rem] rounded-b-[0.625rem]'>
				{profile.user?.description && (
					<div className='w-[60.6875rem] mb-10'>
						<p className='font-medium text-[1.25rem] leading-[1.5rem] mb-[1.1875rem]'>
							Описание
						</p>
						<p className='font-light text-[1.125rem] leading-[1.375rem]'>
							{htmlParse(profile.user.description)}
						</p>
					</div>
				)}

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
