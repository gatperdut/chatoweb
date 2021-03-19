import { WrappedNodeExpr } from "@angular/compiler";
import { Injectable } from "@angular/core";
import * as d3 from "d3";
import { svg } from "d3-fetch";
import { Node } from '../../models/node.model';
import { World } from "../../models/world.model";

export const ROOM_SIZE: number = 150;

@Injectable({
  providedIn: 'root'
})
export class RoomsRendererService {

  constructor(

  ) {

  }

  private transform: any;

  public zoom(svg: any) {
    svg.call(
      d3.zoom()
      .scaleExtent([1/4, 1])
      .on(
        'zoom',
        (event: any) => {
          this.transform = event.transform;
          svg
          .selectAll(".room")
          .attr('transform', this.transform);
        }
      )
    );
  }

  private roomBackground(rects: any): void {
    rects
    .attr("x", (node: Node, i: number) => node.x)
    .attr("y", (node: Node, i: number) => node.y)
    .attr("width", (node: Node) => ROOM_SIZE)
    .attr("height", (node: Node) => ROOM_SIZE)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');
  }

  private roomTitle(fos: any): void {
    fos
    .attr("x", (node: Node, i: number) => node.x)
    .attr("y", (node: Node, i: number) => node.y)
    .attr('width', 150)
    .attr('height', 75)
    .style('padding', 5)
    .style('background-color', '#498392');

    fos.select('div')
    .attr("text-anchor", "middle")
    .style('height', '65px')
    .style('overflow', 'hidden')
    .style('text-align', 'center')
    .html((node: Node) => node.id + '\n' + node.title)
  }

  public render(svg: any, world: World, z: number): void {
    this.enter(svg, world, z);
    this.update(svg, world, z);
    this.exit(svg, world, z);
  }

  private enter(svg: any, world: World, z: number): void {
    const enter = svg.selectAll('rect').data(world[z].nodes, (node: Node) => node.id).enter();

    const g = enter
    .append('g')
    .attr('class', 'room')
    .attr('transform', this.transform);

    const rects = g
    .append('rect');

    this.roomBackground(rects);

    const fos = g
    .append('foreignObject');

    this.roomTitle(fos);

    fos.append('xhtml:div')
  }

  private update(svg: any, world: World, z: number): void {
    const updateRooms = svg.selectAll('.room').data(world[z].nodes, (node: Node) => node.id);
    updateRooms.attr('transform', this.transform);

    this.roomBackground(updateRooms.selectAll('rect'));

    const updateFos = svg.selectAll('.room').data(world[z].nodes, (node: Node) => node.id);
    updateFos.attr('transform', this.transform);

    this.roomTitle(updateFos.selectAll('foreignObject'));
  }

  private exit(svg: any, world: World, z: number): void {
    svg.selectAll('.room').data(world[z].nodes, (node: Node) => node.id).exit().remove();
    // svg.selectAll('.room').data(world[z].nodes, (node: Node) => node.id).exit().remove();
  }

}
