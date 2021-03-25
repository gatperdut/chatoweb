import { DirectionStringIndex, Orientation } from "src/app/map/constants/map.constants";
import { DoorData } from "./door.data";
import { RoomStringIndex } from "./room.data";
import { Node } from "../../map/models/node.model";

export class Door implements DoorData {

  public readonly orientation: Orientation;

  constructor(
    public readonly id: number,
    public short_desc: string,
    public long_desc: string,
    public full_desc: string,
    public open: boolean,
    public see_through: boolean,
    public nr_id: number,
    public er_id: number,
    public sr_id: number,
    public wr_id: number,
    public ur_id: number,
    public dr_id: number
  ) {
    if (nr_id && sr_id) {
      this.orientation = Orientation.Vertical;
    }
    else if (er_id && wr_id) {
      this.orientation = Orientation.Horizontal;
    }
    else if (ur_id && dr_id) {
      this.orientation = Orientation.Transversal;
    }
    else {
      throw new Error('Invalid door orientation.');
    }
  }

  public getConnectedRoomId(direction: DirectionStringIndex): number {
    return this[direction + 'r_id' as RoomStringIndex];
  }

  public setConnectedRoomId(direction: DirectionStringIndex, id: number): void {
    this[direction + 'r_id' as RoomStringIndex] = id;
  }

  public isBetween(firstNode: Node, secondNode: Node): boolean {
    switch (this.orientation) {
      case Orientation.Vertical:
        return (this.nr_id === firstNode.id && this.sr_id === secondNode.id) || (this.nr_id === secondNode.id && this.sr_id === firstNode.id);
      case Orientation.Horizontal:
        return (this.er_id === firstNode.id && this.wr_id === secondNode.id) || (this.er_id === secondNode.id && this.wr_id === firstNode.id);
      case Orientation.Transversal:
        return (this.ur_id === firstNode.id && this.dr_id === secondNode.id) || (this.ur_id === secondNode.id && this.dr_id === firstNode.id);
      }
  }

}
