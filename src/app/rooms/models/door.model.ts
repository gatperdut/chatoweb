import { DirectionStringIndex } from "src/app/map/constants/map.constants";
import { DoorData } from "./door.data";
import { RoomStringIndex } from "./room.data";

export class Door implements DoorData {

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

  }

  public getConnectedRoomId(direction: DirectionStringIndex): number {
    return this[direction + 'r_id' as RoomStringIndex];
  }

  public setConnectedRoomId(direction: DirectionStringIndex, id: number): void {
    this[direction + 'r_id' as RoomStringIndex] = id;
  }

}
