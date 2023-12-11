import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_admin_userId: {
        name: 'fk_admin_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userId',
      },
    },
  },
})
export class Admin extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
