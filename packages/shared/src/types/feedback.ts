import { IUser } from './user'
import { Rating } from './vacancy'

export interface IFeedback {
	id: number
	comment: string
	rating: Rating
	photo: string | File | null
	date_created: string
	customer: IUser
}

export type FeedbackSortBy = 'date' | 'rating'

export interface IFeedbackRating {
	1: number
	2: number
	3: number
	4: number
	5: number
}
