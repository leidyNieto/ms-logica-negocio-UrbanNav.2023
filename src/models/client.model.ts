import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_client_userId: {
          name: 'fk_client_userId',
          entity: 'User',
          entityKey: 'id',
          foreignKey: 'userId',
        },
      },
    },
  },
)
export class Client extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  address?: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
