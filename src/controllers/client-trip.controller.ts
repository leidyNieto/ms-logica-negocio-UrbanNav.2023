import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Client,
  Trip,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientTripController {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/trip', {
    responses: {
      '200': {
        description: 'Trip belonging to Client',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Trip),
          },
        },
      },
    },
  })
  async getTrip(
    @param.path.number('id') id: typeof Client.prototype.id,
  ): Promise<Trip> {
    return this.clientRepository.trip(id);
  }
}
