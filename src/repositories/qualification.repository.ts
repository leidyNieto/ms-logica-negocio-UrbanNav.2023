import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Qualification, QualificationRelations} from '../models';

export class QualificationRepository extends DefaultCrudRepository<
  Qualification,
  typeof Qualification.prototype.id,
  QualificationRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Qualification, dataSource);
  }
}
