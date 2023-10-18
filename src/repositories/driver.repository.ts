import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Driver, DriverRelations, Trip, User, Cars} from '../models';
import {TripRepository} from './trip.repository';
import {UserRepository} from './user.repository';
import {CarsRepository} from './cars.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.id,
  DriverRelations
> {

  public readonly trips: HasManyRepositoryFactory<Trip, typeof Driver.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Driver.prototype.id>;

  public readonly cars: HasManyRepositoryFactory<Cars, typeof Driver.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TripRepository') protected tripRepositoryGetter: Getter<TripRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CarsRepository') protected carsRepositoryGetter: Getter<CarsRepository>,
  ) {
    super(Driver, dataSource);
    this.cars = this.createHasManyRepositoryFactoryFor('cars', carsRepositoryGetter,);
    this.registerInclusionResolver('cars', this.cars.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.trips = this.createHasManyRepositoryFactoryFor('trips', tripRepositoryGetter,);
    this.registerInclusionResolver('trips', this.trips.inclusionResolver);
  }
}
