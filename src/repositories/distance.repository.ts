import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distance, DistanceRelations, Location} from '../models';
import {LocationRepository} from './location.repository';

export class DistanceRepository extends DefaultCrudRepository<
  Distance,
  typeof Distance.prototype.id,
  DistanceRelations
> {

  public readonly location: BelongsToAccessor<Location, typeof Distance.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(Distance, dataSource);
    this.location = this.createBelongsToAccessorFor('location', locationRepositoryGetter,);
    this.registerInclusionResolver('location', this.location.inclusionResolver);
  }
}
