import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Location} from './location.model';
import {Qualification} from './qualification.model';

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

  @property({
    type: 'number',
  })
  driverId?: number;

  @hasMany(() => Qualification)
  qualifications: Qualification[];

  @belongsTo(() => Location)
  locationId: number;

  @property({
    type: 'number',
  })
  clientId?: number;

  constructor(data?: Partial<Trip>) {
    super(data);
  }
}

export interface TripRelations {
  // describe navigational properties here
}

export type TripWithRelations = Trip & TripRelations;
