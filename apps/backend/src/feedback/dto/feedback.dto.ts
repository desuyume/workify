import { Rating } from '@workify/shared'
import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CreateFeedbackDto {
  @IsOptional()
  @MaxLength(1500)
  comment?: string

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsEnum(Rating)
  rating!: Rating
}
