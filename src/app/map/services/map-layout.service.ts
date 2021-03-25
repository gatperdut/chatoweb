import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { DirectionStringIndex, MapUtils, MapVector } from "../constants/map.constants";
import { Node } from "../models/node.model";
import { World } from "../models/world.model";
import { Link } from "../models/link.model";
import { Room } from "src/app/rooms/models/room.model";
import { Door } from "src/app/rooms/models/door.model";

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

  private findDoor(doors: Door[], firstNode: Node, secondNode: Node): Door {
    return _.find(
      doors,
      (door: Door): boolean => door.isBetween(firstNode, secondNode)
    );
  }

  private processNodes(world: World, rooms: Room[], room: Room, previousNode: Node, direction: DirectionStringIndex, doors: Door[], x: number, y: number, z: number): void {
    world.handleZ(z);

    const node: Node = new Node(world, room, x, y, z);

    if (previousNode && !world.hasLinkBetween(node, previousNode)) {
      const door: Door = this.findDoor(doors, node, previousNode);
      const link: Link = new Link(world, previousNode, node, door);

      world.links.push(link);
    }

    if (world.hasNode(room.id)) {
      return;
    }

    world.addNode(node);

    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        const nextRoomId: number = room.getConnectedRoomId(direction);

        const nextRoom: Room = this.findRoom(rooms, nextRoomId);

        if (!nextRoom) {
          return;
        }

        const mapVector: MapVector = MapUtils.MapIncrements[direction];

        const newX: number = node.unitX + mapVector.x;
        const newY: number = node.unitY + mapVector.y;
        const newZ: number = node.unitZ + mapVector.z;

        this.processNodes(world, rooms, nextRoom, node, direction, doors, newX, newY, newZ);
      }
    );
  }

  public process(rooms: Room[], doors: Door[]): World {
    const world: World = new World();

    this.processNodes(world, rooms, rooms[0], null, null, doors, 0, 0, 0);

    world.setConnectivity();

    return world;
  }


}
