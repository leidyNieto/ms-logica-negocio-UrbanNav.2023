import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Driver, DriverRelations, Trip, Location, LocationDriver, Cars} from '../models';
import {CarsRepository} from './cars.repository';
import {TripRepository} from './trip.repository';
import {UserRepository} from './user.repository';
import {LocationDriverRepository} from './location-driver.repository';
import {LocationRepository} from './location.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.id,
  DriverRelations
> {

  public readonly trips: HasManyRepositoryFactory<Trip, typeof Driver.prototype.id>;

  public readonly locations: HasManyThroughRepositoryFactory<Location, typeof Location.prototype.id,
          LocationDriver,
          typeof Driver.prototype.id
        >;

  public readonly cars: HasManyRepositoryFactory<Cars, typeof Driver.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TripRepository') protected tripRepositoryGetter: Getter<TripRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CarsRepository') protected carsRepositoryGetter: Getter<CarsRepository>, @repository.getter('LocationDriverRepository') protected locationDriverRepositoryGetter: Getter<LocationDriverRepository>, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(Driver, dataSource);
    this.cars = this.createHasManyRepositoryFactoryFor('cars', carsRepositoryGetter,);
    this.registerInclusionResolver('cars', this.cars.inclusionResolver);
    this.locations = this.createHasManyThroughRepositoryFactoryFor('locations', locationRepositoryGetter, locationDriverRepositoryGetter,);
    this.registerInclusionResolver('locations', this.locations.inclusionResolver);
    this.trips = this.createHasManyRepositoryFactoryFor('trips', tripRepositoryGetter,);
    this.registerInclusionResolver('trips', this.trips.inclusionResolver);


  }
}
