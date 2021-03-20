import { LinkMidpoint, LinkOffset, Orientation, RoomHalfSide, RoomSide } from '../constants/map.constants';
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
          [source.x + RoomHalfSide, source.y],
          [source.x + RoomHalfSide - LinkOffset, source.y - LinkMidpoint],
          [target.x + RoomHalfSide, target.y + RoomSide]
        ];
        break;
      case Orientation.East:
        this.points = [
          [source.x + RoomSide, source.y + RoomHalfSide],
          [source.x + RoomSide + LinkMidpoint, source.y + RoomHalfSide - LinkOffset],
          [target.x, target.y + RoomHalfSide]
        ];
        break;
      case Orientation.South:
        this.points = [
          [source.x + RoomHalfSide, source.y + RoomSide],
          [source.x + RoomHalfSide + LinkOffset, source.y + RoomSide + LinkMidpoint],
          [target.x + RoomHalfSide, target.y]
        ];
        break;
      case Orientation.West:
        this.points = [
          [source.x, source.y + RoomHalfSide],
          [source.x - LinkMidpoint, source.y + RoomHalfSide + LinkOffset],
          [target.x + RoomSide, target.y + RoomHalfSide]
        ];
        break;
    }
  }

}
