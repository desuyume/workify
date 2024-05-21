import { authApiInstance } from '@/lib/api/instance'

interface UpdateUserDescriptionParams {
	description: string
}

type UpdateUserDescriptionConfig = RequestConfig<UpdateUserDescriptionParams>

export const updateUserDescription = ({
	params,
	config,
}: UpdateUserDescriptionConfig) => {
	return authApiInstance.patch(`/users/description`, params, config)
}
