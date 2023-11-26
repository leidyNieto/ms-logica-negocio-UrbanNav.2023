import {Model, model, property} from '@loopback/repository';

@model()
export class Pqrs extends Model {
  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<Pqrs>) {
    super(data);
  }
}

export interface PqrsRelations {
  // describe navigational properties here
}

export type PqrsWithRelations = Pqrs & PqrsRelations;
