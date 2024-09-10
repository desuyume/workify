import { FeedbackSortBy, IFeedback, IFeedbackRating } from '@workify/shared'
import authApiInstance, { apiInstance } from '../../instance'
import { generateQueryString } from '@/lib/utils'

interface CreateFeedbackParam {
	vacancyId: number
	data: FormData
}

type CreateFeedbackConfig = RequestConfig<CreateFeedbackParam>

export const createFeedback = ({ params, config }: CreateFeedbackConfig) => {
	return authApiInstance.post<any, { data: IFeedback }>(
		`/feedback/${params.vacancyId}`,
		params.data,
		config
	)
}

interface UpdateFeedbackParam {
	vacancyId: number
	feedbackId: number
	data: FormData
}

type UpdateFeedbackConfig = RequestConfig<UpdateFeedbackParam>

export const updateFeedback = ({ params, config }: UpdateFeedbackConfig) => {
	return authApiInstance.patch<any, { data: IFeedback }>(
		`/feedback/${params.vacancyId}/${params.feedbackId}`,
		params.data,
		config
	)
}

interface GetVacancyFeedbacksParam {
	vacancyId: number
	query: {
		sortBy: FeedbackSortBy
		take?: number
		skip?: number
	}
}

type GetVacancyFeedbacksConfig = RequestConfig<GetVacancyFeedbacksParam>

export const getVacancyFeedbacks = ({ params, config }: GetVacancyFeedbacksConfig) => {
	const queryString = generateQueryString(params.query)
	return apiInstance.get<{ feedbacks: IFeedback[]; count: number }>(
		`/feedback/vacancy/${params.vacancyId}${queryString}`,
		config
	)
}

interface GetExecutorRatingParam {
	vacancyId: number
}

type GetExecutorRatingConfig = RequestConfig<GetExecutorRatingParam>

export const getVacancyRating = ({ params, config }: GetExecutorRatingConfig) => {
	return apiInstance.get<IFeedbackRating>(`/feedback/${params.vacancyId}/rating`, config)
}
