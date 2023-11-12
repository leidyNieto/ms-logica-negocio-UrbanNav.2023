import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Client,
} from '../models';
import {UserRepository} from '../repositories';

export class UserClientController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<Client> {
    return this.userRepository.client(id);
  }
}
