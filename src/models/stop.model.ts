import {Entity, model, property} from '@loopback/repository';

@model()
export class Stop extends Entity {
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

  @property({
    type: 'string',
  })
  latitude?: string;

  @property({
    type: 'string',
  })
  length?: string;

  @property({
    type: 'string',
  })
  password?: string;


  constructor(data?: Partial<Stop>) {
    super(data);
  }
}

export interface StopRelations {
  // describe navigational properties here
}

export type StopWithRelations = Stop & StopRelations;
