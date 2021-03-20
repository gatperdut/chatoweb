export const NodeOffset: number = 300;

export const NodeSide: number = 150;

export const NodeHalfSide: number = NodeSide / 2;

export const LinkOffset: number = 20;

export const LinkMidpoint: number = (NodeOffset - NodeSide) / 2;

export type MapVector = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export type MapIncrementStringIndex = 'n' | 'e' | 's' | 'w' | 'u' | 'd';

export type MapIncrement = {
  readonly n: MapVector;
  readonly e: MapVector;
  readonly s: MapVector;
  readonly w: MapVector;
  readonly u: MapVector;
  readonly d: MapVector;
}

export const MapIncrements: MapIncrement = {
  n: {
    x: 0,
    y: -NodeOffset,
    z: 0
  },
  e: {
    x: NodeOffset,
    y: 0,
    z: 0
  },
  s: {
    x: 0,
    y: NodeOffset,
    z: 0
  },
  w: {
    x: -NodeOffset,
    y: 0,
    z: 0
  },
  u: {
    x: 0,
    y: 0,
    z: 1
  },
  d: {
    x: 0,
    y: 0,
    z: -1
  }
};

export const Directions: string[] = ['n', 'e', 's', 'w', 'u', 'd'];
// export const Directions: string[] = ['n', 'e', 's', 'w'];

export type DirectionStringIndex = 'n' | 'e' | 's' | 'w' | 'u' | 'd';

export const OppositeDirection = {
  n: 's',
  e: 'w',
  s: 'n',
  w: 'e',
  u: 'd',
  d: 'u'
};

export enum Orientation {
  North = 'NORTH',
  East  = 'EAST',
  South = 'South',
  West  = 'WEST',
  Above = 'ABOVE',
  Below = 'BELOW'
}

export const coplanarOrientations: Orientation[] = [
  Orientation.North,
  Orientation.East,
  Orientation.South,
  Orientation.West
];

export const directionToOrientation = {
  n: Orientation.North,
  e: Orientation.East,
  s: Orientation.South,
  w: Orientation.West,
  u: Orientation.Above,
  d: Orientation.Below
};
