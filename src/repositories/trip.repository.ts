import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Trip, TripRelations, Qualification, Location} from '../models';
import {QualificationRepository} from './qualification.repository';
import {LocationRepository} from './location.repository';

export class TripRepository extends DefaultCrudRepository<
  Trip,
  typeof Trip.prototype.id,
  TripRelations
> {

  public readonly qualifications: HasManyRepositoryFactory<Qualification, typeof Trip.prototype.id>;

  public readonly location: BelongsToAccessor<Location, typeof Trip.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('QualificationRepository') protected qualificationRepositoryGetter: Getter<QualificationRepository>, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(Trip, dataSource);
    this.location = this.createBelongsToAccessorFor('location', locationRepositoryGetter,);
    this.registerInclusionResolver('location', this.location.inclusionResolver);
    this.qualifications = this.createHasManyRepositoryFactoryFor('qualifications', qualificationRepositoryGetter,);
    this.registerInclusionResolver('qualifications', this.qualifications.inclusionResolver);
  }
}
