import {Model, model, property} from '@loopback/repository';

@model()
export class BotonPanico extends Model {
  @property({
    type: 'string',
    required: true,
  })
  ruta: string;

  @property({
    type: 'string',
    required: true,
  })
  datos_conductor: string;

  @property({
    type: 'string',
    required: true,
  })
  datos_usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_telefono: string;


  constructor(data?: Partial<BotonPanico>) {
    super(data);
  }
}

export interface BotonPanicoRelations {
  // describe navigational properties here
}

export type BotonPanicoWithRelations = BotonPanico & BotonPanicoRelations;
