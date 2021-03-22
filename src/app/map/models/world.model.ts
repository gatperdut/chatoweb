import { Room } from "src/app/rooms/models/room.model";
import * as _ from "underscore";
import { Directions, DirectionStringIndex, DirectionToOrientation, MapIncrements, MapIncrementStringIndex, MapVector, OppositeDirection } from "../constants/map.constants";
import { Level } from "./level.model";
import { Link } from "./link.model";
import { Node } from './node.model'

export class World {

  [z: number]: Level;

  public transform: any;

  constructor(
    public zMax: number = 0,
    public zMin: number = 0
  ) {

  }

  public handleZ(z: number): void {
    if (this[z]) {
      return;
    }

    this[z] = new Level(z);

    if (z > this.zMax) {
      this.zMax = z;
    }

    if (z < this.zMin) {
      this.zMin = z;
    }
  }

  public validZ(z: number): boolean {
    return z >= this.zMin && z <= this.zMax;
  }

  public findNode(id: number): Node {
    let node: Node = null;

    for (let z: number = this.zMin; z <= this.zMax; z++) {
      node = this[z].findNode(id);
      if (node) {
        break;
      }
    }

    return node;
  }

  public containsNode(id: number): boolean {
    return !!this.findNode(id);
  }

  public nodeAt(mapVector: MapVector): Node {
    return this[mapVector.z].nodeAt(mapVector);
  }

  public linkBetween(source: Node, target: Node): Link {
    return this[source.unitZ].linkBetween(source, target);
  }

  public replaceRoom(room: Room): void {
    const node: Node = this.findNode(room.id);

    if (!node) {
      return;
    }

    node.room = room;
  }

  public insertRoom(room: Room): void {
    let node: Node = null;

    _.each(
      Directions,
      (direction: string): void => {
        const adjacentRoomId: number = room.getAdjacentRoomId(direction);
        if (!adjacentRoomId) {
          return;
        }

        const oppositeDirection = OppositeDirection[direction as DirectionStringIndex];

        const adjacentNode = this.findNode(adjacentRoomId);

        if (!node) {
          const mapVector: MapVector = MapIncrements[oppositeDirection as MapIncrementStringIndex];
          node = new Node(this, room, adjacentNode.unitX + mapVector.x, adjacentNode.unitY + mapVector.y, adjacentNode.unitZ + mapVector.z);
          this[node.z].nodes.push(node);
        }

        const directLink: Link = new Link(node, adjacentNode, DirectionToOrientation[direction as DirectionStringIndex]);
        const reverseLink: Link = new Link(adjacentNode, node, DirectionToOrientation[oppositeDirection as DirectionStringIndex]);
        this[node.z].links.push(directLink);
        this[node.z].links.push(reverseLink);
      }
    );
  }

}
