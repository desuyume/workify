'use client'

import React, { useMemo } from 'react'
import { VacancyFilters, VacancyFiltersContext } from './VacancyFiltersContext'

export interface VacancyFiltersProviderProps {
	children: React.ReactNode
}

export const VacancyFiltersProvider: React.FC<VacancyFiltersProviderProps> = ({
	children,
}) => {
	const [vacancyFilters, setVacancyFilters] = React.useState<VacancyFilters>({
		categories: [],
		cost: {},
		worksAmount: null,
		city: null,
	})

	const value = useMemo(
		() => ({
			vacancyFilters,
			setVacancyFilters,
		}),
		[vacancyFilters]
	)

	return (
		<VacancyFiltersContext.Provider value={value}>
			{children}
		</VacancyFiltersContext.Provider>
	)
}
