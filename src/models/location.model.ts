import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {City} from './city.model';
import {Driver} from './driver.model';
import {LocationDriver} from './location-driver.model';

@model(
 {
  settings:{
    foreignKeys: {
      fk_location_city: {
        name: 'fk_location_city',
        entity: 'City',
        entityKey: 'id',
        foreignKey: 'cityId',
      },
    },
  },
  }
)
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

  @hasMany(() => Driver, {through: {model: () => LocationDriver}})
  drivers: Driver[];

  @belongsTo(() => City)
  cityId: number;

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
