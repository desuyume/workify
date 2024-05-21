import { authApiInstance } from '@/lib/api/instance'

interface UpdateUserSpecialisationParams {
	specialisation: string
}

type UpdateUserSpecialisationConfig =
	RequestConfig<UpdateUserSpecialisationParams>

export const updateUserSpecialisation = ({
	params,
	config,
}: UpdateUserSpecialisationConfig) => {
	return authApiInstance.patch(`/users/specialisation`, params, config)
}
