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

    this.setCoords();
  }

  private setCoords(): void {
    switch (this.direction) {
      case 'n':
        this.lineCoords = [
          [this.source.x + MapUtils.NodeHalfSide, this.source.y],
          [this.target.x + MapUtils.NodeHalfSide, this.target.y + MapUtils.NodeSide]
        ];
        this.doorCoords = [
          this.lineCoords[0][0] + 10,
          this.lineCoords[0][1] - Math.abs(this.lineCoords[0][1] - this.lineCoords[1][1]) / 2 - 15,
        ];
        break;
      case 'e':
        this.lineCoords = [
          [this.source.x + MapUtils.NodeSide, this.source.y + MapUtils.NodeHalfSide],
          [this.target.x, this.target.y + MapUtils.NodeHalfSide]
        ];
        this.doorCoords = [
          this.lineCoords[0][0] + Math.abs(this.lineCoords[0][0] - this.lineCoords[1][0]) / 2 - 15,
          this.lineCoords[0][1] - 40
        ];
        break;
      case 's':
        this.lineCoords = [
          [this.source.x + MapUtils.NodeHalfSide, this.source.y + MapUtils.NodeSide],
          [this.target.x + MapUtils.NodeHalfSide, this.target.y]
        ];
        this.doorCoords = [
          this.lineCoords[0][0] + 10,
          this.lineCoords[0][1] + Math.abs(this.lineCoords[0][1] - this.lineCoords[1][1]) / 2 - 15,
        ];
        break;
      case 'w':
        this.lineCoords = [
          [this.source.x, this.source.y + MapUtils.NodeHalfSide],
          [this.target.x + MapUtils.NodeSide, this.target.y + MapUtils.NodeHalfSide]
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

