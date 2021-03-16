import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { DataSet, Edge } from 'vis';
import { Directions } from "../constants/directions.constant";
import { MapIncrements } from "../constants/map-increments.constant";
import { CwData } from "../models/cw-data.interface";
import { CwNode } from "../models/cw-node.interface";
import { RoomStringIndex } from "../models/room.data";
import { Room } from "../models/room.model";
import { World } from "../models/world.model";
import { MapIncrementStringIndex } from "../types/map-increment.type";
import { MapVector } from "../types/map-vector.type";

@Injectable({
  providedIn: 'root'
})
export class MapLayoutService {

  constructor(
  ) {

  }

  private findRoomInRooms(rooms: Room[], id: number): Room {
    return _.findWhere(
      rooms,
      { id: id}
    );
  }

  private newVisData(): CwData {
    return {
      nodes: new DataSet<CwNode>([]),
      edges: new DataSet<Edge>([])
    };
  }

  private processRoom(world: World, rooms: Room[], room: Room, x: number, y: number, z: number): void {

    if (!world[z]) {
      world[z] = this.newVisData();
    }

    if (world[z].nodes.getIds().includes(room.id.toString())) {
      return;
    }

    const node: CwNode = {
      id: room.id.toString(),
      label: room.title,
      x: x,
      y: y,
      z: z,
      size: 0.5,
      color: '#FF0000'
    };

    world[z].nodes.add(node);

    _.each(
      Directions,
      (direction: string): void => {
        const nextRoomId: number = room[direction + 'r_id' as RoomStringIndex];

        const nextRoom: Room = this.findRoomInRooms(rooms, nextRoomId);

        if (!nextRoom) {
          return;
        }

        const edge: vis.Edge = {
          id: room.id.toString() + '_' + nextRoom.id.toString(),
          from: room.id.toString(),
          to: nextRoom.id.toString()
        };

        world[z].edges.add(edge);

        const mapVector: MapVector = MapIncrements[direction as MapIncrementStringIndex];

        const newX: number = node.x + mapVector.x;
        const newY: number = node.y + mapVector.y;
        const newZ: number = node.z = mapVector.z;

        this.processRoom(world, rooms, nextRoom, newX, newY, newZ);
      }
    );
  }

  public process(rooms: Room[]): World {
    const world: World = new World();

    this.processRoom(world, rooms, rooms[0], 0, 0, 0);

    return world;
  }


}
