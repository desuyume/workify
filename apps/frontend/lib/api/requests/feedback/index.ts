import { IFeedback } from '@workify/shared'
import authApiInstance from '../../instance'

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
