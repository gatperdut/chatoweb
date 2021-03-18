import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { World } from "../models/world.model";
import { MapLayoutService } from "./map-layout.service";

@Injectable({
  providedIn: 'root'
})
export class MapViewerService {

  public zSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  private z: number = 0;

  constructor(
    public mapLayoutService: MapLayoutService
  ) {

  }

  public canUp(world: World): boolean {
    return this.z < world.zMax;
  }

  public up(): void {
    this.z += 1;
    this.zSubject.next(this.z);
  }

  public canDown(world: World): boolean {
    return this.z > world.zMin;
  }

  public down(): void {
    this.z -= 1;
    this.zSubject.next(this.z);
  }

}
