import Image from 'next/image'
import profileImg from '@/public/images/profile-img.png'
import tattooImg from '@/public/images/tatto.png'
import Stars from '@/app/ui/stars'
import { IVacancy, cn, formatMoney } from '@workify/shared'
import Link from 'next/link'
import parse from 'html-react-parser'

interface VacancyProps {
	inProfile?: boolean
}

export const vacancyMockInfo: IVacancy = {
	id: 1,
	title: 'Тату-мастер',
	category: { id: 1, title: 'Татуировки' },
	description: `Привет! Я тату-мастер с опытом работы в индустрии татуировок более 3  лет. Моя страсть к искусству и творчеству позволяет мне создавать уникальные и индивидуальные дизайны, которые выражают личность и жизненные ценности каждого клиента. Моя цель - не просто нанести татуировку, а создать произведение искусства, которое будет радовать вас на протяжении многих лет. <br/><br/>

Мой стиль татуирования разнообразен. Я специализируюсь на черно-белых работах, геометрических дизайнах. Каждая работа для меня - это уникальный проект, который я разрабатываю в тесном взаимодействии с клиентом, учитывая его пожелания и предпочтения. <br/><br/>

Кроме того, я уделяю особое внимание гигиене и безопасности. Все мои инструменты строго соответствуют стандартам безопасности, и я соблюдаю все необходимые процедуры стерилизации. Комфорт и безопасность моих клиентов - моя главная приоритет. <br/><br/>

Если вы ищете татуировщика, который сможет воплотить ваши идеи в жизнь с мастерством и тщательностью, обращайтесь ко мне. Я всегда готов воплотить ваши тату-идеи в реальность и создать для вас неповторимое произведение искусства.`,
	rating: 4,
	price: 10000,
	city: {
		name: 'Калининград',
		subject: 'Калининградская область',
		population: 30000,
	},
	isLocationHidden: false,
	isVacancyHidden: false,
	cover: 'gfdgdfg',
	photos: [
		{ id: 1, url: 'gfdgfdgdfg' },
		{ id: 2, url: 'gfdgfdgdfg' },
		{ id: 3, url: 'gfdgfdgdfg' },
		{ id: 4, url: 'gfdgfdgdfg' },
	],
}

export default function Vacancy({ inProfile = false }: VacancyProps) {
	return (
		<div
			className={cn('w-full rounded-[0.3125rem] last-of-type:mb-0', {
				'bg-primary-dark h-[18.25rem] pt-[1.5625rem] pl-[3.8125rem] pb-6 pr-[3.9375rem] mb-[1.1875rem]':
					inProfile,
				'foreground flex items-center border-white border-t border-l h-[16.5rem] p-[0.625rem] mb-[1.5625rem]':
					!inProfile,
			})}
		>
			{!inProfile && (
				<Image
					src={profileImg}
					alt='profile-img'
					width={201}
					height={244}
					className='rounded-tl-[0.3125rem] rounded-b-[0.3125rem] rounded-tr-[5rem] mr-[1.875rem]'
				/>
			)}

			<div className='w-full h-full flex flex-col'>
				<div className='w-full h-[1.5625rem] flex items-center pr-[0.9375rem] mb-[1.0625rem]'>
					<p className='text-xl font-santello'>{vacancyMockInfo.title}</p>
					<hr className='w-[5.3125rem] border-t border-t-white rounded-full mx-[0.625rem] mt-[0.125rem]' />
					<Stars rating={3} />
					<hr className='flex-1 border-t border-t-white rounded-full mx-[0.625rem] mt-[0.125rem]' />
					<p className='text-xl font-light text-right'>
						{vacancyMockInfo.category?.title.toLowerCase()}
					</p>
				</div>

				<div className='w-full flex-1 flex'>
					<div
						className={cn('h-full flex flex-col justify-between flex-1', {
							'pt-[0.8125rem]': inProfile,
							'pt-[0.6875rem]': !inProfile,
						})}
					>
						<p
							className={cn(
								'text-[0.9375rem] leading-[1.1328125rem] font-light text-opacity-70 max-w-[35.875rem] line-clamp-[8]',
								{
									'ml-[8.0625rem]': inProfile,
									'ml-[6.0625rem]': !inProfile,
								}
							)}
						>
							{parse(vacancyMockInfo.description)}
						</p>
						<div
							className={cn(
								'w-full h-[1.125rem] flex items-center pl-[0.1875rem]',
								{
									'pr-[7.8125rem]': inProfile,
									'pr-[0.625rem]': !inProfile,
								}
							)}
						>
							<p className='text-[0.9375rem] font-medium underline skip-ink-none'>
								От {formatMoney(vacancyMockInfo.price)} ₽
							</p>
							<hr className='flex-1 border-t border-t-white rounded-full mx-[0.625rem] mt-[0.125rem]' />
							<Link
								href='/vacancy/1'
								className='text-[0.9375rem] font-medium underline skip-ink-none'
							>
								больше
							</Link>
						</div>
					</div>
					<Image
						src={tattooImg}
						alt='tattoo'
						width={157}
						height={201}
						className='rounded-[0.3125rem]'
					/>
				</div>
			</div>
		</div>
	)
}
