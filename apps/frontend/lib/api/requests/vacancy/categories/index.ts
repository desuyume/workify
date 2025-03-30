import { apiInstance } from '@/lib/api/instance'
import { IVacancyCategory } from '@workify/shared'

interface GetVacancyCategoriesParam {}

type GetVacancyCategoriesConfig = RequestConfig<GetVacancyCategoriesParam>

export const getAllVacancyCategories = ({ params, config }: GetVacancyCategoriesConfig) =>
  apiInstance.get<IVacancyCategory[]>('/vacancy/categories', config)
