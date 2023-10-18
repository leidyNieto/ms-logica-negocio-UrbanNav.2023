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
  Trip,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverTripController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/trips', {
    responses: {
      '200': {
        description: 'Array of Driver has many Trip',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Trip)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Trip>,
  ): Promise<Trip[]> {
    return this.driverRepository.trips(id).find(filter);
  }

  @post('/drivers/{id}/trips', {
    responses: {
      '200': {
        description: 'Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Trip)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Driver.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trip, {
            title: 'NewTripInDriver',
            exclude: ['id'],
            optional: ['driverId']
          }),
        },
      },
    }) trip: Omit<Trip, 'id'>,
  ): Promise<Trip> {
    return this.driverRepository.trips(id).create(trip);
  }

  @patch('/drivers/{id}/trips', {
    responses: {
      '200': {
        description: 'Driver.Trip PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trip, {partial: true}),
        },
      },
    })
    trip: Partial<Trip>,
    @param.query.object('where', getWhereSchemaFor(Trip)) where?: Where<Trip>,
  ): Promise<Count> {
    return this.driverRepository.trips(id).patch(trip, where);
  }

  @del('/drivers/{id}/trips', {
    responses: {
      '200': {
        description: 'Driver.Trip DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Trip)) where?: Where<Trip>,
  ): Promise<Count> {
    return this.driverRepository.trips(id).delete(where);
  }
}
