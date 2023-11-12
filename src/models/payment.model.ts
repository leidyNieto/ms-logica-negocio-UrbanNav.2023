import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Client} from './client.model';
import {Trip} from './trip.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_payment_tripId: {
          name: 'fk_payment_tripId',
          entity: 'Trip',
          entityKey: 'id',
          foreignKey: 'tripId',
        },
        fk_payment_clientId: {
          name: 'fk_payment_clientId',
          entity: 'Client',
          entityKey: 'id',
          foreignKey: 'clientId',
        },
      },
    },
  },
)
export class Payment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  method: number;

  @property({
    type: 'string',
    required: true,
  })
  receiver: string;

  @belongsTo(() => Trip)
  tripId: number;

  @belongsTo(() => Client)
  clientId: number;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
