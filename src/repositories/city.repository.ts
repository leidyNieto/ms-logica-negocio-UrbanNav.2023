import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {City, CityRelations, Location} from '../models';
import {LocationRepository} from './location.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly locations: HasManyRepositoryFactory<Location, typeof City.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(City, dataSource);
    this.locations = this.createHasManyRepositoryFactoryFor('locations', locationRepositoryGetter,);
    this.registerInclusionResolver('locations', this.locations.inclusionResolver);
  }
}
