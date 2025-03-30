import { IUser } from './user'
import { IVacancy, Rating } from './vacancy'

export interface IFeedback {
  id: number
  comment: string
  rating: Rating
  photo: string | File | null
  date_created: string
  customer: IUser
}

export interface IFeedbackWithExecutor {
  id: number
  comment: string
  rating: Rating
  photo: string | File | null
  date_created: string
  customer: IUser
  executor: IUser
  vacancy: IVacancy
}

export type FeedbackSortBy = 'date' | 'rating'

export interface IFeedbackRating {
  1: number
  2: number
  3: number
  4: number
  5: number
}
