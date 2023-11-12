import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cars,
  Driver,
} from '../models';
import {CarsRepository} from '../repositories';

export class CarsDriverController {
  constructor(
    @repository(CarsRepository)
    public carsRepository: CarsRepository,
  ) { }

  @get('/cars/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to Cars',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Driver),
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof Cars.prototype.id,
  ): Promise<Driver> {
    return this.carsRepository.driver(id);
  }
}
