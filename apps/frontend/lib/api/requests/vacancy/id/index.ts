import { apiInstance } from '@/lib/api/instance'
import { IFetchedVacancy } from '@workify/shared'

interface GetByIdParam {
	id: string
}

type GetByIdConfig = RequestConfig<GetByIdParam>

export const getVacancyById = ({ params, config }: GetByIdConfig) =>
	apiInstance.get<IFetchedVacancy>(`/vacancy/getOne/${params.id}`, config)
