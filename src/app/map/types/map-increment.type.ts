import { MapVector } from "./map-vector.type";

export type MapIncrementStringIndex = 'n' | 'e' | 's' | 'w';

export type MapIncrement = {

  readonly n: MapVector;

  readonly e: MapVector;

  readonly s: MapVector;

  readonly w: MapVector;

}
