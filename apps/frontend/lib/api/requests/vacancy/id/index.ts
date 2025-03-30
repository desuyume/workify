import authApiInstance, { apiInstance } from '@/lib/api/instance'
import { IFetchedVacancy, IVacancy } from '@workify/shared'

interface GetByIdParam {
  id: number
}

type GetByIdConfig = RequestConfig<GetByIdParam>

export const getVacancyById = ({ params, config }: GetByIdConfig) =>
  apiInstance.get<IFetchedVacancy>(`/vacancy/getOne/${params.id}`, config)

interface UpdateVacancyParam {
  id: number
  data: FormData
}

type UpdateVacancyConfig = RequestConfig<UpdateVacancyParam>

export const updateVacancy = ({ params, config }: UpdateVacancyConfig) =>
  authApiInstance.patch<
    any,
    {
      data: IVacancy
    }
  >(`/vacancy/${params.id}`, params.data, config)

interface DeleteVacancyParam {
  id: number
}

type DeleteVacancyConfig = RequestConfig<DeleteVacancyParam>

export const deleteVacancy = ({ params, config }: DeleteVacancyConfig) =>
  authApiInstance.delete<
    any,
    {
      data: IVacancy
    }
  >(`/vacancy/${params.id}`, config)
