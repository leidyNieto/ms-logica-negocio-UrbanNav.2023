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
  Trip,
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationTripController {
  constructor(
    @repository(LocationRepository) protected locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/trips', {
    responses: {
      '200': {
        description: 'Array of Location has many Trip',
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
    return this.locationRepository.trips(id).find(filter);
  }

  @post('/locations/{id}/trips', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Trip)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Location.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trip, {
            title: 'NewTripInLocation',
            exclude: ['id'],
            optional: ['locationId']
          }),
        },
      },
    }) trip: Omit<Trip, 'id'>,
  ): Promise<Trip> {
    return this.locationRepository.trips(id).create(trip);
  }

  @patch('/locations/{id}/trips', {
    responses: {
      '200': {
        description: 'Location.Trip PATCH success count',
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
    return this.locationRepository.trips(id).patch(trip, where);
  }

  @del('/locations/{id}/trips', {
    responses: {
      '200': {
        description: 'Location.Trip DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Trip)) where?: Where<Trip>,
  ): Promise<Count> {
    return this.locationRepository.trips(id).delete(where);
  }
}
