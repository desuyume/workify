import Image from 'next/image'
import ProfileInfo from '@/components/profile/profile-info'
import { Button } from '@workify/ui'
import VacancyFeedback from '@/components/profile/vacancy-feedback'
import defaultProfilePic from '@/public/images/default-profile-pic.webp'
import { IUser, formatDate, getAgeByBirthday } from '@workify/shared'
import { IUserProfile } from '@/contexts/profile'
import Link from 'next/link'
import CommunicationButton from './communication-button'

interface ProfileContentProps {
	user: IUser | IUserProfile
	isByLogin?: boolean
}

export default function ProfileContent({
	user,
	isByLogin,
}: ProfileContentProps) {
	return (
		<div className='w-full flex flex-col items-center'>
			<div className='w-full foreground pt-8 pb-10 rounded-t-[0.625rem] border-t-primary-light border-t relative'>
				{isByLogin && (
					<Link
						href={`/profile/${user?.login}/feedback`}
						className='absolute top-10 left-10'
					>
						<Button
							title='Оставить отзыв'
							variant='light-transparent'
							width='12rem'
							height='3rem'
						/>
					</Link>
				)}

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
							? `${getAgeByBirthday(new Date(user.birthday))} (${formatDate(
									new Date(user.birthday)
								)})`
							: null
					}
				/>
				<ProfileInfo
					title='Специализация'
					value={user?.specialisation ?? null}
				/>
				{/* <ProfileInfo title='Телефон' value={user?.phone ?? null} /> */}
			</div>

			<div className='w-full foreground flex flex-col items-center pt-10 pb-[1.875rem] mb-[3.125rem] rounded-b-[0.625rem]'>
				{user?.description && (
					<div className='w-[60.6875rem] mb-10'>
						<p className='font-medium text-[1.25rem] leading-[1.5rem] mb-[1.1875rem]'>
							Описание
						</p>
						<p className='font-light text-[1.125rem] leading-[1.375rem] whitespace-pre-wrap'>
							{user.description}
						</p>
					</div>
				)}

				<CommunicationButton
					communication={user.communication}
					username={user.name ?? user.login}
					email={user.email}
					phone={user.phone ?? ''}
				/>
			</div>

			<VacancyFeedback vacancies={user.vacancies} userLogin={user.login} />
		</div>
	)
}
