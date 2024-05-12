import React from 'react'

import { VacancyFiltersContext } from './VacancyFiltersContext'

export const useVacancyFilters = () => React.useContext(VacancyFiltersContext)
