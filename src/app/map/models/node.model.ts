import { Room } from "src/app/rooms/models/room.model";

export class Node {

  constructor(
    public room: Room,
    public x: number,
    public y: number,
    public z: number
  ) {

  }

}
