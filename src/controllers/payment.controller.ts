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
import {Factura, Payment} from '../models';
import {PaymentRepository} from '../repositories';
import { ConfiguracionNotificaciones } from '../config/notificaciones.config';
import { NotificacionesService } from '../services';
import { service } from '@loopback/core';

export class PaymentController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository : PaymentRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) {}

  @post('/payment')
  @response(200, {
    description: 'Payment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Payment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
            exclude: ['id'],
          }),
        },
      },
    })
    payment: Omit<Payment, 'id '>,
  ): Promise<Payment> {
    return this.paymentRepository.create(payment);
  }

  @get('/payment/count')
  @response(200, {
    description: 'Payment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Payment) where?: Where<Payment>,
  ): Promise<Count> {
    return this.paymentRepository.count(where);
  }

  @get('/payment')
  @response(200, {
    description: 'Array of Payment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Payment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Payment) filter?: Filter<Payment>,
  ): Promise<Payment[]> {
    return this.paymentRepository.find(filter);
  }

  @patch('/payment')
  @response(200, {
    description: 'Payment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Payment,
    @param.where(Payment) where?: Where<Payment>,
  ): Promise<Count> {
    return this.paymentRepository.updateAll(payment, where);
  }

  @get('/payment/{id}')
  @response(200, {
    description: 'Payment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Payment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Payment, {exclude: 'where'}) filter?: FilterExcludingWhere<Payment>
  ): Promise<Payment> {
    return this.paymentRepository.findById(id, filter);
  }

  @patch('/payment/{id}')
  @response(204, {
    description: 'Payment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Payment,
  ): Promise<void> {
    await this.paymentRepository.updateById(id, payment);
  }

  @put('/payment/{id}')
  @response(204, {
    description: 'Payment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() payment: Payment,
  ): Promise<void> {
    await this.paymentRepository.replaceById(id, payment);
  }

  @del('/payment/{id}')
  @response(204, {
    description: 'Payment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paymentRepository.deleteById(id);
  }

  @post('/enviar-factura')
  @response(200, {
    description: 'Enviar factura de viaje al usuario',
    content: {'application/json': {schema: getModelSchemaRef(Factura)}},
  })
  async EnviarNotificacion(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          }
        }
      }
    )
    factura: Factura
  ): Promise<object> {
    let datos = {
      nombre: factura.nombre,
      fecha: factura.fecha,
      costo: factura.costo,
      correo: factura.correo

      // mensaje: ``,

    };
    let url = ConfiguracionNotificaciones.urlNotificacionesFactura;
    this.servicioNotificaciones.EnviarNotificacion(datos, url);
    return datos;
  }
}
