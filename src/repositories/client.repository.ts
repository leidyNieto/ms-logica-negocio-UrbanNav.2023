import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Client, ClientRelations, User, Trip} from '../models';
import {UserRepository} from './user.repository';
import {TripRepository} from './trip.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Client.prototype.id>;

  public readonly trip: BelongsToAccessor<Trip, typeof Client.prototype.id>;

  public readonly trips: HasManyRepositoryFactory<Trip, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TripRepository') protected tripRepositoryGetter: Getter<TripRepository>,
  ) {
    super(Client, dataSource);
    this.trips = this.createHasManyRepositoryFactoryFor('trips', tripRepositoryGetter,);
    this.registerInclusionResolver('trips', this.trips.inclusionResolver);
    this.trip = this.createBelongsToAccessorFor('trip', tripRepositoryGetter,);
    this.registerInclusionResolver('trip', this.trip.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
