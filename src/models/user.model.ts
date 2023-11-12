import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Client} from './client.model';
import {Driver} from './driver.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_user_clientId: {
          name: 'fk_user_clientId',
          entity: 'Client',
          entityKey: 'id',
          foreignKey: 'clientId',
        },
        fk_user_driverId: {
          name: 'fk_user_driverId',
          entity: 'Driver',
          entityKey: 'id',
          foreignKey: 'driverId',
        },
      },
    },
  },
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
  })
  password?: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'number',
    required: true,
  })
  role: number;

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

  @belongsTo(() => Client)
  clientId: number;

  @belongsTo(() => Driver)
  driverId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
