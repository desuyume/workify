import { apiInstance } from '@/lib/api/instance'
import { generateQueryString } from '@/lib/utils'
import { ICity } from '@workify/shared'

interface GetCitiesParam {
  searchParams: {
    limit?: number
    search?: string
  }
}

type GetCitiesConfig = RequestConfig<GetCitiesParam>

export const getCities = ({ params, config }: GetCitiesConfig) => {
  return apiInstance.get<ICity[]>(`/cities${generateQueryString(params.searchParams)}`, config)
}
