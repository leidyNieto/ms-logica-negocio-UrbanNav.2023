import {service} from '@loopback/core';
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Graph} from '../grafo/graph';
import {GraphService} from '../services';

export class GraphController {
  constructor(
    @service(GraphService)
    private graphService: GraphService
  ) { }

  @get('/build-graph')
  @response(200, {
    description: 'Build the graph based on db records',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Graph),
        },
      },
    },
  })
  async graph(

  ): Promise<Graph> {
    let graph = await this.graphService.buildGraph();
    this.graphService.printGraph(graph);
    return graph;
  }

//implementar algoritmo dijkstra en post
@post('/distanciadeViaje')
@response(200, {
  description: 'Dijkstra algorithm',
  content: {
    'application/json': {
      schema: {
        type: 'number',
      },
    },
  },
})
async costodeViaje(
  @requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            startNodeId: {type: 'string'},
            endNodeId: {type: 'string'},
          },
        },
      },
    },
  })
  requestParams: {startNodeId: string, endNodeId: string},
): Promise<number> {
  const {startNodeId, endNodeId} = requestParams;
  let cost = await this.graphService.dijkstra(startNodeId, endNodeId);
  console.log(cost);
  return cost;

}}
