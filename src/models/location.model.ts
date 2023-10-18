import {Entity, model, property, hasMany} from '@loopback/repository';
import {Trip} from './trip.model';

@model()
export class Location extends Entity {
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
  name: string;

  @hasMany(() => Trip)
  trips: Trip[];

  @property({
    type: 'number',
  })
  cityId?: number;

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
