import { authApiInstance } from '@/lib/api/instance'

interface UpdateUserNameParams {
	name: string
}

type UpdateUserNameConfig = RequestConfig<UpdateUserNameParams>

export const updateUserName = ({ params, config }: UpdateUserNameConfig) => {
	return authApiInstance.patch(`/users/name`, params, config)
}
