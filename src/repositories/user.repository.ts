import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {User, UserRelations, Client, Driver} from '../models';
import {ClientRepository} from './client.repository';
import {DriverRepository} from './driver.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly client: BelongsToAccessor<Client, typeof User.prototype.id>;

  public readonly driver: BelongsToAccessor<Driver, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(User, dataSource);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
    this.registerInclusionResolver('driver', this.driver.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);

  }
}
