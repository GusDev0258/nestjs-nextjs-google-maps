import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  findPlace(@Query('search') search: string) {
    return this.placesService.findPlace(search);
  }
}
