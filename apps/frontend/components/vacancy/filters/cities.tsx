'use client'

import { useVacancyFilters } from '@/contexts/vacancy-filters'
import { getCities } from '@/lib/api/requests/cities'
import { ICity, cn } from '@workify/shared'
import { Button } from '@workify/ui'
import { useEffect, useState } from 'react'
import CitiesModal from './cities-modal'

export default function Cities() {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [fourCities, setFourCities] = useState<ICity[]>([])

	const { vacancyFilters, setVacancyFilters } = useVacancyFilters()

	const handleClickCity = (city: string) => {
		const isActive = vacancyFilters.city === city

		if (isActive) {
			setVacancyFilters({ ...vacancyFilters, city: '' })
		} else {
			setVacancyFilters({ ...vacancyFilters, city })
		}
	}

	const handleClickCityModal = (city: ICity) => {
		setVacancyFilters({ ...vacancyFilters, city: city.name })
		setIsModalVisible(false)
	}

	useEffect(() => {
		getCities({ params: { searchParams: { limit: 4 } } })
			.then(res => setFourCities(res.data))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div>
			<p className='text-[0.9375rem] leading-[1.125rem] mb-2.5'>Город</p>
			<div className='h-[8.1875rem] pl-[0.3125rem] flex flex-col justify-between mb-[0.9375rem]'>
				{isLoading && (
					<div className='w-full h-full flex items-center pl-8'>
						<p className='font-medium text-[0.9375rem] leading-[1.125rem]'>
							Загрузка...
						</p>
					</div>
				)}

				{fourCities.map(city => {
					return (
						<div key={city.name} className='flex items-center'>
							<button
								onClick={() => handleClickCity(city.name)}
								className={cn(
									'size-[1.3125rem] bg-primary-light border-[0.3125rem] border-primary-light rounded-[0.4375rem] mr-[0.6875rem] transition-colors',
									{
										'border-[#A5C585]': city.name === vacancyFilters.city,
									}
								)}
							/>
							<p className='font-medium text-[0.9375rem] leading-[1.125rem]'>
								{city.name}
							</p>
						</div>
					)
				})}
			</div>

			<Button
				title={vacancyFilters.city ? vacancyFilters.city : 'Выбрать город'}
				variant='light-transparent'
				width='14.1875rem'
				height='1.5625rem'
				className='font-medium text-[0.9375rem] ml-[0.3125rem]'
				onClick={() => setIsModalVisible(true)}
			/>
			<CitiesModal
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
				handleClickCity={handleClickCityModal}
				activeCity={vacancyFilters.city}
			/>
		</div>
	)
}
