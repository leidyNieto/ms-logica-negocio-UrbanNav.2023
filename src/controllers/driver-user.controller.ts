import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Driver,
  User,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverUserController {
  constructor(
    @repository(DriverRepository)
    public driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Driver',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Driver.prototype.id,
  ): Promise<User> {
    return this.driverRepository.user(id);
  }
}
