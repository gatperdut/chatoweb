import { Node } from '../models/node.model';
import * as _ from "underscore";

export type MapVector = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type MapIncrement = {
  readonly n: MapVector;
  readonly e: MapVector;
  readonly s: MapVector;
  readonly w: MapVector;
  readonly u: MapVector;
  readonly d: MapVector;
};

export type DirectionStringIndex = 'n' | 'e' | 's' | 'w' | 'u' | 'd';

export enum NodeAction {
  Create = 'CREATE',
  Link   = 'LINK',
  Unlink = 'UNLINK',
  None   = 'NONE'
}

export type NodeActions = { [key in DirectionStringIndex]: NodeAction }


export class MapUtils {
  static readonly NodeOffset: number = 300;

  static readonly NodeSide: number = 150;

  static readonly NodeHalfSide: number = MapUtils.NodeSide / 2;

  static readonly LinkMidpoint: number = (MapUtils.NodeOffset - MapUtils.NodeSide) / 2;

  static readonly Directions: DirectionStringIndex[] = ['n', 'e', 's', 'w', 'u', 'd'];

  static readonly MapIncrements: MapIncrement = {
    n: { x:  0, y: -1, z:  0 },
    e: { x:  1, y:  0, z:  0 },
    s: { x:  0, y:  1, z:  0 },
    w: { x: -1, y:  0, z:  0 },
    u: { x:  0, y:  0, z:  1 },
    d: { x:  0, y:  0, z: -1 }
  };

  static readonly OppositeDirection = {
    'n': 's' as DirectionStringIndex,
    'e': 'w' as DirectionStringIndex,
    's': 'n' as DirectionStringIndex,
    'w': 'e' as DirectionStringIndex,
    'u': 'd' as DirectionStringIndex,
    'd': 'u' as DirectionStringIndex
  };

  static readonly coplanarDirections: DirectionStringIndex[] = ['n', 'e', 's', 'w'];

  static readonly DirectionToString = {
    n: 'north',
    e: 'east',
    s: 'south',
    w: 'west',
    u: 'up',
    d: 'down'
  };

  static directionFromCoords(source: Node, target: Node): DirectionStringIndex {
    const mapVector: MapVector = {
      x: target.unitX - source.unitX,
      y: target.unitY - source.unitY,
      z: target.unitZ - source.unitZ
    };

    return _.find(
      _.keys(MapUtils.MapIncrements),
      (key: string): boolean => {
        const keyStringIndex = key as DirectionStringIndex;
        return MapUtils.MapIncrements[keyStringIndex].x === mapVector.x && MapUtils.MapIncrements[keyStringIndex].y === mapVector.y && MapUtils.MapIncrements[keyStringIndex].z === mapVector.z;
      }
    ) as DirectionStringIndex;
  }

}










