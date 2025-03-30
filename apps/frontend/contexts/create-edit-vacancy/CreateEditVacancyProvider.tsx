'use client'

import React, { useMemo } from 'react'
import { CreateEditVacancy, CreateEditVacancyContext } from './CreateEditVacancyContext'

export interface CreateEditVacancyProviderProps {
  children: React.ReactNode
}

export const CreateEditVacancyProvider: React.FC<CreateEditVacancyProviderProps> = ({
  children
}) => {
  const [vacancy, setVacancy] = React.useState<CreateEditVacancy>({
    title: '',
    description: '',
    category: null,
    price: null,
    cover: null,
    photos: [],
    city: null,
    isLocationHidden: false,
    isVacancyHidden: false,
    rating: 0
  })

  const value = useMemo(
    () => ({
      vacancy,
      setVacancy
    }),
    [vacancy]
  )

  return (
    <CreateEditVacancyContext.Provider value={value}>{children}</CreateEditVacancyContext.Provider>
  )
}
