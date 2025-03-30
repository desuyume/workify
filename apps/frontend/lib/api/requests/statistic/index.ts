import { IStatistic } from '@workify/shared'
import { apiInstance } from '../../instance'

interface GetStatisticParam {}

type GetStatisticConfig = RequestConfig<GetStatisticParam>

export const getStatistic = ({ params, config }: GetStatisticConfig) => {
  return apiInstance.get<IStatistic>(`/statistic`, config)
}
