import {Entity, model, property} from '@loopback/repository';

@model()
export class Driver extends Entity {
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
  numeroLicencia: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencimientoLicencia: string;


  constructor(data?: Partial<Driver>) {
    super(data);
  }
}

export interface DriverRelations {
  // describe navigational properties here
}

export type DriverWithRelations = Driver & DriverRelations;
