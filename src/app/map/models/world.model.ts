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

  public updateRoom(room: Room): void {
    const node: Node = this.findNode(room.id);

    node.room = room;

    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        const adjacentRoomId: number = room.getConnectedRoomId(direction);
        if (adjacentRoomId) {
          const adjacentNode: Node = this.findNode(adjacentRoomId);
          if (!this.hasLinkBetween(node, adjacentNode)) {
            const link: Link = new Link(this, node, adjacentNode);
            this.links.push(link);
          }
        }
        else {
          const adjacentLink: Link = node.link(direction);
          if (adjacentLink) {
            this.removeLink(adjacentLink);
          }
        }
      }
    );

    this.setConnectivity();
  }

  public createRoom(room: Room): void {
    let node: Node = null;

    _.each(
      MapUtils.Directions,
      (direction: DirectionStringIndex): void => {
        const adjacentRoomId: number = room.getConnectedRoomId(direction);
        if (!adjacentRoomId) {
          return;
        }

        const oppositeDirection = MapUtils.OppositeDirection[direction];

        const adjacentNode = this.findNode(adjacentRoomId);

        if (!node) {
          const mapVector: MapVector = MapUtils.MapIncrements[oppositeDirection];
          node = new Node(this, room, adjacentNode.unitX + mapVector.x, adjacentNode.unitY + mapVector.y, adjacentNode.unitZ + mapVector.z);
          this.addNode(node);
        }

        const link: Link = new Link(this, node, adjacentNode);
        this.links.push(link);
      }
    );

    this.setConnectivity();
  }

  public setConnectivity(): void {
    this.findBridges();

    _.each(
      this.nodes,
      (node: Node): void => {
        node.setNodeActions();
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
              if (low[w] == pre[w]) {
                const directLink: Link = world.linkBetween(world.nodes[v], world.nodes[w]);
                const reverseLink: Link = world.linkBetween(world.nodes[w], world.nodes[v]);
                world.bridges.push(directLink);
                world.bridges.push(reverseLink);
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
      if (pre[v] == -1) {
        bridgesDFS.bind(this)(this, v, v);
      }
    }
  }

}
