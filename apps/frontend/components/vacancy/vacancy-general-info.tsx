import Stars from '@/app/ui/stars'
import { VacancyRating } from '@workify/shared'
import parse from 'html-react-parser'

interface VacancyGeneralInfoProps {
	title: string
	rating: VacancyRating
	description: string
	category: string
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
				<div className='flex'>
					<div className='w-[10.9375rem] h-full foreground rounded-[0.3125rem] flex justify-center items-center mr-[5.9375rem]'>
						<p className='font-santello text-xl text-primary-light text-center px-2'>
							{title}
						</p>
					</div>
					<div className='w-[10.9375rem] h-full foreground rounded-[0.3125rem] flex justify-center items-center'>
						<Stars rating={rating} />
					</div>
				</div>

				<div className='w-[10.9375rem] h-full foreground rounded-[0.3125rem] flex justify-center items-center self-end'>
					<p className='font-montserrat font-light text-xl text-primary-light'>
						{category.toLowerCase()}
					</p>
				</div>
			</div>

			<div className='w-full flex-1 overflow-y-auto foreground rounded-[0.3125rem] py-5 px-7'>
				<p className='font-light text-[0.9375rem] leading-[1.125rem]'>
					{parse(description)}
				</p>
			</div>
		</div>
	)
}
