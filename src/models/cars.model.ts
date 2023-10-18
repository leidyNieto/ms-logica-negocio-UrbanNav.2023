import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings:{
      foreignKeys:{
        fk_driver_id:{
          name:'fk_driver_id',
          entity:'Driver',
          entityKey:'id',
          foreignKey:'driverId'
        }
      }
    }
  }
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
  plate: string;

  @property({
    type: 'number',
  })
  driverId?: number;

  constructor(data?: Partial<Cars>) {
    super(data);
  }
}

export interface CarsRelations {
  // describe navigational properties here
}

export type CarsWithRelations = Cars & CarsRelations;
