import { Orientation } from '../constants/directions.constant';
import { Node } from './node.model';

export class Link {

  public points: number[][];

  private readonly CurveOffset: number = 20;

  private middlePoint(p1: number, p2: number): number {
    return p1 + (p2 - p1) / 2;
  }

  constructor(
    public id: string,
    public source: Node,
    public target: Node,
    public orientation: Orientation
  ) {
    switch (this.orientation) {
      case Orientation.Up:
        this.points = [
          [source.x, source.y],
          [source.x - this.CurveOffset, this.middlePoint(source.y, target.y)],
          [target.x, target.y]
        ];
        break;
      case Orientation.Right:
        this.points = [
          [source.x, source.y],
          [this.middlePoint(source.x, target.x), source.y + this.CurveOffset],
          [target.x, target.y]
        ];
        break;
      case Orientation.Down:
        this.points = [
          [source.x, source.y],
          [source.x + this.CurveOffset, this.middlePoint(source.y, target.y)],
          [target.x, target.y]
        ];
        break;
      case Orientation.Left:
        this.points = [
          [source.x, source.y],
          [this.middlePoint(source.x, target.x), source.y - this.CurveOffset],
          [target.x, target.y]
        ];
        break;
    }
  }

}
