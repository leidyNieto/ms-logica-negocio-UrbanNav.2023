import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Trip, TripRelations, Driver, Location, Client} from '../models';
import {LocationRepository} from './location.repository';
import {QualificationRepository} from './qualification.repository';
import {DriverRepository} from './driver.repository';
import {ClientRepository} from './client.repository';

export class TripRepository extends DefaultCrudRepository<
  Trip,
  typeof Trip.prototype.id,
  TripRelations
> {

  public readonly driver: BelongsToAccessor<Driver, typeof Trip.prototype.id>;

  public readonly Origin: BelongsToAccessor<Location, typeof Trip.prototype.id>;

  public readonly Destination: BelongsToAccessor<Location, typeof Trip.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof Trip.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('QualificationRepository') protected qualificationRepositoryGetter: Getter<QualificationRepository>, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(Trip, dataSource);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.Destination = this.createBelongsToAccessorFor('Destination', locationRepositoryGetter,);
    this.registerInclusionResolver('Destination', this.Destination.inclusionResolver);
    this.Origin = this.createBelongsToAccessorFor('Origin', locationRepositoryGetter,);
    this.registerInclusionResolver('Origin', this.Origin.inclusionResolver);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
    this.registerInclusionResolver('driver', this.driver.inclusionResolver);

  }
}
