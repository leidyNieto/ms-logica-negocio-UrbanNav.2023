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
import {Stop} from '../models';
import {StopRepository} from '../repositories';

export class StopController {
  constructor(
    @repository(StopRepository)
    public stopRepository : StopRepository,
  ) {}

  @post('/stop')
  @response(200, {
    description: 'Stop model instance',
    content: {'application/json': {schema: getModelSchemaRef(Stop)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stop, {
            title: 'NewStop',
            exclude: ['id'],
          }),
        },
      },
    })
    stop: Omit<Stop, 'id'>,
  ): Promise<Stop> {
    return this.stopRepository.create(stop);
  }

  @get('/stop/count')
  @response(200, {
    description: 'Stop model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Stop) where?: Where<Stop>,
  ): Promise<Count> {
    return this.stopRepository.count(where);
  }

  @get('/stop')
  @response(200, {
    description: 'Array of Stop model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Stop, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Stop) filter?: Filter<Stop>,
  ): Promise<Stop[]> {
    return this.stopRepository.find(filter);
  }

  @patch('/stop')
  @response(200, {
    description: 'Stop PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stop, {partial: true}),
        },
      },
    })
    stop: Stop,
    @param.where(Stop) where?: Where<Stop>,
  ): Promise<Count> {
    return this.stopRepository.updateAll(stop, where);
  }

  @get('/stop/{id}')
  @response(200, {
    description: 'Stop model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Stop, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Stop, {exclude: 'where'}) filter?: FilterExcludingWhere<Stop>
  ): Promise<Stop> {
    return this.stopRepository.findById(id, filter);
  }

  @patch('/stop/{id}')
  @response(204, {
    description: 'Stop PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stop, {partial: true}),
        },
      },
    })
    stop: Stop,
  ): Promise<void> {
    await this.stopRepository.updateById(id, stop);
  }

  @put('/stop/{id}')
  @response(204, {
    description: 'Stop PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() stop: Stop,
  ): Promise<void> {
    await this.stopRepository.replaceById(id, stop);
  }

  @del('/stop/{id}')
  @response(204, {
    description: 'Stop DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.stopRepository.deleteById(id);
  }
}
