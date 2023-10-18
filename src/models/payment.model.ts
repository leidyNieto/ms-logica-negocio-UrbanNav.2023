import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Trip} from './trip.model';
import {Client} from './client.model';

@model()
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
