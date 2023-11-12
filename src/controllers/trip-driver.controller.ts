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
  Driver,
} from '../models';
import {TripRepository} from '../repositories';

export class TripDriverController {
  constructor(
    @repository(TripRepository)
    public tripRepository: TripRepository,
  ) { }

  @get('/trips/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to Trip',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Driver),
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof Trip.prototype.id,
  ): Promise<Driver> {
    return this.tripRepository.driver(id);
  }
}
