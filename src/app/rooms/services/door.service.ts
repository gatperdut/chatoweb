import { Injectable } from "@angular/core";
import { DirectionStringIndex, RoomStringIndex } from "src/app/map/constants/map.constants";
import * as _ from "underscore";
import { DoorData } from "../models/door.data";
import { Door } from "../models/door.model";

@Injectable({
  providedIn: 'root'
})
export class DoorService {

  constructor(

  ) {

  }

  public emptyDoor(): DoorData {
    return {
      id: null,
      short_desc: '',
      long_desc: '',
      full_desc: '',
      open: false,
      see_through: false,
      nr_id: null,
      er_id: null,
      sr_id: null,
      wr_id: null,
      ur_id: null,
      dr_id: null
    };
  }

  public craftDoor(doorData: DoorData): Door {
    return new Door(
      doorData.id,
      doorData.short_desc,
      doorData.long_desc,
      doorData.full_desc,
      doorData.open,
      doorData.see_through,
      doorData.nr_id,
      doorData.er_id,
      doorData.sr_id,
      doorData.wr_id,
      doorData.ur_id,
      doorData.dr_id,
    );
  }

  public getAdjacentRoomId(doorData: DoorData, direction: DirectionStringIndex): number {
    return doorData[direction + 'r_id' as RoomStringIndex];
  }

  public setAdjacentRoomId(doorData: DoorData, direction: DirectionStringIndex, id: number): void {
    doorData[direction + 'r_id' as RoomStringIndex] = id;
  }

  public craftDoors(doorsData: DoorData[]): Door[] {
    return _.map(
      doorsData,
      this.craftDoor.bind(this)
    );
  }

}
