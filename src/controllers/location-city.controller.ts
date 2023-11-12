import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Location,
  City,
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationCityController {
  constructor(
    @repository(LocationRepository)
    public locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Location',
        content: {
          'application/json': {
            schema: getModelSchemaRef(City),
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof Location.prototype.id,
  ): Promise<City> {
    return this.locationRepository.city(id);
  }
}
