import { authApiInstance } from '@/lib/api/instance'

interface UpdateEmailCommunicationParams {
	isVisible: boolean
}

type UpdateEmailCommunicationConfig =
	RequestConfig<UpdateEmailCommunicationParams>

export const updateEmailCommunication = ({
	params,
	config,
}: UpdateEmailCommunicationConfig) => {
	return authApiInstance.patch(`/users/communication/email`, params, config)
}

interface UpdatePhoneCommunicationParams {
	isVisible: boolean
}

type UpdatePhoneCommunicationConfig =
	RequestConfig<UpdatePhoneCommunicationParams>

export const updatePhoneCommunication = ({
	params,
	config,
}: UpdatePhoneCommunicationConfig) => {
	return authApiInstance.patch(`/users/communication/phone`, params, config)
}
