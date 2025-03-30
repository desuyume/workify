import { authApiInstance } from '@/lib/api/instance'
import { IUser } from '@workify/shared'

interface GetUserProfileParams {}

type GetUserProfileConfig = RequestConfig<GetUserProfileParams>

export const getUserProfile = ({ params, config }: GetUserProfileConfig) => {
  return authApiInstance.get<IUser>(`/users/profile`, config)
}
