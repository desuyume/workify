import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  title!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsString()
  categoryId!: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isLocationHidden?: boolean

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isVacancyHidden?: boolean
}
