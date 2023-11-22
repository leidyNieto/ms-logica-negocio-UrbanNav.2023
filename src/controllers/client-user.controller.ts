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
  User,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientUserController {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Client',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Client.prototype.id,
  ): Promise<User> {
    return this.clientRepository.user(id);
  }
}
