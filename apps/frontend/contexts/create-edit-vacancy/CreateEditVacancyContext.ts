'use client'

import { IVacancy, VacancyRating } from '@workify/shared'
import React from 'react'

export interface CreateEditVacancy extends Omit<IVacancy, 'id' | 'price'> {
	price: string | null
}

export interface CreateEditVacancyContextProps {
	vacancy: CreateEditVacancy
	setVacancy: (value: CreateEditVacancy) => void
}

export const CreateEditVacancyContext =
	React.createContext<CreateEditVacancyContextProps>({
		vacancy: {
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
		},
		setVacancy: () => {},
	})
