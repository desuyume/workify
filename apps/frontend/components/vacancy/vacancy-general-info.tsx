import Stars from '@/app/ui/stars'
import { IVacancyCategory, Rating } from '@workify/shared'

interface VacancyGeneralInfoProps {
	title: string
	rating: number
	description: string
	category: IVacancyCategory | null
}

export default function VacancyGeneralInfo({
	title,
	rating,
	description,
	category,
}: VacancyGeneralInfoProps) {
	return (
		<div className='w-[60.9375rem] h-[27.375rem] p-5 bg-primary-dark rounded-[0.625rem] flex flex-col mb-8'>
			<div className='w-full h-10 flex justify-between mb-[1.875rem]'>
				<div className='max-w-[20rem] truncate h-full foreground rounded-[0.3125rem] flex justify-center items-center'>
					<p className='font-santello text-xl text-primary-light text-center px-4 truncate'>
						{title}
					</p>
				</div>
				<div className='w-[10.9375rem] h-full foreground rounded-[0.3125rem] flex justify-center items-center'>
					<Stars rating={Math.round(rating)} />
				</div>

				{!!category && (
					<div className='h-full foreground rounded-[0.3125rem] flex justify-center items-center self-end'>
						<p className='font-montserrat font-light text-xl text-primary-light px-4 text-center leading-none'>
							{category?.title.toLowerCase()}
						</p>
					</div>
				)}
			</div>

			<div className='w-full flex-1 overflow-y-auto foreground rounded-[0.3125rem] py-5 px-7'>
				<p className='font-light text-[0.9375rem] leading-[1.125rem] whitespace-pre-wrap break-words'>
					{description}
				</p>
			</div>
		</div>
	)
}
