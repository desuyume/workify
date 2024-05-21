import { authApiInstance } from '@/lib/api/instance'

interface UpdateUserPasswordParams {
	password: string
}

type UpdateUserPasswordConfig = RequestConfig<UpdateUserPasswordParams>

export const updateUserPassword = ({
	params,
	config,
}: UpdateUserPasswordConfig) => {
	return authApiInstance.patch(`/users/password`, params, config)
}
