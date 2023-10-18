import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Cars} from './cars.model';
import {Trip} from './trip.model';
import {User} from './user.model';

@model(
  {
    settings:{
      foreignKeys:{
        fk_user_id:{
          name:'fk_user_id',
          entity:'User',
          entityKey:'id',
          foreignKey:'userId'
        }
      }
    }
  }
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
    required: true,
  })
  numeroLicencia: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencimientoLicencia: string;

  @hasMany(() => Trip)
  trips: Trip[];

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => Cars)
  cars: Cars[];

  constructor(data?: Partial<Driver>) {
    super(data);
  }
}

export interface DriverRelations {
  // describe navigational properties here
}

export type DriverWithRelations = Driver & DriverRelations;
