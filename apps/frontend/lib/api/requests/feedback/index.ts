import { FeedbackSortBy, IFeedback, IFeedbackRating } from '@workify/shared'
import authApiInstance, { apiInstance } from '../../instance'
import { generateQueryString } from '@/lib/utils'

interface CreateFeedbackParam {
	executorLogin: string
	data: FormData
}

type CreateFeedbackConfig = RequestConfig<CreateFeedbackParam>

export const createFeedback = ({ params, config }: CreateFeedbackConfig) => {
	return authApiInstance.post<any, { data: IFeedback }>(
		`/feedback/${params.executorLogin}`,
		params.data,
		config
	)
}

interface UpdateFeedbackParam {
	executorLogin: string
	feedbackId: number
	data: FormData
}

type UpdateFeedbackConfig = RequestConfig<UpdateFeedbackParam>

export const updateFeedback = ({ params, config }: UpdateFeedbackConfig) => {
	return authApiInstance.patch<any, { data: IFeedback }>(
		`/feedback/${params.executorLogin}/${params.feedbackId}`,
		params.data,
		config
	)
}

interface GetExecutorFeedbacksParam {
	executorLogin: string
	query: {
		sortBy: FeedbackSortBy
		take?: number
		skip?: number
	}
}

type GetExecutorFeedbacksConfig = RequestConfig<GetExecutorFeedbacksParam>

export const getExecutorFeedbacks = ({
	params,
	config,
}: GetExecutorFeedbacksConfig) => {
	const queryString = generateQueryString(params.query)
	return apiInstance.get<{ feedbacks: IFeedback[]; count: number }>(
		`/feedback/executor/${params.executorLogin}${queryString}`,
		config
	)
}

interface GetExecutorRatingParam {
	executorLogin: string
}

type GetExecutorRatingConfig = RequestConfig<GetExecutorRatingParam>

export const getExecutorRating = ({
	params,
	config,
}: GetExecutorRatingConfig) => {
	return apiInstance.get<IFeedbackRating>(
		`/feedback/${params.executorLogin}/rating`,
		config
	)
}
