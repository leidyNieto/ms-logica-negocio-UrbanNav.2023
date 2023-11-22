import {Entity, model, property} from '@loopback/repository';

@model(
)
export class User extends Entity {
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
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoident: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroident: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',

  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
