import authApiInstance, { apiInstance } from '@/lib/api/instance'
import { IVacancy } from '@workify/shared'

interface GetAllVacancyParam {
	searchParams?: string
}

type GetAllVacancyConfig = RequestConfig<GetAllVacancyParam>

export const getAllVacancy = ({ params, config }: GetAllVacancyConfig) =>
	apiInstance.get<IVacancy[]>(
		`/vacancy${params.searchParams && `?${params.searchParams}`}`,
		config
	)

interface CreateVacancyParam {
	data: FormData
}

type CreateVacancyConfig = RequestConfig<CreateVacancyParam>

export const createVacancy = ({ params, config }: CreateVacancyConfig) => {
	return authApiInstance.post<any, { data: IVacancy }>(
		`/vacancy`,
		params.data,
		config
	)
}
