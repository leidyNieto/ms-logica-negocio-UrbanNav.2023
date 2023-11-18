//clase arista para el grafo con nodo y peso

import {Node} from './node';

export class Edge{
  node:Node
  weight:number

  constructor(node:Node, weight:number){
    this.node = node;
    this.weight = weight;
  }

  //agregueme el set y get del nodo
  getNode(){
    return this.node;
  }

  setNode(node:Node){
    this.node = node;
  }

  //agregueme el set y get del peso
  getWeight(){
    return this.weight;
  }

  setWeight(weight:number){
    this.weight = weight;
  }
}
