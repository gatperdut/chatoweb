import { Room } from "src/app/rooms/models/room.model";
import * as _ from "underscore";
import { map } from "underscore";
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
          node = new Node(room, adjacentNode.x + mapVector.x, adjacentNode.y + mapVector.y, adjacentNode.z + mapVector.z);
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
