import { Node } from './node.model';
import { Link as Link } from './link.model';
import * as _ from 'underscore';

export class Level {

  constructor(
    public z: number,
    public nodes: Node[] = [],
    public links: Link[] = []
  ) {

  }

  public containsNode(id: number): boolean {
    return _.map(
      this.nodes,
      (node: Node): number => {
        return node.room.id
      }
    ).includes(id);
  }

}
