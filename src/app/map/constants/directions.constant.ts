export const Directions: string[] = ['n', 'e', 's', 'w', 'u', 'd'];
// export const Directions: string[] = ['n', 'e', 's', 'w'];

export enum Orientation {
  Up    = 'UP',
  Right = 'RIGHT',
  Down  = 'DOWN',
  Left  = 'LEFT'
}

export type DirectionToOrientationStringIndex = 'n' | 'e' | 's' | 'w';

export const directionToOrientation = {
  n: Orientation.Up,
  e: Orientation.Right,
  s: Orientation.Down,
  w: Orientation.Left
};
