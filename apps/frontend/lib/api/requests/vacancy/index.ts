import authApiInstance, { apiInstance } from '@/lib/api/instance'
import { generateQueryString } from '@/lib/utils'
import { IUserVacancy, IVacancy, IVacancyQuery } from '@workify/shared'

interface GetAllVacancyParam {
  query?: IVacancyQuery
}

type GetAllVacancyConfig = RequestConfig<GetAllVacancyParam>

export const getAllVacancy = ({ params, config }: GetAllVacancyConfig) => {
  const queryString = generateQueryString(params.query)
  return apiInstance.get<{
    vacancies: IUserVacancy[]
    totalPages: number
  }>(`/vacancy${queryString}`, config)
}

interface CreateVacancyParam {
  data: FormData
}

type CreateVacancyConfig = RequestConfig<CreateVacancyParam>

export const createVacancy = ({ params, config }: CreateVacancyConfig) => {
  return authApiInstance.post<
    any,
    {
      data: IVacancy
    }
  >(`/vacancy`, params.data, config)
}
