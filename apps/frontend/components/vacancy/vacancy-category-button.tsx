'use client'

import { useState } from 'react'
import VacancyCategories from './vacancy-categories'
import { cn } from '@workify/shared'

interface VacancyCategoryButtonProps {
	value?: string
	className?: string
}

export default function VacancyCategoryButton({
	value,
	className,
}: VacancyCategoryButtonProps) {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	return (
		<div className='relative'>
			<button
				className={cn(className)}
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				{value ?? 'выбрать'}
			</button>
			<VacancyCategories
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
			/>
		</div>
	)
}
