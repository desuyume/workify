import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  title: string;
  description: string;
  categoryId: string;
  city: string;
  @IsNumberString()
  price: string;
  isLocationHidden: string;
  isVacancyHidden: string;
}
