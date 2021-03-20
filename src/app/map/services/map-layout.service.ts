import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { Directions, directionToOrientation, DirectionToOrientationStringIndex } from "../constants/directions.constant";
import { MapIncrements } from "../constants/map-increments.constant";
import { RoomStringIndex } from "../models/room.data";
import { Room } from "../models/room.model";
import { Node } from "../models/node.model";
import { World } from "../models/world.model";
import { MapIncrementStringIndex } from "../types/map-increment.type";
import { MapVector } from "../types/map-vector.type";
import { Link } from "../models/link.model";

@Injectable({
  providedIn: 'root'
})
export class MapLayoutService {

  constructor(

  ) {

  }

  private findRoom(rooms: Room[], id: number): Room {
    return _.findWhere(rooms, { id: id });
  }

  private processNodes(world: World, rooms: Room[], room: Room, previousNode: Node, direction: string, x: number, y: number, z: number): void {
    world.handleZ(z);

    if (world.containsNode(room.id)) {
      return;
    }

    const node: Node = new Node(room, x, y, z);

    world[z].nodes.push(node);

    if (previousNode) {
      const link: Link = new Link(
        node.room.id.toString + '_' + previousNode.room.id.toString(),
        node,
        previousNode,
        directionToOrientation[direction as DirectionToOrientationStringIndex]
      );

      world[z].links.push(link);
    }

    _.each(
      Directions,
      (direction: string): void => {
        const nextRoomId: number = room[direction + 'r_id' as RoomStringIndex];

        const nextRoom: Room = this.findRoom(rooms, nextRoomId);

        if (!nextRoom) {
          return;
        }

        const mapVector: MapVector = MapIncrements[direction as MapIncrementStringIndex];

        const newX: number = node.x + mapVector.x;
        const newY: number = node.y + mapVector.y;
        const newZ: number = node.z = mapVector.z;

        this.processNodes(world, rooms, nextRoom, node, direction, newX, newY, newZ);
      }
    );
  }

  public process(rooms: Room[]): World {
    const world: World = new World();

    this.processNodes(world, rooms, rooms[0], null, null, 0, 0, 0);

    return world;
  }


}
