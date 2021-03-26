import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { World } from "../models/world.model";
import { Node } from "../models/node.model";
import { MapLayoutService } from "./map-layout.service";
import { Link } from "../models/link.model";

@Injectable({
  providedIn: 'root'
})
export class MapViewerService {

  public zSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  public nodeSubject: BehaviorSubject<Node> = new BehaviorSubject(null);

  public linkSubject: BehaviorSubject<Link> = new BehaviorSubject(null);

  private z: number = 0;

  private node: Node = null;

  private link: Link = null;

  constructor(
    public mapLayoutService: MapLayoutService
  ) {

  }

  public canUp(world: World): boolean {
    return this.z < world.zMax;
  }

  public up(): void {
    this.z += 1;
    this.nodeSubject.next(null);
    this.linkSubject.next(null);
    this.zSubject.next(this.z);
  }

  public canDown(world: World): boolean {
    return this.z > world.zMin;
  }

  public down(): void {
    this.z -= 1;
    this.nodeSubject.next(null);
    this.linkSubject.next(null);
    this.zSubject.next(this.z);
  }

  public selectNode(node: Node): void {
    this.node = node;
    this.linkSubject.next(null);
    this.nodeSubject.next(this.node);
  }

  public selectLink(link: Link): void {
    this.link = link;
    this.nodeSubject.next(null);
    this.linkSubject.next(this.link);
  }

}
