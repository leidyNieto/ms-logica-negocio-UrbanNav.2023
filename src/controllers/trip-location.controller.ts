import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Trip,
  Location,
} from '../models';
import {TripRepository} from '../repositories';

export class TripLocationController {
  constructor(
    @repository(TripRepository)
    public tripRepository: TripRepository,
  ) { }

  @get('/trips/{id}/location', {
    responses: {
      '200': {
        description: 'Location belonging to Trip',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Location),
          },
        },
      },
    },
  })
  async getLocation(
    @param.path.number('id') id: typeof Trip.prototype.id,
  ): Promise<Location> {
    return this.tripRepository.location(id);
  }
}
