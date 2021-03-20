import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { Directions, DirectionStringIndex, directionToOrientation, MapIncrements, MapIncrementStringIndex, MapVector, Orientation } from "../constants/map.constants";
import { RoomStringIndex } from "../../rooms/models/room.data";
import { Node } from "../models/node.model";
import { World } from "../models/world.model";
import { Link } from "../models/link.model";
import { Room } from "src/app/rooms/models/room.model";

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

  private processNodes(world: World, rooms: Room[], room: Room, previousNode: Node, orientation: Orientation, x: number, y: number, z: number): void {
    world.handleZ(z);

    const node: Node = new Node(room, x, y, z);

    if (previousNode) {
      const link: Link = new Link(
        previousNode.room.id.toString() + '_' + node.room.id.toString(),
        previousNode,
        node,
        orientation
      );

      world[z].links.push(link);
    }

    if (world.containsNode(room.id)) {
      return;
    }

    world[z].nodes.push(node);

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

        this.processNodes(world, rooms, nextRoom, node, directionToOrientation[direction as DirectionStringIndex], newX, newY, newZ);
      }
    );
  }

  public process(rooms: Room[]): World {
    const world: World = new World();

    this.processNodes(world, rooms, rooms[0], null, null, 0, 0, 0);

    return world;
  }


}
