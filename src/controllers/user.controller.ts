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
import {User} from '../models';
import {ClientRepository, DriverRepository, UserRepository} from '../repositories';
import {NotificacionesService, RegistroSeguridadService} from '../services';
import { exist, exists } from 'should';
import { configuracionSeguridad } from '../config/seguridad.config';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(RegistroSeguridadService)
    public servicioRegistroSeguridad: RegistroSeguridadService,
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
    @repository(DriverRepository)
    public driverRepository: DriverRepository,
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
     // Crear el usuario en el servicio de lógica
  const UsuarioCreadoEnLogica = await this.userRepository.create(user);

  //constantes de los roles
  const clienteSeguridadId = configuracionSeguridad.clienteSeguridadId;
  const conductorSeguridadId = configuracionSeguridad.conductorSeguridadId;     
  
  // Verificar si el usuario es un cliente
     const clienteExistente = await this.clientRepository.findOne({
      where: {
        userId: UsuarioCreadoEnLogica.id,
      },
    });

    if (clienteExistente) {
    // Crear el usuario en el servicio de seguridad utilizando los datos del usuario en la lógica
      await this.servicioRegistroSeguridad.CrearUsuarioEnSeguridad({
        nombre: UsuarioCreadoEnLogica.Name,
        correo: UsuarioCreadoEnLogica.email,
        apellido: UsuarioCreadoEnLogica.Lastname,
        telefono: UsuarioCreadoEnLogica.phone,
        clave: UsuarioCreadoEnLogica.password,
        rolId: clienteSeguridadId,
      });
    }

    // Verificar si el usuario es un conductor
    const conductorExistente = await this.driverRepository.findOne({
      where: {
        userId: UsuarioCreadoEnLogica.id,
      },
    });

    if (conductorExistente) {
      // Crear el usuario en el servicio de seguridad utilizando los datos del usuario en la lógica
      await this.servicioRegistroSeguridad.CrearUsuarioEnSeguridad({
        nombre: UsuarioCreadoEnLogica.Name,
        correo: UsuarioCreadoEnLogica.email,
        apellido: UsuarioCreadoEnLogica.Lastname,
        telefono: UsuarioCreadoEnLogica.phone,
        clave: UsuarioCreadoEnLogica.password,
        rolId: conductorSeguridadId,
      });
    }

  return UsuarioCreadoEnLogica; 
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
}
