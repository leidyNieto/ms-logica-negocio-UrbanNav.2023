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
Location,
LocationDriver,
Driver,
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationDriverController {
  constructor(
    @repository(LocationRepository) protected locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/drivers', {
    responses: {
      '200': {
        description: 'Array of Location has many Driver through LocationDriver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Driver)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Driver>,
  ): Promise<Driver[]> {
    return this.locationRepository.drivers(id).find(filter);
  }

  @post('/locations/{id}/drivers', {
    responses: {
      '200': {
        description: 'create a Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Driver)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Location.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {
            title: 'NewDriverInLocation',
            exclude: ['id'],
          }),
        },
      },
    }) driver: Omit<Driver, 'id'>,
  ): Promise<Driver> {
    return this.locationRepository.drivers(id).create(driver);
  }

  @patch('/locations/{id}/drivers', {
    responses: {
      '200': {
        description: 'Location.Driver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Partial<Driver>,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.locationRepository.drivers(id).patch(driver, where);
  }

  @del('/locations/{id}/drivers', {
    responses: {
      '200': {
        description: 'Location.Driver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.locationRepository.drivers(id).delete(where);
  }
}
