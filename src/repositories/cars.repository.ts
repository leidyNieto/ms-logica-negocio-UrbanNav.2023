import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cars, CarsRelations, Driver} from '../models';
import {DriverRepository} from './driver.repository';

export class CarsRepository extends DefaultCrudRepository<
  Cars,
  typeof Cars.prototype.id,
  CarsRelations
> {

  public readonly driver: BelongsToAccessor<Driver, typeof Cars.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(Cars, dataSource);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
    this.registerInclusionResolver('driver', this.driver.inclusionResolver);
  }
}
