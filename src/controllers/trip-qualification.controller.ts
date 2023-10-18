import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Trip,
  Qualification,
} from '../models';
import {TripRepository} from '../repositories';

export class TripQualificationController {
  constructor(
    @repository(TripRepository) protected tripRepository: TripRepository,
  ) { }

  @get('/trips/{id}/qualifications', {
    responses: {
      '200': {
        description: 'Array of Trip has many Qualification',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Qualification)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Qualification>,
  ): Promise<Qualification[]> {
    return this.tripRepository.qualifications(id).find(filter);
  }

  @post('/trips/{id}/qualifications', {
    responses: {
      '200': {
        description: 'Trip model instance',
        content: {'application/json': {schema: getModelSchemaRef(Qualification)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Trip.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qualification, {
            title: 'NewQualificationInTrip',
            exclude: ['id'],
            optional: ['tripId']
          }),
        },
      },
    }) qualification: Omit<Qualification, 'id'>,
  ): Promise<Qualification> {
    return this.tripRepository.qualifications(id).create(qualification);
  }

  @patch('/trips/{id}/qualifications', {
    responses: {
      '200': {
        description: 'Trip.Qualification PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qualification, {partial: true}),
        },
      },
    })
    qualification: Partial<Qualification>,
    @param.query.object('where', getWhereSchemaFor(Qualification)) where?: Where<Qualification>,
  ): Promise<Count> {
    return this.tripRepository.qualifications(id).patch(qualification, where);
  }

  @del('/trips/{id}/qualifications', {
    responses: {
      '200': {
        description: 'Trip.Qualification DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Qualification)) where?: Where<Qualification>,
  ): Promise<Count> {
    return this.tripRepository.qualifications(id).delete(where);
  }
}
