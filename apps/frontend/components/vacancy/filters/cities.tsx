'use client'

import { useVacancyFilters } from '@/contexts/vacancy-filters'
import { cn } from '@workify/shared'
import { Button } from '@workify/ui'

export default function Cities() {
	const cities = ['Калининград', 'Москва', 'Санкт-Петербург', 'Новосибирск']

	const { vacancyFilters, setVacancyFilters } = useVacancyFilters()

	const handleClickAmount = (city: string) => {
		const isActive = vacancyFilters.city === city

		if (isActive) {
			setVacancyFilters({ ...vacancyFilters, city: '' })
		} else {
			setVacancyFilters({ ...vacancyFilters, city })
		}
	}

	return (
		<div>
			<p className='text-[0.9375rem] leading-[1.125rem] mb-2.5'>Город</p>
			<div className='h-[8.1875rem] pl-[0.3125rem] flex flex-col justify-between mb-[0.9375rem]'>
				{cities.map(city => {
					return (
						<div key={city} className='flex items-center'>
							<button
								onClick={() => handleClickAmount(city)}
								className={cn(
									'size-[1.3125rem] bg-primary-light border-[0.3125rem] border-primary-light rounded-[0.4375rem] mr-[0.6875rem] transition-colors',
									{
										'border-[#A5C585]': city === vacancyFilters.city,
									}
								)}
							/>
							<p className='font-medium text-[0.9375rem] leading-[1.125rem]'>
								{city}
							</p>
						</div>
					)
				})}
			</div>
			<Button
				title='Выбрать город'
				variant='light-transparent'
				width='14.1875rem'
				height='1.5625rem'
				className='font-medium text-[0.9375rem] ml-[0.3125rem]'
			/>
		</div>
	)
}
