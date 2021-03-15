import { RoomData } from "./room.data";

export class Room implements RoomData {

  constructor(
    public readonly id: number,
    public readonly area_id: number,
    public title: string,
    public description: string,
    public description_nighttime: string,
    public arena: boolean,
    public always_lit: boolean,
    public enclosed: boolean,
    public roughness_multiplier: number,
    public nr_id: number,
    public er_id: number,
    public sr_id: number,
    public wr_id: number,
    public ur_id: number,
    public dr_id: number,
    public nd_id: number,
    public ed_id: number,
    public sd_id: number,
    public wd_id: number,
    public ud_id: number,
    public dd_id: number
  ) {

  }

}
