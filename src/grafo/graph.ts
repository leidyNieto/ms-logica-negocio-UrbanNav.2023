//clase grafo

import {Node} from './node';

export class Graph{
  nodes:Node[]

  constructor(nodos:Node[]){
    this.nodes = [];
  }

  //agregueme un nodo al grafo
  addNode(node:Node){
    this.nodes.push(node);
  }

  //agregueme el set y get de los nodos
  getNodes(){
    return this.nodes;
  }

  setNodes(nodes:Node[]){
    this.nodes = nodes;
  }

  //agregueme el metodo para obtener un nodo por id
  getNodeById(id:number){
    for(let i = 0; i < this.nodes.length; i++){
      if(this.nodes[i].getId() == id){
        return this.nodes[i];
      }
    }
    return null;
  }


  //agregueme el metodo para obtener un nodo por label(tiqueta)
  getNodeByLabel(label:string){
    for(let i = 0; i < this.nodes.length; i++){
      if(this.nodes[i].getLabel() == label){
        return this.nodes[i];
      }
    }
    return null;
  }

  //mostrar el grafo por consola
  showGraph(){
    console.log(this.nodes);
  }

  showGraphNodes(){
    this.nodes.forEach(node => {
      console.log(node);
    });
  }





}
