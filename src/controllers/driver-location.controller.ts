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
LocationDriver,
Location,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverLocationController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/locations', {
    responses: {
      '200': {
        description: 'Array of Driver has many Location through LocationDriver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Location)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Location>,
  ): Promise<Location[]> {
    return this.driverRepository.locations(id).find(filter);
  }

  @post('/drivers/{id}/locations', {
    responses: {
      '200': {
        description: 'create a Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Driver.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocationInDriver',
            exclude: ['id'],
          }),
        },
      },
    }) location: Omit<Location, 'id'>,
  ): Promise<Location> {
    return this.driverRepository.locations(id).create(location);
  }

  @patch('/drivers/{id}/locations', {
    responses: {
      '200': {
        description: 'Driver.Location PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Partial<Location>,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.driverRepository.locations(id).patch(location, where);
  }

  @del('/drivers/{id}/locations', {
    responses: {
      '200': {
        description: 'Driver.Location DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.driverRepository.locations(id).delete(where);
  }
}
