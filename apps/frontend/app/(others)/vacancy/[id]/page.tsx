import LocationIcon from '@/app/ui/icons/LocationIcon'
import { Button } from '@workify/ui'
import Image from 'next/image'
import Link from 'next/link'
import tattoo from '@/public/images/tattoo-vacancy.png'
import VacancyGeneralInfo from '@/components/vacancy/vacancy-general-info'
import { vacancyMockInfo } from '@/components/vacancy/vacancy'

export default function Page({ params }: { params: { id: string } }) {
	const isOwner = true
	const vacancyInfo = vacancyMockInfo

	return (
		<div className='w-[94%] foreground pt-[1.625rem] pb-10 flex flex-col items-center rounded-[0.625rem]'>
			<VacancyGeneralInfo {...vacancyInfo} />

			{!vacancyInfo.isLocationHidden && (
				<div className='w-full h-[1.5625rem] flex items-center mb-[2.0625rem]'>
					<hr className='flex-1 border-t border-t-white rounded-full' />
					<div className='flex items-center mx-8'>
						<LocationIcon className='mr-[0.8125rem]' />
						<p className='font-light text-[0.9375rem] leading-[1.125rem]'>
							{vacancyInfo.location}
						</p>
					</div>
					<hr className='flex-1 border-t border-t-white rounded-full' />
				</div>
			)}

			<div className='w-[55.3125rem] mb-[2.8125rem] flex flex-wrap gap-[1.875rem]'>
				{vacancyInfo.photos.map((_, index) => (
					<Image
						key={index}
						src={tattoo}
						alt='tattoo-img'
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
