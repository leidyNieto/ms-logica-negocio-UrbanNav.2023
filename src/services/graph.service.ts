import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Edge} from '../grafo/edge';
import {Graph} from '../grafo/graph';
import {Node} from '../grafo/node';
import {Distance} from '../models';
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
        const node = new Node(destination.id!.toString(), destination.name, destination.key);
        edges.push(new Edge(node, distance.distancePunto));
      }

      nodes.push(new Node(location.id!.toString(), location.name, location.key, edges));
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
  //Función para encontrar el camino mas corto entre origen y destino ingresados, y que devuelva el costo del viaje segun el grafo creado
  async dijkstra(startNodeId: string, endNodeId: string): Promise<any> {
    const distances: Record<string, number> = {};
    const visited: Record<string, boolean> = {};
    const previousNodes: Record<string, string | null> = {};

    // Obtén el grafo, asumí que hay una función buildGraph en tu clase
    const graph = await this.buildGraph();

    const nodes = graph.getNodes();

    // Inicialización de distancias y nodos anteriores
    nodes.forEach((node) => {
      distances[node.getId()] = Infinity;
      visited[node.getId()] = false;
      previousNodes[node.getId()] = null;
    });

    distances[startNodeId] = 0;

    // Función auxiliar para encontrar el nodo no visitado con la menor distancia
    const findMinDistanceNode = () => {
      let minDistance = Infinity;
      let minNodeId = null;
      for (const nodeId in distances) {
        if (!visited[nodeId] && distances[nodeId] < minDistance) {
          minDistance = distances[nodeId];
          minNodeId = nodeId;
        }
      }
      return minNodeId;
    };

    // Algoritmo de Dijkstra
    for (let i = 0; i < nodes.length; i++) {
      const currentNodeId = findMinDistanceNode();

      if (currentNodeId === null || distances[currentNodeId] === Infinity) {
        break; // Todos los nodos inalcanzables han sido visitados
      }

      const currentNode = graph.getNodeById(currentNodeId);
      visited[currentNodeId] = true;

      // Actualizar distancias y nodos anteriores para los nodos vecinos
      currentNode?.getEdges().forEach((edge) => {
        const neighborNodeId = edge.getNode().getId();
        const tentativeDistance = distances[currentNodeId] + edge.getWeight();

        if (tentativeDistance < distances[neighborNodeId]) {
          distances[neighborNodeId] = tentativeDistance;
          previousNodes[neighborNodeId] = currentNodeId;
        }
      });
    }

    // Reconstruir el camino más corto desde el nodo de inicio al nodo de destino
    const path: string[] = [];
    let currentNodeId: string | null = endNodeId;

    while (currentNodeId !== null) {
      path.unshift(currentNodeId);
      currentNodeId = previousNodes[currentNodeId] ?? null;
    }

    // Calcular el costo del viaje utilizando tu función calcularPrecioRecorrido
    const idRecorrido: number = parseInt(path[path.length - 1], 10);
    const costoDelViaje = await this.calcularPrecioRecorrido(idRecorrido);

    return { path, costoDelViaje };

  }

  async calcularPrecioRecorrido(idRecorrido: number): Promise<any> {
    let recorrido: Distance = await this.distanceRepository.findById(idRecorrido);
    let precioPorKmSeguridad = 500
    console.log(precioPorKmSeguridad);
    let precio = recorrido.distancePunto * precioPorKmSeguridad;
    return {
      precio,
      recorrido,
    };
  }
}
