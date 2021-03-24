import { Injectable } from "@angular/core";
import { DirectionStringIndex } from "src/app/map/constants/map.constants";
import * as _ from "underscore";
import { RoomData, RoomStringIndex } from "../../rooms/models/room.data";
import { Room } from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(

  ) {

  }

  public emptyRoom(): RoomData {
    return {
      id: null,
      area_id: null,
      title: '',
      description: '',
      description_nighttime: '',
      arena: false,
      always_lit: false,
      enclosed: false,
      roughness_multiplier: 1.0,
      nr_id: null,
      er_id: null,
      sr_id: null,
      wr_id: null,
      ur_id: null,
      dr_id: null,
      nd_id: null,
      ed_id: null,
      sd_id: null,
      wd_id: null,
      ud_id: null,
      dd_id: null
    };
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

  public getAdjacentRoomId(roomData: RoomData, direction: DirectionStringIndex): number {
    return roomData[direction + 'r_id' as RoomStringIndex];
  }

  public setAdjacentRoomId(roomData: RoomData, direction: DirectionStringIndex, id: number): void {
    roomData[direction + 'r_id' as RoomStringIndex] = id;
  }

  public getDoorId(roomData: RoomData, direction: DirectionStringIndex): number {
    return roomData[direction + 'r_id' as RoomStringIndex];
  }

  public setDoorId(roomData: RoomData, direction: DirectionStringIndex, id: number): void {
    roomData[direction + 'd_id' as RoomStringIndex] = id;;
  }

  public craftRooms(roomsData: RoomData[]): Room[] {
    return _.map(
      roomsData,
      this.craftRoom
    );
  }

}
