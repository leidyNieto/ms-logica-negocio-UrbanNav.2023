import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Edge} from '../grafo/edge';
import {Graph} from '../grafo/graph';
import {Node} from '../grafo/node';
import {DistanceRepository, LocationRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class GraphService {
  constructor(
    @repository(LocationRepository)
    private locationRepository: LocationRepository,
    @repository(DistanceRepository)
    private distanceRepository: DistanceRepository
  ) { }

  /*
   * Add service methods here
   */

  async buildGraph(): Promise<Graph> {
    const locations = await this.locationRepository.find();
    const nodes: Node[] = [];

    for await (const location of locations) {

      const distances = await this.distanceRepository.find({
        where: {
          idLocationOrigen: location.id!
        }
      });

      const edges: Edge[] = [];
      // convert distances to edges
      for await (const distance of distances) {
        const destination = await this.locationRepository.findById(distance.idLocationDestination);
        // convert destination in Node
        const node = new Node(destination.id!, destination.name, destination.key);
        edges.push(new Edge(node, distance.distancePunto));
      }

      nodes.push(new Node(location.id!, location.name, location.key, edges));
    }

    return new Graph(nodes);
  }

  // print the graph node by node with edges in console
  printGraph(graph: Graph) {
    const nodes = graph.getNodes();
    for (const node of nodes) {
      console.log(node);
    }
  }

  GetShortestRoute(graph: Graph, originId: string, destinationId: string) {

  }

}
