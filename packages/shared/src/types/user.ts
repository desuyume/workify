export interface IUserPayload {
	username: string
	sub: {
		name: string
	}
}

export interface IUser {
	id: number
	name: string
	email: string
}
