import { Room } from "src/app/rooms/models/room.model";
import { MapIncrement, MapIncrements, MapIncrementStringIndex, MapVector, NodeOffset } from "../constants/map.constants";
import { Link } from "./link.model";
import { World } from "./world.model";

export class Node {

  public x: number;
  public y: number;
  public z: number;

  constructor(
    public world: World,
    public room: Room,
    public unitX: number,
    public unitY: number,
    public unitZ: number
  ) {
    this.x = this.unitX * NodeOffset;
    this.y = this.unitY * NodeOffset;
    this.z = this.unitZ * 1;
  }

  public get id(): number {
    return this.room.id;
  }

  public get idString(): string {
    return this.id.toString();
  }

  public adjacentMapVector(direction: string): MapVector {
    const mapVector: MapVector = MapIncrements[direction as MapIncrementStringIndex]

    return {
      x: this.unitX + mapVector.x,
      y: this.unitY + mapVector.y,
      z: this.unitZ + mapVector.z
    } as MapVector;
  }

  public locatedAt(mapVector: MapVector): boolean {
    return this.unitX === mapVector.x && this.unitY === mapVector.y && this.unitZ === mapVector.z;
  };

  public adjacentNode(direction: string): Node {
    const mapVector: MapVector = this.adjacentMapVector(direction);

    if (!this.world.validZ(mapVector.z)) {
      return null;
    }

    return this.world.nodeAt(mapVector);
  }

  public hasAdjacentNode(direction: string): boolean {
    return !!this.adjacentNode(direction);
  }

  public adjacentLink(direction: string): Link {
    const adjacentNode: Node = this.adjacentNode(direction);

    if (!adjacentNode) {
      return null;
    }

    return this.world.linkBetween(this, adjacentNode);
  }

  public hasAdjacentLink(direction: string): boolean {
    return !!this.adjacentLink(direction);
  }

}
