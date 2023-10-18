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
  City,
  Location,
} from '../models';
import {CityRepository} from '../repositories';

export class CityLocationController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/locations', {
    responses: {
      '200': {
        description: 'Array of City has many Location',
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
    return this.cityRepository.locations(id).find(filter);
  }

  @post('/cities/{id}/locations', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocationInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) location: Omit<Location, 'id'>,
  ): Promise<Location> {
    return this.cityRepository.locations(id).create(location);
  }

  @patch('/cities/{id}/locations', {
    responses: {
      '200': {
        description: 'City.Location PATCH success count',
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
    return this.cityRepository.locations(id).patch(location, where);
  }

  @del('/cities/{id}/locations', {
    responses: {
      '200': {
        description: 'City.Location DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.cityRepository.locations(id).delete(where);
  }
}
