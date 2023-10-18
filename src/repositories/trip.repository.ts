import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Trip, TripRelations} from '../models';

export class TripRepository extends DefaultCrudRepository<
  Trip,
  typeof Trip.prototype.id,
  TripRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Trip, dataSource);
  }
}
