import { apiInstance } from '@/lib/api/instance'
import { IUser } from '@workify/shared'

interface GetUserProfileByLoginParams {
	login: string
}

type GetUserProfileByLoginConfig = RequestConfig<GetUserProfileByLoginParams>

export const getUserProfileByLogin = ({
	params,
	config,
}: GetUserProfileByLoginConfig) =>
	apiInstance.get<IUser>(`/users/profile/${params.login}`, config)
