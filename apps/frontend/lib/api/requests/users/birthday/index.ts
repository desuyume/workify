import { authApiInstance } from '@/lib/api/instance'

interface UpdateUserBirthdayParams {
	birthday: Date | null
}

type UpdateUserBirthdayConfig = RequestConfig<UpdateUserBirthdayParams>

export const updateUserBirthday = ({
	params,
	config,
}: UpdateUserBirthdayConfig) => {
	return authApiInstance.patch(`/users/birthday`, params, config)
}
