import { LinkMidpoint, LinkOffset, Orientation, NodeHalfSide, NodeSide } from '../constants/map.constants';
import { Node } from './node.model';

export class Link {

  public points: number[][];

  constructor(
    public id: string,
    public source: Node,
    public target: Node,
    public orientation: Orientation
  ) {
    switch (this.orientation) {
      case Orientation.North:
        this.points = [
          [source.x + NodeHalfSide, source.y],
          [source.x + NodeHalfSide - LinkOffset, source.y - LinkMidpoint],
          [target.x + NodeHalfSide, target.y + NodeSide]
        ];
        break;
      case Orientation.East:
        this.points = [
          [source.x + NodeSide, source.y + NodeHalfSide],
          [source.x + NodeSide + LinkMidpoint, source.y + NodeHalfSide - LinkOffset],
          [target.x, target.y + NodeHalfSide]
        ];
        break;
      case Orientation.South:
        this.points = [
          [source.x + NodeHalfSide, source.y + NodeSide],
          [source.x + NodeHalfSide + LinkOffset, source.y + NodeSide + LinkMidpoint],
          [target.x + NodeHalfSide, target.y]
        ];
        break;
      case Orientation.West:
        this.points = [
          [source.x, source.y + NodeHalfSide],
          [source.x - LinkMidpoint, source.y + NodeHalfSide + LinkOffset],
          [target.x + NodeSide, target.y + NodeHalfSide]
        ];
        break;
    }
  }

}
