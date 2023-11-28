import { post, requestBody } from '@loopback/rest';
import { response } from '@loopback/rest';
import { getModelSchemaRef } from '@loopback/openapi-v3';
import { Pqrs } from '../models/pqrs.model';
import { ConfiguracionNotificaciones } from '../config/notificaciones.config';
import { repository } from '@loopback/repository';
import { service } from '@loopback/core';
import { NotificacionesService } from '../services';
// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


export class PqrsController {

  constructor(
      @service()
      public servicioNotificaciones: NotificacionesService
  ) {}
  @post('/enviar-pqrs')

  @response(200, {
    description: 'Enviar un mensaje PQRS al administrador',
    content: {'application/json': {schema: getModelSchemaRef(Pqrs)}},
  })
  async EnviarPQRS(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pqrs),
            // order: ['tipo', 'mensaje']
          }
        }
      }
    )
    pqrss: Pqrs
  ): Promise<object> {
    let mensaje = pqrss.mensaje;
    console.log(mensaje);
    //notificar al usuario por ses
    let datos = {
      tipo: pqrss.tipo,
      mensaje: `Su mensaje PQRS es: ${mensaje}, y el tipo es: ${pqrss.tipo}`,

    };
    let url = ConfiguracionNotificaciones.urlNotificacionesPQRS;
    this.servicioNotificaciones.EnviarNotificacion(datos, url);
    return datos;
  }
}
