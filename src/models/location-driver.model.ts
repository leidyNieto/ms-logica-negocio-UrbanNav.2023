import {Entity, model, property} from '@loopback/repository';

@model()
export class LocationDriver extends Entity {
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
  originDriver: string;


  constructor(data?: Partial<LocationDriver>) {
    super(data);
  }
}

export interface LocationDriverRelations {
  // describe navigational properties here
}

export type LocationDriverWithRelations = LocationDriver & LocationDriverRelations;
