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
  Trip,
} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentTripController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) { }

  @get('/payments/{id}/trip', {
    responses: {
      '200': {
        description: 'Trip belonging to Payment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Trip),
          },
        },
      },
    },
  })
  async getTrip(
    @param.path.number('id') id: typeof Payment.prototype.id,
  ): Promise<Trip> {
    return this.paymentRepository.trip(id);
  }
}
