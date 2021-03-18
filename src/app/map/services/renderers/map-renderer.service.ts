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

  private zoom(svg: any): ZoomBehavior<Element, unknown> {
    return d3.zoom()
    .scaleExtent([1/4, 1])
    .on(
      'zoom',
      (event: any) => {
        svg
        .selectAll(".room,.room-title")
        .attr('transform', event.transform);
      }
    );
  }

  public render(container: any, world: World, z: number): any {
    const svg: any = container.append("svg");

    const rectsContainer: any = svg
    .selectAll('.room')
    .data(
      world[z].nodes
    )
    .enter();

    this.roomsRendererService.render(rectsContainer);

    const zoom: ZoomBehavior<Element, unknown> = this.zoom(svg);

    svg.call(zoom);

    return svg;
  }

}
