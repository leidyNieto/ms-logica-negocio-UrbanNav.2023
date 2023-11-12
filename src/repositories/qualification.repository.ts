import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Qualification, QualificationRelations, Trip} from '../models';
import {TripRepository} from './trip.repository';

export class QualificationRepository extends DefaultCrudRepository<
  Qualification,
  typeof Qualification.prototype.id,
  QualificationRelations
> {

  public readonly trip: BelongsToAccessor<Trip, typeof Qualification.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TripRepository') protected tripRepositoryGetter: Getter<TripRepository>,
  ) {
    super(Qualification, dataSource);
    this.trip = this.createBelongsToAccessorFor('trip', tripRepositoryGetter,);
    this.registerInclusionResolver('trip', this.trip.inclusionResolver);
  }
}
