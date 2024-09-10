import authApiInstance from '@/lib/api/instance'
import { IFeedbackWithExecutor } from '@workify/shared'

interface GetCreatedFeedbackParam {
	vacancyId: number
}

type GetCreatedFeedbackConfig = RequestConfig<GetCreatedFeedbackParam>

export const getCreatedFeedback = ({ params, config }: GetCreatedFeedbackConfig) =>
	authApiInstance.get<IFeedbackWithExecutor>(`/feedback/created/${params.vacancyId}`, config)
