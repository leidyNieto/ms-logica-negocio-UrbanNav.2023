import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distance, DistanceRelations, Location} from '../models';
import {LocationRepository} from './location.repository';

export class DistanceRepository extends DefaultCrudRepository<
  Distance,
  typeof Distance.prototype.id,
  DistanceRelations
> {

  public readonly origin: BelongsToAccessor<Location, typeof Distance.prototype.id>;

  public readonly Destination: BelongsToAccessor<Location, typeof Distance.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(Distance, dataSource);
    this.Destination = this.createBelongsToAccessorFor('Destination', locationRepositoryGetter,);
    this.registerInclusionResolver('Destination', this.Destination.inclusionResolver);
    this.origin = this.createBelongsToAccessorFor('origin', locationRepositoryGetter,);
    this.registerInclusionResolver('origin', this.origin.inclusionResolver);

  }
}
