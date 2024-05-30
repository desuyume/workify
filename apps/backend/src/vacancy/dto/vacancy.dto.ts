import { IsNotEmpty } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  title: string;
  description: string;
  @IsNotEmpty()
  categoryId: string;
  city: string;
  price: string;
  isLocationHidden: string;
  isVacancyHidden: string;
}
