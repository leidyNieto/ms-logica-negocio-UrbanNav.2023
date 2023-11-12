import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {LocationDriver, LocationDriverRelations} from '../models';
import {DriverRepository} from './driver.repository';
import {LocationRepository} from './location.repository';

export class LocationDriverRepository extends DefaultCrudRepository<
  LocationDriver,
  typeof LocationDriver.prototype.id,
  LocationDriverRelations
> {



  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(LocationDriver, dataSource);

  }
}
