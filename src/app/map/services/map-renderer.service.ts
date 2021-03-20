import { WrappedNodeExpr } from "@angular/compiler";
import { Injectable } from "@angular/core";
import * as d3 from "d3";
import { svg } from "d3-fetch";
import { Link } from "../models/link.model";
import { Node } from '../models/node.model';
import { World } from "../models/world.model";

export const ROOM_SIZE: number = 150;

@Injectable({
  providedIn: 'root'
})
export class MapRendererService {

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
          .selectAll([
            '.room',
            '.arrow'
          ])
          .attr('transform', this.transform);
        }
      )
    );
  }

  private roomContainer(rects: any): void {
    rects
    .attr("x", (node: Node, i: number) => node.x)
    .attr("y", (node: Node, i: number) => node.y)
    .attr("width", (node: Node) => ROOM_SIZE)
    .attr("height", (node: Node) => ROOM_SIZE)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');
  }

  private title(title: any) {
    title
    .attr("text-anchor", "middle")
    .style('height', '65px')
    .style('overflow', 'hidden')
    .style('text-align', 'center')
    .html((node: Node) => node.room.id + '\n' + node.room.title)
  }

  private titleContainer(titleContainer: any): void {
    titleContainer
    .attr("x", (node: Node, i: number) => node.x)
    .attr("y", (node: Node, i: number) => node.y)
    .attr('width', 150)
    .attr('height', 75)
    .style('padding', 5)
    .style('background-color', '#498392');

    const title = titleContainer.select('.title');

    this.title(title);
  }

  public render(svg: any, world: World, z: number): void {
    this.enterRooms(svg, world, z);
    this.updateRooms(svg, world, z);
    this.exitRooms(svg, world, z);

    this.enterLinks(svg, world, z);
  }

  private enterLinks(svg: any, world: World, z: number): void {
    const linkEnter = svg.selectAll('.link').data(world[z].links, (link: Link) => link.id).enter();

    const curve = d3.line().curve(d3.curveNatural);
    const points = [[150, 75], [225, 50], [300, 75]];

      const g = svg.append('g')
      .attr('class', 'arrow')

      g.append("svg:defs")
      .selectAll("marker")
      .data(["end"])
      .enter()
      .append("svg:marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

      // add the links and the arrows
      g.append('path')
      .data(world[z].links)
      // @ts-ignore
      .attr('d', curve(points))
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr("marker-end", "url(#arrow)");

  }

  private enterRooms(svg: any, world: World, z: number): void {
    const roomEnter = svg.selectAll('.room').data(world[z].nodes, (node: Node) => node.room.id).enter();

    const room = roomEnter
    .append('g')
    .attr('class', 'room')
    .attr('transform', this.transform);

    const roomContainer = room
    .append('rect')
    .attr('class', 'room-container');
    this.roomContainer(roomContainer);

    const titleContainer = room
    .append('foreignObject')
    .attr('class', 'title-container')
    this.titleContainer(titleContainer);

    const title = titleContainer
    .append('xhtml:div')
    .attr('class', 'title');
  }

  private updateRooms(svg: any, world: World, z: number): void {
    const roomUpdate = svg.selectAll('.room').data(world[z].nodes, (node: Node) => node.room.id);
    roomUpdate.attr('transform', this.transform);

    const roomContainer = roomUpdate.selectAll('.room-container')
    this.roomContainer(roomContainer);

    const titleContainer = roomUpdate.selectAll('.title-container');
    this.titleContainer(titleContainer);
  }

  private exitRooms(svg: any, world: World, z: number): void {
    svg.selectAll('.room').data(world[z].nodes, (node: Node) => node.room.id).exit().remove();
  }

}
