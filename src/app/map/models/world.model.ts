import { Level } from "./level.model";

export class World {

  [z: number]: Level;

  constructor(
    public zMax: number = 0,
    public zMin: number = 0
  ) {

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

}
