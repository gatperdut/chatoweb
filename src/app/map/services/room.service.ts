import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { RoomData } from "../models/room.data";
import { Room } from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
  ) {

  }

  public craftRoom(roomData: RoomData): Room {
    return new Room(
      roomData.id,
      roomData.area_id,
      roomData.title,
      roomData.description,
      roomData.description_nighttime,
      roomData.arena,
      roomData.always_lit,
      roomData.enclosed,
      roomData.roughness_multiplier,
      roomData.nr_id,
      roomData.er_id,
      roomData.sr_id,
      roomData.wr_id,
      roomData.ur_id,
      roomData.dr_id,
      roomData.nd_id,
      roomData.ed_id,
      roomData.sd_id,
      roomData.wd_id,
      roomData.ud_id,
      roomData.dd_id,
    );
  }

  public craftRooms(roomsData: RoomData[]): Room[] {
    return _.map(
      roomsData,
      this.craftRoom
    );
  }

}
