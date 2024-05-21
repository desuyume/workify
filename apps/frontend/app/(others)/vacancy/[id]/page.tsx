import LocationIcon from '@/app/ui/icons/LocationIcon'
import { Button } from '@workify/ui'
import Image from 'next/image'
import Link from 'next/link'
import VacancyGeneralInfo from '@/components/vacancy/vacancy-general-info'
import { getVacancyById } from '@/lib/api/requests/vacancy/id'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export default async function Page({ params }: { params: { id: string } }) {
	const session = await getServerSession(authOptions)
	const vacancy = await getVacancyById({ params })

	if (!vacancy.data)
		return (
			<div className='w-full h-full flex flex-col justify-center items-center'>
				<p className='text-xl font-medium mb-4'>Анкета не найдена</p>
				<Link href={'/vacancy'}>
					<Button
						title='К анкетам'
						variant='light-transparent'
						width='12rem'
						height='3rem'
					/>
				</Link>
			</div>
		)

	const isOwner = session?.user.id === vacancy.data.user.id

	return (
		<div className='w-full foreground pt-[1.625rem] pb-10 flex flex-col items-center rounded-[0.625rem]'>
			<VacancyGeneralInfo {...vacancy.data} />

			{!vacancy.data.isLocationHidden && vacancy.data.city && (
				<div className='w-full h-[1.5625rem] flex items-center mb-[2.0625rem]'>
					<hr className='flex-1 border-t border-t-white rounded-full' />
					<div className='flex items-center mx-8'>
						<LocationIcon className='mr-[0.8125rem]' />
						<p className='font-light text-[0.9375rem] leading-[1.125rem]'>
							г. {vacancy.data.city.name}
						</p>
					</div>
					<hr className='flex-1 border-t border-t-white rounded-full' />
				</div>
			)}

			<div className='w-[55.3125rem] mb-[2.8125rem] flex flex-wrap gap-[1.875rem]'>
				{vacancy.data.photos.map(vacancy => (
					<Image
						key={vacancy.id}
						src={`${process.env.SERVER_URL}/${vacancy.url}`}
						alt='vacancy-photo'
						width={275}
						height={348}
						className='rounded-[0.3125rem]'
					/>
				))}
			</div>

			<div className='w-full h-9 flex items-center'>
				<hr className='flex-1 border-t border-t-white rounded-full' />
				<Link
					href={isOwner ? `${params.id}/edit` : '/profile'}
					className='mx-10 h-full'
				>
					<Button
						title={isOwner ? 'Изменить анкету' : 'Перейти в профиль'}
						variant='light-transparent'
						width='15.9375rem'
						height='100%'
					/>
				</Link>
				<hr className='flex-1 border-t border-t-white rounded-full' />
			</div>
		</div>
	)
}
