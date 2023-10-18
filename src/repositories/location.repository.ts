import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Location, LocationRelations, Trip} from '../models';
import {TripRepository} from './trip.repository';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id,
  LocationRelations
> {

  public readonly trips: HasManyRepositoryFactory<Trip, typeof Location.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TripRepository') protected tripRepositoryGetter: Getter<TripRepository>,
  ) {
    super(Location, dataSource);
    this.trips = this.createHasManyRepositoryFactoryFor('trips', tripRepositoryGetter,);
    this.registerInclusionResolver('trips', this.trips.inclusionResolver);
  }
}
