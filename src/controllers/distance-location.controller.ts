import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Distance,
  Location,
} from '../models';
import {DistanceRepository} from '../repositories';

export class DistanceLocationController {
  constructor(
    @repository(DistanceRepository)
    public distanceRepository: DistanceRepository,
  ) { }

  @get('/distances/{id}/location', {
    responses: {
      '200': {
        description: 'Location belonging to Distance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Location),
          },
        },
      },
    },
  })
  async getLocation(
    @param.path.number('id') id: typeof Distance.prototype.id,
  ): Promise<Location> {
    return this.distanceRepository.location(id);
  }
}
