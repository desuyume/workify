import { IUserVacancy } from './vacancy'

export interface IUserPayload {
	id: number
	login: string
	email: string
}

export interface IUser {
	id: number
	login: string
	email: string
	name: string | null
	avatar: string | null
	birthday: string | null
	description: string | null
	phone: string | null
	specialisation: string | null
	rating: number
	vacancies: IUserVacancy[]
}
