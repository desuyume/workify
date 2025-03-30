import { authApiInstance } from '@/lib/api/instance'
import { IUser } from '@workify/shared'

interface GetUserParams {
  id: number
}

type GetUserConfig = RequestConfig<GetUserParams>

export const getUsersId = ({ params, config }: GetUserConfig) =>
  authApiInstance.get<IUser>(`/users/${params.id}`, config)
