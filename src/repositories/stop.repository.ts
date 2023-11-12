import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Stop, StopRelations} from '../models';

export class StopRepository extends DefaultCrudRepository<
  Stop,
  typeof Stop.prototype.id,
  StopRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Stop, dataSource);
  }
}
