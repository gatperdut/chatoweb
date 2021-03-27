import { Injectable } from "@angular/core";
import * as d3 from "d3";
import { MapUtils } from "../constants/map.constants";
import { Link } from "../models/link.model";
import { Node } from '../models/node.model';
import { World } from "../models/world.model";

@Injectable({
  providedIn: 'root'
})
export class MapAnimatorService {

  constructor(

  ) {

  }

  public unselectNodes(svg: any): void {
    svg.selectAll('.node')
    .style('opacity', 1)
    .interrupt();
  }

  public unselectLinks(svg: any): void {
    svg.selectAll('.link')
    .style('opacity', 1)
    .interrupt();
  }

  private blink(svg: any, selector: string) {
    svg.select(selector)
    .transition()
    .duration(1000)
    .style('opacity', 0.6)
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .on('end', () => this.blink(svg, selector));
  }

  private homeIn(svg: any, world: World, node: Node): any {
    const zoomTransform: any = world.transform;

    const halfWidth: number = Math.round(parseInt(svg.attr('width')) / 2);
    const halfHeight: number = Math.round(parseInt(svg.attr('height')) / 2);

    const x: number = -node.x - MapUtils.NodeHalfSide;
    const y: number = -node.y - MapUtils.NodeHalfSide;

    const transform: string = "translate(" + halfWidth + "," + halfHeight + ") scale(" + zoomTransform.k + ") translate(" + x + "," + y + ")";

    return svg.selectAll('.node,.link').transition().duration(1000).attr("transform", transform);
  }

  public selectNode(svg: any, world: World, node: Node): void {
    this.unselectNodes(svg);
    this.unselectLinks(svg);

    if (!node) {
      return;
    }

    this.homeIn(svg, world, node)
    .on('end', () => this.blink(svg, '#node_' + node.id));
  }

  public selectLink(svg: any, link: Link): void {
    this.unselectNodes(svg);
    this.unselectLinks(svg);

    if (!link) {
      return;
    }

    this.blink(svg, '#link_' + link.id);
  }

}
