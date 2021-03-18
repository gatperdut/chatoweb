import { Node } from './node.model';
import { Edge } from './edge.model';
import * as _ from 'underscore';

export class Level {

  constructor(
    public z: number,
    public nodes: Node[] = [],
    public edges: Edge[] = []
  ) {

  }

  public containsNode(id: number): boolean {
    return _.pluck(this.nodes, 'id').includes(id);
  }

}
