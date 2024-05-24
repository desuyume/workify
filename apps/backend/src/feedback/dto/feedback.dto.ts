import { Rating } from '@workify/shared';

export class CreateFeedbackDto {
  comment: string;
  rating: Rating;
}
