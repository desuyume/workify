import authApiInstance, { apiInstance } from '@/lib/api/instance'
import { IFeedbackWithExecutor } from '@workify/shared'

interface GetFeedbackByIdParam {
	id: string
}

type GetFeedbackByIdConfig = RequestConfig<GetFeedbackByIdParam>

export const getFeedbackById = ({ params, config }: GetFeedbackByIdConfig) =>
	apiInstance.get<IFeedbackWithExecutor>(`/feedback/${params.id}`, config)

interface DeleteFeedbackParam {
	id: string
}

type DeleteFeedbackConfig = RequestConfig<DeleteFeedbackParam>

export const deleteFeedback = ({ params, config }: DeleteFeedbackConfig) =>
	authApiInstance.delete<any, { data: IFeedbackWithExecutor }>(
		`/feedback/${params.id}`,
		config
	)
