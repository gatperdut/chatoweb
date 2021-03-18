import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { Directions } from "../constants/directions.constant";
import { MapIncrements } from "../constants/map-increments.constant";
import { RoomStringIndex } from "../models/room.data";
import { Room } from "../models/room.model";
import { Node } from "../models/node.model";
import { World } from "../models/world.model";
import { MapIncrementStringIndex } from "../types/map-increment.type";
import { MapVector } from "../types/map-vector.type";
import { Edge } from "../models/edge.model";

@Injectable({
  providedIn: 'root'
})
export class MapLayoutService {

  constructor(

  ) {

  }

  private findRoom(rooms: Room[], id: number): Room {
    return _.findWhere(
      rooms,
      { id: id}
    );
  }

  private processRoom(world: World, rooms: Room[], room: Room, x: number, y: number, z: number): void {
    world.handleZ(z);

    if (world[z].containsNode(room.id)) {
      return;
    }

    const node: Node = new Node(room.id, room.id + '\n' + room.title, x, y, z)

    world[z].nodes.push(node);

    _.each(
      Directions,
      (direction: string): void => {
        const nextRoomId: number = room[direction + 'r_id' as RoomStringIndex];

        const nextRoom: Room = this.findRoom(rooms, nextRoomId);

        if (!nextRoom) {
          return;
        }

        const edge: Edge = {
          source: room.id,
          target: nextRoom.id
        };

        world[z].edges.push(edge);

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
