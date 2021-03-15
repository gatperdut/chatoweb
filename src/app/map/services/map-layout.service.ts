import { Injectable } from "@angular/core";
import * as _ from "underscore";
import { Directions } from "../constants/directions.constant";
import { MapIncrements } from "../constants/map-increments.constant";
import { RoomStringIndex } from "../models/room.data";
import { Room } from "../models/room.model";
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

  private findRoomInGraph(nodes: SigmaJs.Node[], id: string): SigmaJs.Node {
    return _.findWhere(
      nodes,
      { id: id }
    );
  }

  private processRoom(graphData: SigmaJs.GraphData, rooms: Room[], room: Room, x = 0, y = 0): void {

    if (this.findRoomInGraph(graphData.nodes, room.id.toString())) {
      return;
    }

    const node: SigmaJs.Node = {
      id: room.id.toString(),
      label: room.title,
      x: x,
      y: y
    };

    graphData.nodes.push(node);

    _.each(
      Directions,
      (direction: string): void => {
        const nextRoomId: number = room[direction + 'r_id' as RoomStringIndex];

        const nextRoom: Room = this.findRoomInRooms(rooms, nextRoomId);

        if (!nextRoom) {
          return;
        }

        const edge: SigmaJs.Edge = {
          id: room.id.toString() + '_' + nextRoom.id.toString(),
          source: room.id.toString(),
          target: nextRoom.id.toString()
        };

        graphData.edges.push(edge);

        const mapVector: MapVector = MapIncrements[direction as MapIncrementStringIndex];

        const newX: number = node.x + mapVector.x;
        const newY: number = node.y + mapVector.y;

        this.processRoom(graphData, rooms, nextRoom, newX, newY);
      }
    );
  }

  public process(rooms: Room[]): SigmaJs.GraphData {
    const graphData: SigmaJs.GraphData = {
      nodes: [] as SigmaJs.Node[],
      edges: [
        {
          id: 'e1',
          source: '1',
          target: '2'
        }
      ] as SigmaJs.Edge[]
    };

    _.each(
      rooms,
      (room: Room): void => {
        this.processRoom(graphData, rooms, room, null, null);
      }
    );

    return graphData;
  }


}
