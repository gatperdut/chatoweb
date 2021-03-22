import { Room } from "src/app/rooms/models/room.model";

export class Node {

  constructor(
    public room: Room,
    public x: number,
    public y: number,
    public z: number
  ) {

  }

  public get id(): number {
    return this.room.id;
  }

  public get idString(): string {
    return this.id.toString();
  }

}
