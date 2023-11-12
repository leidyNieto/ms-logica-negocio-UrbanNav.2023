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
  Stop,
} from '../models';
import {DistanceRepository} from '../repositories';

export class DistanceStopController {
  constructor(
    @repository(DistanceRepository)
    public distanceRepository: DistanceRepository,
  ) { }

  @get('/distances/{id}/stop', {
    responses: {
      '200': {
        description: 'Stop belonging to Distance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Stop),
          },
        },
      },
    },
  })
  async getStop(
    @param.path.number('id') id: typeof Distance.prototype.id,
  ): Promise<Stop> {
    return this.distanceRepository.Destino(id);
  }
}
