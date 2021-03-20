import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { World } from "../models/world.model";
import { Node } from "../models/node.model";
import { MapLayoutService } from "./map-layout.service";

@Injectable({
  providedIn: 'root'
})
export class MapViewerService {

  public zSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  public nodeSubject: BehaviorSubject<Node> = new BehaviorSubject(null);

  private z: number = 0;

  private node: Node = null;

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

  public selectNode(node: Node): void {
    this.node = node;
    this.nodeSubject.next(this.node);
  }

}
