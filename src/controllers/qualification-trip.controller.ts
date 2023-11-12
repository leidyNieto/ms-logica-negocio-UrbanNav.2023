import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Qualification,
  Trip,
} from '../models';
import {QualificationRepository} from '../repositories';

export class QualificationTripController {
  constructor(
    @repository(QualificationRepository)
    public qualificationRepository: QualificationRepository,
  ) { }

  @get('/qualifications/{id}/trip', {
    responses: {
      '200': {
        description: 'Trip belonging to Qualification',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Trip),
          },
        },
      },
    },
  })
  async getTrip(
    @param.path.number('id') id: typeof Qualification.prototype.id,
  ): Promise<Trip> {
    return this.qualificationRepository.trip(id);
  }
}
