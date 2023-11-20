import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Location} from './location.model';
@model(
  {
    settings:{
      foreignKeys: {
        fk_distance_id_location_origin: {
          name: 'fk_distance_id_location_origin',
          entity: 'Location',
          entityKey: 'id',
          foreignKey: 'idLocationOrigen',
        },
        fk_distance_id_location_destination: {
          name: 'fk_distance_id_location_destination',
          entity: 'Location',
          entityKey: 'id',
          foreignKey: 'idLocationDestination',
        },
      },
    }
  }
)
export class Distance extends Entity {
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
  distancePunto: number;


  @belongsTo(() => Location, {name: 'origin'})
  idLocationOrigen: number;

  @belongsTo(() => Location, {name: 'Destination'})
  idLocationDestination: number;

  constructor(data?: Partial<Distance>) {
    super(data);
  }
}

export interface DistanceRelations {
  // describe navigational properties here
}

export type DistanceWithRelations = Distance & DistanceRelations;
