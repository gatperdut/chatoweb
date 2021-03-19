import { Injectable } from "@angular/core";
import { World } from "../../models/world.model";
import { Node } from '../../models/node.model';
import { ZoomBehavior } from "d3";
import * as d3 from "d3";
import { RoomsRendererService } from "./rooms-renderer.service";

@Injectable({
  providedIn: 'root'
})
export class MapRendererService {

  constructor(
    private roomsRendererService: RoomsRendererService
  ) {

  }



  public render(svg: any, world: World, z: number): void {
    this.roomsRendererService.render(svg, world, z);
  }

}
