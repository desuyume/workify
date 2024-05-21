import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async getCities(@Query('limit') limit: number | undefined, @Query('search') search: string | undefined) {
    return this.citiesService.getCities(limit, search);
  }
}
