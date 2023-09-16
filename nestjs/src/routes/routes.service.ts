import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { DirectionsService } from '../maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    console.log(createRouteDto);
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.directionsService.getDirections(
        createRouteDto.source_id,
        createRouteDto.destination_id,
      );
    const {
      start_address,
      start_location,
      end_address,
      end_location,
      distance,
      duration,
    } = routes[0].legs[0];

    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: start_address,
          location: {
            lat: start_location.lat,
            lng: start_location.lng,
          },
        },
        destination: {
          name: end_address,
          location: {
            lat: end_location.lat,
            lng: end_location.lng,
          },
        },
        distance: distance.value,
        duration: duration.value,
        directions: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request,
        }),
      },
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
