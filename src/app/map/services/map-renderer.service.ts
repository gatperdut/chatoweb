import { Injectable } from "@angular/core";
import { World } from "../models/world.model";
import { Node } from '../models/node.model';
import { ZoomBehavior } from "d3";
import * as d3 from "d3";

@Injectable({
  providedIn: 'root'
})
export class MapRendererService {

  constructor(

    ) {

  }

  private zoom(svg: any): ZoomBehavior<Element, unknown> {
    return d3.zoom()
    .scaleExtent([1/4, 1])
    .on(
      'zoom',
      (event: any) => {
        svg
        .selectAll("circle")
        .attr('transform', event.transform);
      }
    );
  }

  public render(container: any, world: World, z: number): any {
    const svg: any = container.append("svg")
    .attr('width', 800)
    .attr('height', 800)
    .style('background-color', 'red')

    var circle: any = svg
    .selectAll('circle')
    .data(
      world[z].nodes
    )
    .enter()
    .append("circle")
    .attr(
      "cy",
      (node: Node, i: number) => {
        return node.y
      }
    )
    .attr(
      "cx",
      (node: Node, i: number) => {
        return node.x
      }
    )
    .attr(
      "r",
      function(node: Node) {
        return 50
      }
    );

    const zoom: ZoomBehavior<Element, unknown> = this.zoom(svg);

    svg.call(zoom);

    return svg;
  }

}
