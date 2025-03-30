'use client'

import React from 'react'

export interface VacancyFilters {
  categories: number[]
  cost: {
    from?: string
    to?: string
  }
  worksAmount: string | null
  city: string | null
}

export interface VacancyFiltersContextProps {
  vacancyFilters: VacancyFilters
  setVacancyFilters: (value: VacancyFilters) => void
}

export const VacancyFiltersContext = React.createContext<VacancyFiltersContextProps>({
  vacancyFilters: {
    categories: [],
    cost: {},
    worksAmount: null,
    city: null
  },
  setVacancyFilters: () => {}
})
