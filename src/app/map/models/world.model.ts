import { Door } from "src/app/rooms/models/door.model";
import { Room } from "src/app/rooms/models/room.model";
import * as _ from "underscore";
import { DirectionStringIndex, MapUtils, MapVector } from "../constants/map.constants";
import { Level } from "./level.model";
import { Link } from "./link.model";
import { Node } from './node.model'

export class World {

  [z: number]: Level;

  public transform: any;

  public nodes: Node[] = [];

  public links: Link[] = [];

  public bridges: Link[] = [];

  constructor(
    public zMax: number = 0,
    public zMin: number = 0,

  ) {

  }

  public addNode(node: Node) {
    this.nodes.push(node);
    this[node.z].nodes.push(node);
  }

  public removeLink(link: Link) {
    const index = _.indexOf(this.links, link);
    this.links.splice(index, 1);
  }

  public handleZ(z: number): void {
    if (this[z]) {
      return;
    }

    this[z] = new Level(z);

    if (z > this.zMax) {
      this.zMax = z;
    }

    if (z < this.zMin) {
      this.zMin = z;
    }
  }

  public validZ(z: number): boolean {
    return z >= this.zMin && z <= this.zMax;
  }

  public findNode(id: number): Node {
    let node: Node = null;

    for (let z: number = this.zMin; z <= this.zMax; z++) {
      node = this[z].findNode(id);
      if (node) {
        break;
      }
    }

    return node;
  }

  public hasNode(id: number): boolean {
    return !!this.findNode(id);
  }

  public nodeAt(mapVector: MapVector): Node {
    return this[mapVector.z].nodeAt(mapVector);
  }

  public hasNodeAt(mapVector: MapVector): boolean {
    return !!this.nodeAt(mapVector);
  }

  public linkBetween(source: Node, target: Node): Link {
    return _.find(
      this.links,
      (link: Link): boolean => {
        return link.isBetween(source, target);
      }
    );
  }

  public hasLinkBetween(source: Node, target: Node): boolean {
    return !!this.linkBetween(source, target);
  }

  public linkWithDoor(id: number): Link {
    return _.find(
      this.links,
      (link: Link): boolean => {
        return link.doorId === id;
      }
    );
  }

  public createDoor(door: Door): void {
    const firstNode: Node = this.findNode(door.firstRoomId);
    const secondNode: Node = this.findNode(door.secondRoomId);

    const link: Link = this.linkBetween(firstNode, secondNode);

    link.door = door;

    firstNode.room.setDoorId(MapUtils.OppositeDirection[door.firstRoomDirection], door.id);
    secondNode.room.setDoorId(MapUtils.OppositeDirection[door.secondRoomDirection], door.id);

    this.setConnectivity();
  }

  public destroyDoor(id: number): void {
    const link: Link = this.linkWithDoor(id);

    if (link.source.room.id === link.door.firstRoomId) {
      link.source.room.setDoorId(link.door.secondRoomDirection, null);
      link.target.room.setDoorId(link.door.firstRoomDirection, null);
    }
    else {
      link.source.room.setDoorId(link.door.firstRoomDirection, null);
      link.target.room.setDoorId(link.door.secondRoomDirection, null);
    }

    link.door = null;

    this.setConnectivity();
  }

  public createRoom(room: Room): void {
    let node: Node = null;

    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        if (!room.getConnectedRoomId(direction)) {
          return;
        }

        const adjacentNode: Node = this.findNode(room.getConnectedRoomId(direction));

        if (!node) {
          const nodeMapVector: MapVector = adjacentNode.adjacentMapVector(MapUtils.OppositeDirection[direction]);
          node = new Node(this, room, nodeMapVector.x, nodeMapVector.y, nodeMapVector.z);
          this.addNode(node);
        }

        adjacentNode.room.setConnectedRoomId(MapUtils.OppositeDirection[direction], node.id);

        const link: Link = new Link(this, node, adjacentNode, null);

        this.links.push(link);
      }
    );

    this.setConnectivity();
  }

  public updateRoom(room: Room): void {
    const node: Node = this.findNode(room.id);

    node.room = room;

    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        const adjacentNode: Node = node.adjacentNode(direction);

        if (!adjacentNode) {
          return
        }

        let link: Link = this.linkBetween(node, adjacentNode);

        if (node.room.getConnectedRoomId(direction) === adjacentNode.id) {
          adjacentNode.room.setConnectedRoomId(MapUtils.OppositeDirection[direction], node.id);

          if (!link) {
            link = new Link(this, node, adjacentNode, null);
            this.links.push(link);
          }
        }
        else {
          adjacentNode.room.setConnectedRoomId(MapUtils.OppositeDirection[direction], null);

          if (link) {
            this.removeLink(link);
          }
        }
      }
    );

    this.setConnectivity();
  }

  public setConnectivity(): void {
    this.findBridges();

    _.each(
      this.nodes,
      (node: Node): void => {
        node.setActions();
      }
    );
  }

  private findBridges(): void {
    this.bridges.length = 0;
    let counter: number = 0;
    let pre: number[] = [];
    let low: number[] = [];

    const bridgesDFS = function(world: World, u: number, v: number): void {
      pre[v] = counter++;
      low[v] = pre[v];

      _.each(
        MapUtils.Directions,
        (direction: DirectionStringIndex) => {
          const adjacentNode: Node = world.findNode(world.nodes[v].room.getConnectedRoomId(direction));
          if (adjacentNode) {
            const w: number = _.findIndex(world.nodes, adjacentNode);

            if (pre[w] === - 1) {
              bridgesDFS(world, v, w);
              low[v] = Math.min(low[v], low[w]);
              if (low[w] === pre[w]) {
                const link: Link = world.linkBetween(world.nodes[v], world.nodes[w]);
                world.bridges.push(link);
              }
            }
            else if (u != w) {
              low[v] = Math.min(low[v], pre[w]);
            }
          }
        }
      );
    }

    for (let v = 0; v < this.nodes.length; v++) {
      low[v] = -1;
      pre[v] = -1;
    }

    for (let v = 0; v < this.nodes.length; v++) {
      if (pre[v] === -1) {
        bridgesDFS.bind(this)(this, v, v);
      }
    }
  }

}
