import Image from 'next/image'
import ProfileInfo from '@/components/profile/profile-info'
import { Button } from '@workify/ui'
import VacancyFeedback from '@/components/profile/vacancy-feedback'
import htmlParse from 'html-react-parser'
import defaultProfilePic from '@/public/images/default-profile-pic.webp'
import { IUser } from '@workify/shared'
import { IUserProfile } from '@/contexts/profile'

interface ProfileContentProps {
	user: IUser | IUserProfile
}

export default function ProfileContent({ user }: ProfileContentProps) {
	return (
		<div className='w-full flex flex-col items-center'>
			<div className='w-full foreground pt-8 pb-10 rounded-t-[0.625rem] border-t-primary-light border-t'>
				{user?.avatar ? (
					<Image
						alt='profile-img'
						src={
							!!user.avatar.includes('blob')
								? user.avatar
								: `${process.env.SERVER_URL}/${user.avatar}`
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
				<ProfileInfo title='Имя' value={user?.name ?? null} />
				<ProfileInfo
					title='Возраст'
					value={
						user.birthday
							? new Date(user?.birthday).toISOString().split('T')[0]
							: null
					}
				/>
				<ProfileInfo
					title='Специализация'
					value={user?.specialisation ?? null}
				/>
				<ProfileInfo title='Телефон' value={user?.phone ?? null} />
			</div>

			<div className='w-full foreground flex flex-col items-center pt-10 pb-[1.875rem] mb-[3.125rem] rounded-b-[0.625rem]'>
				{user?.description && (
					<div className='w-[60.6875rem] mb-10'>
						<p className='font-medium text-[1.25rem] leading-[1.5rem] mb-[1.1875rem]'>
							Описание
						</p>
						<p className='font-light text-[1.125rem] leading-[1.375rem]'>
							{htmlParse(user.description)}
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

			<VacancyFeedback vacancies={user.vacancies} />
		</div>
	)
}
