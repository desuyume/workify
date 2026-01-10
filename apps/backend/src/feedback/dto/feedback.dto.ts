import { Rating } from '@workify/shared'
import { Transform } from 'class-transformer'
import { IsEnum, MaxLength } from 'class-validator'

export class CreateFeedbackDto {
  @MaxLength(1500)
  comment: string
  @Transform(({ value }) =>  Number(value))
  @IsEnum(Rating)
  rating: Rating
}
