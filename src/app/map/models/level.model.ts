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

  public findNode(id: number): Node {
    return _.find(
      this.nodes,
      (node: Node): boolean => {
        return node.room.id === id;
      }
    );
  }

  public containsNode(id: number): boolean {
    return !!this.findNode(id);
  }

}
