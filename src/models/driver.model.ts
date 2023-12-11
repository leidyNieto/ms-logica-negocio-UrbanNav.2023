import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Cars} from './cars.model';
import {LocationDriver} from './location-driver.model';
import {Location} from './location.model';
import {Trip} from './trip.model';
import {User} from './user.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_driver_userId: {
          name: 'fk_driver_userId',
          entity: 'User',
          entityKey: 'id',
          foreignKey: 'userId',
        },
      },
    },
  },
)
export class Driver extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    id: true,
  })
  identi: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroLicencia: string;

  @property({
    type: 'string',
    required: true,
  })
  Licencia: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencimientoLicencia: string;

  @hasMany(() => Trip)
  trips: Trip[];

  @hasMany(() => Location, {through: {model: () => LocationDriver}})
  locations: Location[];

  @hasMany(() => Cars)
  cars: Cars[];

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Driver>) {
    super(data);
  }
}

export interface DriverRelations {
  // describe navigational properties here
}

export type DriverWithRelations = Driver & DriverRelations;
