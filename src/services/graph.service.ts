import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Edge} from '../grafo/edge';
import {Graph} from '../grafo/graph';
import {Node} from '../grafo/node';
import {DistanceRepository, StopRepository} from '../repositories';


@injectable({scope: BindingScope.TRANSIENT})
export class GraphService {
  constructor(
    @repository(StopRepository)
    private stopRepository : StopRepository,
    @repository(DistanceRepository)
    private distanceRepository : DistanceRepository,
  ) {}

  /*
   * Add service methods here
   */

  //construya el gráfico basado en la base de datos, los nodos son stop y las aristas  es la distance
  async buildGraph(): Promise<Graph> {
    const stops = await this.stopRepository.find();
    const nodes: Node[] = [];

      for await (const stop of stops) {

        const distances = await this.distanceRepository.find({
          where:{
            idOrigen: stop.id!
          }
        });
        const edges:Edge[] = [];
        // convierte las distancias en aristas
        for await (const distance of distances) {
          const destination = await this.stopRepository.findById(distance.idDestino);
        //convertir este destination en un nodo
        const nodo = new Node(destination.id!,destination.name!,destination.key!);
        edges.push(new Edge(nodo, distance.distancePunto!));
        }
      nodes.push(new Node(stop.id! , stop.name!, stop.key!, edges));
    }
    return new Graph(nodes);
  }

  //imprime el gráfico nodo por nodo con aristas en la consola
  printGraph(graph: Graph) {
    const nodes = graph.getNodes();
    for (const node of nodes) {
      console.log(node);
    }
  }

}
