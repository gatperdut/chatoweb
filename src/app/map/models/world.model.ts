import { Level } from "./level.model";

export class World {

  [z: number]: Level;

  public transform: any;

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

  public containsNode(id: number): boolean {
    for (let z: number = this.zMin; z <= this.zMax; z++) {
      if (this[z].containsNode(id)) {
        return true;
      }
    }

    return false;
  }

}
