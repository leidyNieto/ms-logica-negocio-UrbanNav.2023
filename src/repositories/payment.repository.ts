import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Payment, PaymentRelations, Trip, Client} from '../models';
import {TripRepository} from './trip.repository';
import {ClientRepository} from './client.repository';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id,
  PaymentRelations
> {

  public readonly trip: BelongsToAccessor<Trip, typeof Payment.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof Payment.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TripRepository') protected tripRepositoryGetter: Getter<TripRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(Payment, dataSource);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.trip = this.createBelongsToAccessorFor('trip', tripRepositoryGetter,);
    this.registerInclusionResolver('trip', this.trip.inclusionResolver);
  }
}
