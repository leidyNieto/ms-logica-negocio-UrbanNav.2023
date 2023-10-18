import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Trip} from './trip.model';
import {User} from './user.model';

@model()
export class Client extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  address?: string;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Trip)
  tripId: number;



  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
