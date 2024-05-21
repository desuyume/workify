import { authApiInstance } from '@/lib/api/instance'

interface UpdateUserPhoneParams {
	phone: string
}

type UpdateUserPhoneConfig = RequestConfig<UpdateUserPhoneParams>

export const updateUserPhone = ({ params, config }: UpdateUserPhoneConfig) => {
	return authApiInstance.patch(`/users/phone`, params, config)
}
