import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Driver, Location, LocationDriver, LocationRelations, City} from '../models';
import {CityRepository} from './city.repository';
import {DriverRepository} from './driver.repository';
import {LocationDriverRepository} from './location-driver.repository';
import {TripRepository} from './trip.repository';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id,
  LocationRelations
> {

  public readonly drivers: HasManyThroughRepositoryFactory<Driver, typeof Driver.prototype.id,
          LocationDriver,
          typeof Location.prototype.id
        >;

  public readonly city: BelongsToAccessor<City, typeof Location.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TripRepository') protected tripRepositoryGetter: Getter<TripRepository>, @repository.getter('LocationDriverRepository') protected locationDriverRepositoryGetter: Getter<LocationDriverRepository>, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Location, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);

    this.drivers = this.createHasManyThroughRepositoryFactoryFor('drivers', driverRepositoryGetter, locationDriverRepositoryGetter,);
    this.registerInclusionResolver('drivers', this.drivers.inclusionResolver);

  }
}
