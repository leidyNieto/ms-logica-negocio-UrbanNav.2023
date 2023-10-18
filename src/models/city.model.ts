import {Entity, hasMany, model, property} from '@loopback/repository';
import {Location} from './location.model';

@model(
  {
    settings:{
      foreignKeys:{
        fk_location_id:{
          name:'fk_location_id',
          entity:'Location',
          entityKey:'id',
          foreignKey:'locationId'
        }
      }
    }
  }
)
export class City extends Entity {
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

  @hasMany(() => Location)
  locations: Location[];

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
