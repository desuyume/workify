import { authApiInstance } from '@/lib/api/instance'

interface PatchUserAvatarParams {
	data: FormData
}

type PatchUserAvatarConfig = RequestConfig<PatchUserAvatarParams>

export const patchUserAvatar = ({ params, config }: PatchUserAvatarConfig) => {
	return authApiInstance.patch(`/users/avatar`, params.data, config)
}

interface DeleteUserAvatarParams {}

type DeleteUserAvatarConfig = RequestConfig<DeleteUserAvatarParams>

export const deleteUserAvatar = ({
	params,
	config,
}: DeleteUserAvatarConfig) => {
	return authApiInstance.delete(`/users/avatar`, config)
}
