import { DirectionStringIndex, MapUtils } from '../constants/map.constants';
import { Level } from './level.model';
import { Node } from './node.model';
import { World } from './world.model';

export class Link {

  public id: string;

  public points: number[][];

  public direction: DirectionStringIndex;

  constructor(
    public world: World,
    public source: Node,
    public target: Node
  ) {
    this.id = source.idString + '_' + target.idString;

    this.direction = MapUtils.directionFromCoords(source, target);

    switch (this.direction) {
      case 'n':
        this.points = [
          [source.x + MapUtils.NodeHalfSide, source.y],
          [target.x + MapUtils.NodeHalfSide, target.y + MapUtils.NodeSide]
        ];
        break;
      case 'e':
        this.points = [
          [source.x + MapUtils.NodeSide, source.y + MapUtils.NodeHalfSide],
          [target.x, target.y + MapUtils.NodeHalfSide]
        ];
        break;
      case 's':
        this.points = [
          [source.x + MapUtils.NodeHalfSide, source.y + MapUtils.NodeSide],
          [target.x + MapUtils.NodeHalfSide, target.y]
        ];
        break;
      case 'w':
        this.points = [
          [source.x, source.y + MapUtils.NodeHalfSide],
          [target.x + MapUtils.NodeSide, target.y + MapUtils.NodeHalfSide]
        ];
        break;
    }
  }

  public isBetween(source: Node, target: Node): boolean {
    return source.id === this.source.id && target.id === this.target.id;
  }

}

