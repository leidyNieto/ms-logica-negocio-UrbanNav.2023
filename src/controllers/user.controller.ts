import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {BotonPanico, Pqrs, User} from '../models';
import {UserRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/user')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get('/user/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/user')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/user')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/user/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/user/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/user/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/user/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
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
