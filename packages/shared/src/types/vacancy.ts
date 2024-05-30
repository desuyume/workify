import { ICity } from './city'
import { IUser } from './user'

export interface IVacancy {
	id: number
	title: string
	description: string
	category: IVacancyCategory | null
	price: number
	cover: string | File | null
	photos: IVacancyPhoto[]
	city: ICity | null
	isLocationHidden: boolean
	isVacancyHidden: boolean
}

export interface IUserVacancy extends IVacancy {
	user: IUser
}

export interface IVacancyPhoto {
	id: number
	url: string | File
}

export enum Rating {
	'one' = 1,
	'two' = 2,
	'three' = 3,
	'four' = 4,
	'five' = 5,
}

export type SortBy = 'rating' | 'cost' | 'reviews'

export interface IVacancyQuery {
	page?: string
	limit?: string
	search?: string
	sortBy?: SortBy
	category?: string
	cost_from?: string
	cost_to?: string
	works_amount?: string
	city?: string
}

export interface IVacancyCategory {
	id: number
	title: string
}

export interface IFetchedVacancy extends IVacancy {
	user: IUser
}
