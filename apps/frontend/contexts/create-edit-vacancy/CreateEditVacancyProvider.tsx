'use client'

import React, { useMemo } from 'react'
import {
	CreateEditVacancy,
	CreateEditVacancyContext,
} from './CreateEditVacancyContext'
import { VacancyRating } from '@workify/shared'

export interface CreateEditVacancyProviderProps {
	children: React.ReactNode
}

export const CreateEditVacancyProvider: React.FC<
	CreateEditVacancyProviderProps
> = ({ children }) => {
	const [vacancy, setVacancy] = React.useState<CreateEditVacancy>({
		title: '',
		description: '',
		rating: VacancyRating.zero,
		category: null,
		price: null,
		cover: null,
		photos: [],
		city: null,
		isLocationHidden: false,
		isVacancyHidden: false,
	})

	const value = useMemo(
		() => ({
			vacancy,
			setVacancy,
		}),
		[vacancy]
	)

	return (
		<CreateEditVacancyContext.Provider value={value}>
			{children}
		</CreateEditVacancyContext.Provider>
	)
}
