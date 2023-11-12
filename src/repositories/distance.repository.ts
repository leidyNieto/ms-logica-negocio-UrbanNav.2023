import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distance, DistanceRelations, Stop, Location} from '../models';
import {LocationRepository} from './location.repository';
import {StopRepository} from './stop.repository';

export class DistanceRepository extends DefaultCrudRepository<
  Distance,
  typeof Distance.prototype.id,
  DistanceRelations
> {

  public readonly Origen: BelongsToAccessor<Stop, typeof Distance.prototype.id>;

  public readonly Destino: BelongsToAccessor<Stop, typeof Distance.prototype.id>;

  public readonly origin: BelongsToAccessor<Location, typeof Distance.prototype.id>;

  public readonly Destination: BelongsToAccessor<Location, typeof Distance.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('StopRepository') protected stopRepositoryGetter: Getter<StopRepository>,
  ) {
    super(Distance, dataSource);
    this.Destination = this.createBelongsToAccessorFor('Destination', locationRepositoryGetter,);
    this.registerInclusionResolver('Destination', this.Destination.inclusionResolver);
    this.origin = this.createBelongsToAccessorFor('origin', locationRepositoryGetter,);
    this.registerInclusionResolver('origin', this.origin.inclusionResolver);
    this.Destino = this.createBelongsToAccessorFor('Destino', stopRepositoryGetter,);
    this.registerInclusionResolver('Destino', this.Destino.inclusionResolver);
    this.Origen = this.createBelongsToAccessorFor('Origen', stopRepositoryGetter,);
    this.registerInclusionResolver('Origen', this.Origen.inclusionResolver);
  }
}
