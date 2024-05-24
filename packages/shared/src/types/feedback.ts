import { Rating } from './vacancy'

export interface IFeedback {
	comment: string
	rating: Rating
	photo: string | File | null
}
