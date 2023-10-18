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
import {Qualification} from '../models';
import {QualificationRepository} from '../repositories';

export class QualificationController {
  constructor(
    @repository(QualificationRepository)
    public qualificationRepository : QualificationRepository,
  ) {}

  @post('/Qualification')
  @response(200, {
    description: 'Qualification model instance',
    content: {'application/json': {schema: getModelSchemaRef(Qualification)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qualification, {
            title: 'NewQualification',
            exclude: ['id'],
          }),
        },
      },
    })
    qualification: Omit<Qualification, 'id'>,
  ): Promise<Qualification> {
    return this.qualificationRepository.create(qualification);
  }

  @get('/Qualification/count')
  @response(200, {
    description: 'Qualification model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Qualification) where?: Where<Qualification>,
  ): Promise<Count> {
    return this.qualificationRepository.count(where);
  }

  @get('/Qualification')
  @response(200, {
    description: 'Array of Qualification model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Qualification, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Qualification) filter?: Filter<Qualification>,
  ): Promise<Qualification[]> {
    return this.qualificationRepository.find(filter);
  }

  @patch('/Qualification')
  @response(200, {
    description: 'Qualification PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qualification, {partial: true}),
        },
      },
    })
    qualification: Qualification,
    @param.where(Qualification) where?: Where<Qualification>,
  ): Promise<Count> {
    return this.qualificationRepository.updateAll(qualification, where);
  }

  @get('/Qualification/{id}')
  @response(200, {
    description: 'Qualification model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Qualification, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Qualification, {exclude: 'where'}) filter?: FilterExcludingWhere<Qualification>
  ): Promise<Qualification> {
    return this.qualificationRepository.findById(id, filter);
  }

  @patch('/Qualification/{id}')
  @response(204, {
    description: 'Qualification PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qualification, {partial: true}),
        },
      },
    })
    qualification: Qualification,
  ): Promise<void> {
    await this.qualificationRepository.updateById(id, qualification);
  }

  @put('/Qualification/{id}')
  @response(204, {
    description: 'Qualification PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() qualification: Qualification,
  ): Promise<void> {
    await this.qualificationRepository.replaceById(id, qualification);
  }

  @del('/Qualification/{id}')
  @response(204, {
    description: 'Qualification DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.qualificationRepository.deleteById(id);
  }
}
