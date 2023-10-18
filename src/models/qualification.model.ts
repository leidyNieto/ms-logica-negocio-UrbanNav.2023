import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings:{
      foreignKeys:{
        fk_trip_id:{
          name:'fk_trip_id',
          entity:'Trip',
          entityKey:'id',
          foreignKey:'tripId'
        }
      }
    }
  }
)
export class Qualification extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: false,
  })
  qualificationClient: string;

  @property({
    type: 'string',
    required: false,
  })
  qualificationDriver: string;

  @property({
    type: 'string',
    required: false,
  })
  commetClient: string;

  @property({
    type: 'string',
    required: false,
  })
  commetDriver?: string;

  @property({
    type: 'date',
    required: true,
  })
  Date: string;

  @property({
    type: 'number',
  })
  tripId?: number;

  constructor(data?: Partial<Qualification>) {
    super(data);
  }
}

export interface QualificationRelations {
  // describe navigational properties here
}

export type QualificationWithRelations = Qualification & QualificationRelations;
