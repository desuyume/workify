export interface IVacancy {
	id: number
	title: string
	description: string
	rating: VacancyRating
	category: string
	price: number
	cover: string | null
	photos: IVacancyPhoto[]
	location: string | null
	isLocationHidden: boolean
	isVacancyHidden: boolean
}

export interface IVacancyPhoto {
	id: number
	url: string
}

export enum VacancyRating {
	'zero' = 0,
	'one' = 1,
	'two' = 2,
	'three' = 3,
	'four' = 4,
	'five' = 5,
}
