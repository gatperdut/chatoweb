import { Room } from "src/app/rooms/models/room.model";
import * as _ from "underscore";
import { DirectionStringIndex, MapUtils, MapVector } from "../constants/map.constants";
import { Level } from "./level.model";
import { Link } from "./link.model";
import { Node } from './node.model'

export class World {

  [z: number]: Level;

  public transform: any;

  constructor(
    public zMax: number = 0,
    public zMin: number = 0,
    public links: Link[] = []
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

  public hasNode(id: number): boolean {
    return !!this.findNode(id);
  }

  public nodeAt(mapVector: MapVector): Node {
    return this[mapVector.z].nodeAt(mapVector);
  }

  public hasNodeAt(mapVector: MapVector): boolean {
    return !!this.nodeAt(mapVector);
  }

  public linkBetween(source: Node, target: Node): Link {
    return _.find(
      this.links,
      (link: Link): boolean => {
        return link.isBetween(source, target);
      }
    );
  }

  public hasLinkBetween(source: Node, target: Node): boolean {
    return !!this.linkBetween(source, target);
  }

  public removeLink(link: Link) {
    const index = _.indexOf(this.links, link);
    this.links.splice(index, 1);
  }

  public updateRoom(room: Room): void {
    const node: Node = this.findNode(room.id);

    node.room = room;

    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        const adjacentRoomId: number = room.getAdjacentRoomId(direction);
        if (adjacentRoomId) {
          const adjacentNode: Node = this.findNode(adjacentRoomId);
          if (!this.hasLinkBetween(node, adjacentNode)) {
            const link: Link = new Link(this, node, adjacentNode);
            this.links.push(link);
          }
        }
        else {
          const adjacentLink: Link = node.adjacentLink(direction);
          if (adjacentLink) {
            this.removeLink(adjacentLink);
          }
        }
      }
    );
  }

  public createRoom(room: Room): void {
    let node: Node = null;

    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        const adjacentRoomId: number = room.getAdjacentRoomId(direction);
        if (!adjacentRoomId) {
          return;
        }

        const oppositeDirection = MapUtils.OppositeDirection[direction];

        const adjacentNode = this.findNode(adjacentRoomId);

        if (!node) {
          const mapVector: MapVector = MapUtils.MapIncrements[oppositeDirection];
          node = new Node(this, room, adjacentNode.unitX + mapVector.x, adjacentNode.unitY + mapVector.y, adjacentNode.unitZ + mapVector.z);
          this[node.z].nodes.push(node);
        }

        const link: Link = new Link(this, node, adjacentNode);
        this.links.push(link);
      }
    );
  }

}
