'use client'

import { IVacancy, Rating } from '@workify/shared'
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
			rating: Rating.zero,
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
