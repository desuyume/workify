import { authApiInstance } from '@/lib/api/instance'

interface UpdateUserEmailParams {
  email: string
}

type UpdateUserEmailConfig = RequestConfig<UpdateUserEmailParams>

export const updateUserEmail = ({ params, config }: UpdateUserEmailConfig) => {
  return authApiInstance.patch(`/users/email`, params, config)
}
