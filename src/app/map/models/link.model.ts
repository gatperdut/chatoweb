import { Door } from 'src/app/rooms/models/door.model';
import { DirectionStringIndex, MapUtils } from '../constants/map.constants';
import { Level } from './level.model';
import { Node } from './node.model';
import { World } from './world.model';

export class Link {

  public id: string;

  public lineCoords: number[][];

  public doorCoords: number[];

  public direction: DirectionStringIndex;

  constructor(
    public world: World,
    public source: Node,
    public target: Node,
    public door: Door
  ) {
    this.id = source.idString + '_' + target.idString;

    this.direction = MapUtils.directionFromCoords(source, target);

    switch (this.direction) {
      case 'n':
        this.lineCoords = [
          [source.x + MapUtils.NodeHalfSide, source.y],
          [target.x + MapUtils.NodeHalfSide, target.y + MapUtils.NodeSide]
        ];
        this.doorCoords = [
          this.lineCoords[0][0] + 10,
          this.lineCoords[0][1] - Math.abs(this.lineCoords[0][1] - this.lineCoords[1][1]) / 2 - 15,
        ];
        break;
      case 'e':
        this.lineCoords = [
          [source.x + MapUtils.NodeSide, source.y + MapUtils.NodeHalfSide],
          [target.x, target.y + MapUtils.NodeHalfSide]
        ];
        this.doorCoords = [
          this.lineCoords[0][0] + Math.abs(this.lineCoords[0][0] - this.lineCoords[1][0]) / 2 - 15,
          this.lineCoords[0][1] - 40
        ];
        break;
      case 's':
        this.lineCoords = [
          [source.x + MapUtils.NodeHalfSide, source.y + MapUtils.NodeSide],
          [target.x + MapUtils.NodeHalfSide, target.y]
        ];
        this.doorCoords = [
          this.lineCoords[0][0] + 10,
          this.lineCoords[0][1] + Math.abs(this.lineCoords[0][1] - this.lineCoords[1][1]) / 2 - 15,
        ];
        break;
      case 'w':
        this.lineCoords = [
          [source.x, source.y + MapUtils.NodeHalfSide],
          [target.x + MapUtils.NodeSide, target.y + MapUtils.NodeHalfSide]
        ];
        this.doorCoords = [
          this.lineCoords[0][0] - Math.abs(this.lineCoords[0][0] - this.lineCoords[1][0]) / 2 - 15,
          this.lineCoords[0][1] - 40
        ];
        break;
    }
  }

  public isBetween(source: Node, target: Node): boolean {
    return (source.id === this.source.id && target.id === this.target.id) || (target.id === this.source.id && source.id === this.target.id);
  }

}

