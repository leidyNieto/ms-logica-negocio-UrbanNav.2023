import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {BotonPanico, Trip} from '../models';
import {TripRepository} from '../repositories';
import { ConfiguracionNotificaciones } from '../config/notificaciones.config';
import { service } from '@loopback/core';
import { NotificacionesService } from '../services';

export class TripController {
  constructor(
    @repository(TripRepository)
    public tripRepository : TripRepository,
    @service()
    public servicioNotificaciones: NotificacionesService
  ) {}

  @post('/trip')
  @response(200, {
    description: 'Trip model instance',
    content: {'application/json': {schema: getModelSchemaRef(Trip)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trip, {
            title: 'NewTrip',
            exclude: ['id'],
          }),
        },
      },
    })
    trip: Omit<Trip, 'id'>,
  ): Promise<Trip> {
    return this.tripRepository.create(trip);
  }

  @get('/trip/count')
  @response(200, {
    description: 'Trip model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Trip) where?: Where<Trip>,
  ): Promise<Count> {
    return this.tripRepository.count(where);
  }

  @get('/trip')
  @response(200, {
    description: 'Array of Trip model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Trip, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Trip) filter?: Filter<Trip>,
  ): Promise<Trip[]> {
    return this.tripRepository.find(filter);
  }

  @patch('/trip')
  @response(200, {
    description: 'Trip PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trip, {partial: true}),
        },
      },
    })
    trip: Trip,
    @param.where(Trip) where?: Where<Trip>,
  ): Promise<Count> {
    return this.tripRepository.updateAll(trip, where);
  }

  @get('/trip/{id}')
  @response(200, {
    description: 'Trip model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Trip, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Trip, {exclude: 'where'}) filter?: FilterExcludingWhere<Trip>
  ): Promise<Trip> {
    return this.tripRepository.findById(id, filter);
  }

  @patch('/trip/{id}')
  @response(204, {
    description: 'Trip PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trip, {partial: true}),
        },
      },
    })
    trip: Trip,
  ): Promise<void> {
    await this.tripRepository.updateById(id, trip);
  }

  @put('/trip/{id}')
  @response(204, {
    description: 'Trip PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() trip: Trip,
  ): Promise<void> {
    await this.tripRepository.replaceById(id, trip);
  }

  @del('/trip/{id}')
  @response(204, {
    description: 'Trip DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tripRepository.deleteById(id);
  }

  @post('/pedir-ayuda')
  @response(200, {
    description: 'Envia los datos del usuario del viaje aun correo de ayuda',
    content: {'application/json': {schema: getModelSchemaRef(BotonPanico)}},
  })
  async Botondepanico(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(BotonPanico),
          }
        }
      }
    )
    boton: BotonPanico
  ): Promise<object> {
    let datos = {
      ruta: boton.ruta,
      datos_conductor: boton.datos_conductor,
      datos_usuario: boton.datos_usuario,
      numero_telefono: boton.numero_telefono,

      // mensaje: ``,

    };
    let url = ConfiguracionNotificaciones.urlNotificacionesPanico;
    this.servicioNotificaciones.EnviarNotificacion(datos, url);
    return datos;
  }
}
