import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Driver} from './driver.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_cars_driverId: {
          name: 'fk_cars_driverId',
          entity: 'Driver',
          entityKey: 'id',
          foreignKey: 'driverId',
        },
      },
    },
  },
)
export class Cars extends Entity {
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
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  capacity: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  soat: string;

  @property({
    type: 'string',
    required: true,
  })
  tecnomecanico: string;

  @property({
    type: 'string',
    required: true,
  })
  plate: string;

  @belongsTo(() => Driver)
  driverId: number;

  constructor(data?: Partial<Cars>) {
    super(data);
  }
}

export interface CarsRelations {
  // describe navigational properties here
}

export type CarsWithRelations = Cars & CarsRelations;
