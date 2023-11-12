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
  Client,
} from '../models';
import {TripRepository} from '../repositories';

export class TripClientController {
  constructor(
    @repository(TripRepository)
    public tripRepository: TripRepository,
  ) { }

  @get('/trips/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Trip',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof Trip.prototype.id,
  ): Promise<Client> {
    return this.tripRepository.client(id);
  }
}
