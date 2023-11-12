import {Entity, model, property} from '@loopback/repository';

@model(
   {
    settings: {
      foreignKeys: {
        fk_location_driver_locationId: {
          name: 'fk_location_driver_locationId',
          entity: 'Location',
          entityKey: 'id',
          foreignKey: 'locationId',
        },
        fk_location_driver_driverId: {
          name: 'fk_location_driver_driverId',
          entity: 'Driver',
          entityKey: 'id',
          foreignKey: 'driverId',
        },
      },
    },
   }
)
export class LocationDriver extends Entity {
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
  originDriver: string;

  @property({
    type: 'number',
  })
  locationId?: number;

  @property({
    type: 'number',
  })
  driverId?: number;

  constructor(data?: Partial<LocationDriver>) {
    super(data);
  }
}

export interface LocationDriverRelations {
  // describe navigational properties here
}

export type LocationDriverWithRelations = LocationDriver & LocationDriverRelations;
