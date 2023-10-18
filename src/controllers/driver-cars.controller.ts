import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Driver,
  Cars,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverCarsController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/cars', {
    responses: {
      '200': {
        description: 'Array of Driver has many Cars',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cars)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cars>,
  ): Promise<Cars[]> {
    return this.driverRepository.cars(id).find(filter);
  }

  @post('/drivers/{id}/cars', {
    responses: {
      '200': {
        description: 'Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cars)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Driver.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cars, {
            title: 'NewCarsInDriver',
            exclude: ['id'],
            optional: ['driverId']
          }),
        },
      },
    }) cars: Omit<Cars, 'id'>,
  ): Promise<Cars> {
    return this.driverRepository.cars(id).create(cars);
  }

  @patch('/drivers/{id}/cars', {
    responses: {
      '200': {
        description: 'Driver.Cars PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cars, {partial: true}),
        },
      },
    })
    cars: Partial<Cars>,
    @param.query.object('where', getWhereSchemaFor(Cars)) where?: Where<Cars>,
  ): Promise<Count> {
    return this.driverRepository.cars(id).patch(cars, where);
  }

  @del('/drivers/{id}/cars', {
    responses: {
      '200': {
        description: 'Driver.Cars DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cars)) where?: Where<Cars>,
  ): Promise<Count> {
    return this.driverRepository.cars(id).delete(where);
  }
}
