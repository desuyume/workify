import React from 'react'

import { CreateEditVacancyContext } from './CreateEditVacancyContext'

export const useCreateEditVacancy = () =>
	React.useContext(CreateEditVacancyContext)
