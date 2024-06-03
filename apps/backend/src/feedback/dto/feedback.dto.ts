import { Rating } from '@workify/shared';
import { MaxLength } from 'class-validator';

export class CreateFeedbackDto {
  @MaxLength(1500)
  comment: string;
  rating: Rating;
}
