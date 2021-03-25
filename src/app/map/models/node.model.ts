import { Room } from "src/app/rooms/models/room.model";
import * as _ from "underscore";
import { DirectionStringIndex, MapVector, MapUtils, NodeActions, NodeAction } from "../constants/map.constants";
import { Level } from "./level.model";
import { Link } from "./link.model";
import { World } from "./world.model";

export class Node {

  public x: number;
  public y: number;
  public z: number;

  public level: Level;

  public nodeActions: NodeActions = {
    n: null,
    e: null,
    s: null,
    w: null,
    u: null,
    d: null
  };

  constructor(
    public world: World,
    public room: Room,
    public unitX: number,
    public unitY: number,
    public unitZ: number
  ) {
    this.level = this.world[this.unitZ];

    this.x = this.unitX * MapUtils.NodeOffset;
    this.y = this.unitY * MapUtils.NodeOffset;
    this.z = this.unitZ * 1;
  }

  public get id(): number {
    return this.room.id;
  }

  public get idString(): string {
    return this.id.toString();
  }

  public actionIs(direction: DirectionStringIndex, nodeAction: NodeAction): boolean {
    return this.nodeActions[direction] === nodeAction;
  }

  public setNodeActions(): void {
    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        if (!this.hasAdjacentNode(direction) && !this.hasLink(direction)) {
          this.nodeActions[direction] = NodeAction.Create;
        }
        else if (this.hasAdjacentNode(direction) && !this.hasLink(direction)) {
          this.nodeActions[direction] = NodeAction.Link;
        }
        else {
          const link: Link = this.link(direction);

          if (!_.include(this.world.bridges, link)) {
            this.nodeActions[direction] = NodeAction.Unlink;
          }
          else {
            this.nodeActions[direction] = NodeAction.None;
          }
        }
      }
    )
  }

  public adjacentMapVector(direction: DirectionStringIndex): MapVector {
    const mapVector: MapVector = MapUtils.MapIncrements[direction]

    return {
      x: this.unitX + mapVector.x,
      y: this.unitY + mapVector.y,
      z: this.unitZ + mapVector.z
    } as MapVector;
  }

  public locatedAt(mapVector: MapVector): boolean {
    return this.unitX === mapVector.x && this.unitY === mapVector.y && this.unitZ === mapVector.z;
  };

  public adjacentNode(direction: DirectionStringIndex): Node {
    const mapVector: MapVector = this.adjacentMapVector(direction);

    if (!this.world.validZ(mapVector.z)) {
      return null;
    }

    return this.world.nodeAt(mapVector);
  }

  public hasAdjacentNode(direction: DirectionStringIndex): boolean {
    return !!this.adjacentNode(direction);
  }

  public link(direction: DirectionStringIndex): Link {
    const adjacentNode: Node = this.adjacentNode(direction);

    if (!adjacentNode) {
      return null;
    }

    return this.world.linkBetween(this, adjacentNode);
  }

  public hasLink(direction: DirectionStringIndex): boolean {
    return !!this.link(direction);
  }

}
