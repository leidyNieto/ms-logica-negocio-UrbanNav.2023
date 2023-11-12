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
  Driver,
} from '../models';
import {UserRepository} from '../repositories';

export class UserDriverController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Driver),
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<Driver> {
    return this.userRepository.driver(id);
  }
}
