'use client'

import { useState } from 'react'
import { ICity, cn } from '@workify/shared'
import CitiesModal from './filters/cities-modal'
import { useCreateEditVacancy } from '@/contexts/create-edit-vacancy'

interface VacancyCityButtonProps {
	className?: string
}

export default function VacancyCityButton({
	className,
}: VacancyCityButtonProps) {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
	const { vacancy, setVacancy } = useCreateEditVacancy()

	const handleClickCity = (city: ICity) => {
		setVacancy({ ...vacancy, city })
		setIsModalVisible(false)
	}

	return (
		<div className='relative'>
			<button
				className={cn(className)}
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				{vacancy.city?.name ?? 'выбрать'}
			</button>
			<CitiesModal
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
				handleClickCity={handleClickCity}
				activeCity={vacancy.city?.name ?? null}
			/>
		</div>
	)
}
