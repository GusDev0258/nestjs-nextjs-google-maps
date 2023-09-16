import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Get()
  getDirections(
    @Query('sourceId') sourceId: string,
    @Query('destinationId') destinationId: string,
  ) {
    return this.directionsService.getDirections(sourceId, destinationId);
  }
}
