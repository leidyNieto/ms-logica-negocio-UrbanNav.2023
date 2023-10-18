import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Payment,
  Client,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentClientController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Payment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof Payment.prototype.id,
  ): Promise<Client> {
    return this.paymentRepository.client(id);
  }
}
