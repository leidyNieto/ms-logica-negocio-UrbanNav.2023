import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Client} from './client.model';
import {Driver} from './driver.model';
import {Location} from './location.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_trip_driverId: {
          name: 'fk_trip_driverId',
          entity: 'Driver',
          entityKey: 'id',
          foreignKey: 'driverId',
        },
        fk_trip_idLocationOrigin: {
          name: 'fk_trip_idLocationOrigin',
          entity: 'Location',
          entityKey: 'id',
          foreignKey: 'idLocationOrigin',
        },
        fk_trip_idLocationDestination: {
          name: 'fk_trip_idLocationDestination',
          entity: 'Location',
          entityKey: 'id',
          foreignKey: 'idLocationDestination',
        },
        fk_trip_clientId: {
          name: 'fk_trip_clientId',
          entity: 'Client',
          entityKey: 'id',
          foreignKey: 'clientId',
        },
      },
    },
  },
)
export class Trip extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  hour: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'boolean',
    required: true,
  })
  state: boolean;

  @belongsTo(() => Driver)
  driverId: number;

  @belongsTo(() => Location, {name: 'Origin'})
  idLocationOrigin: number;

  @belongsTo(() => Location, {name: 'Destination'})
  idLocationDestination: number;

  @belongsTo(() => Client)
  clientId: number;

  constructor(data?: Partial<Trip>) {
    super(data);
  }
}

export interface TripRelations {
  // describe navigational properties here
}

export type TripWithRelations = Trip & TripRelations;
