import { Room } from "src/app/rooms/models/room.model";
import { Level } from "./level.model";
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

}
