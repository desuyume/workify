import authApiInstance, { apiInstance } from '@/lib/api/instance'
import { IFeedbackWithExecutor } from '@workify/shared'

interface GetFeedbackByIdParam {
  id: number
}

type GetFeedbackByIdConfig = RequestConfig<GetFeedbackByIdParam>

export const getFeedbackById = ({ params, config }: GetFeedbackByIdConfig) =>
  apiInstance.get<IFeedbackWithExecutor>(`/feedback/${params.id}`, config)

interface DeleteFeedbackParam {
  id: number
}

type DeleteFeedbackConfig = RequestConfig<DeleteFeedbackParam>

export const deleteFeedback = ({ params, config }: DeleteFeedbackConfig) =>
  authApiInstance.delete<
    any,
    {
      data: IFeedbackWithExecutor
    }
  >(`/feedback/${params.id}`, config)
