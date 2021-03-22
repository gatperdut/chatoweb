import { Node } from './node.model';
import { Link as Link } from './link.model';
import * as _ from 'underscore';
import { MapVector } from '../constants/map.constants';

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
        return node.id === id;
      }
    );
  }

  public containsNode(id: number): boolean {
    return !!this.findNode(id);
  }

  public nodeAt(mapVector: MapVector): Node {
    if (this.z !== mapVector.z) {
      throw new Error ('Searching for Node in Level with mismatched z coordinate.');
    }

    return _.find(
      this.nodes,
      (node: Node): boolean => node.locatedAt(mapVector)
    )
  }

  public linkBetween(source: Node, target: Node): Link {
    return _.find(this.links, { id: source.idString + '_' + target.idString });
  }

}
