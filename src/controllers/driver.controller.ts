import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Driver} from '../models';
import {DriverRepository} from '../repositories';

export class DriverController {
  constructor(
    @repository(DriverRepository)
    public driverRepository : DriverRepository,
  ) {}

  @post('/driver')
  @response(200, {
    description: 'Driver model instance',
    content: {'application/json': {schema: getModelSchemaRef(Driver)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {
            title: 'NewDriver',
            exclude: ['id'],
          }),
        },
      },
    })
    driver: Omit<Driver, 'id'>,
  ): Promise<Driver> {
    return this.driverRepository.create(driver);
  }

  @get('/driver/count')
  @response(200, {
    description: 'Driver model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Driver) where?: Where<Driver>,
  ): Promise<Count> {
    return this.driverRepository.count(where);
  }

  @get('/driver')
  @response(200, {
    description: 'Array of Driver model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Driver, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Driver) filter?: Filter<Driver>,
  ): Promise<Driver[]> {
    return this.driverRepository.find(filter);
  }

  @patch('/driver')
  @response(200, {
    description: 'Driver PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Driver,
    @param.where(Driver) where?: Where<Driver>,
  ): Promise<Count> {
    return this.driverRepository.updateAll(driver, where);
  }

  @get('/driver/{id}')
  @response(200, {
    description: 'Driver model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Driver, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Driver, {exclude: 'where'}) filter?: FilterExcludingWhere<Driver>
  ): Promise<Driver> {
    return this.driverRepository.findById(id, filter);
  }

  @patch('/driver/{id}')
  @response(204, {
    description: 'Driver PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Driver,
  ): Promise<void> {
    await this.driverRepository.updateById(id, driver);
  }

  @put('/driver/{id}')
  @response(204, {
    description: 'Driver PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() driver: Driver,
  ): Promise<void> {
    await this.driverRepository.replaceById(id, driver);
  }

  @del('/driver/{id}')
  @response(204, {
    description: 'Driver DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.driverRepository.deleteById(id);
  }
}
