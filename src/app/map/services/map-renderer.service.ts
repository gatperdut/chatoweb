import { Injectable } from "@angular/core";
import * as d3 from "d3";
import { MapUtils, Orientation } from "../constants/map.constants";
import { Link } from "../models/link.model";
import { Node } from '../models/node.model';
import { World } from "../models/world.model";
import { MapAnimatorService } from "./map-animator.service";
import { MapViewerService } from "./map-viewer.service";

@Injectable({
  providedIn: 'root'
})
export class MapRendererService {

  constructor(
    private mapViewerService: MapViewerService,
    private mapAnimatorService: MapAnimatorService
  ) {

  }

  private linkCurve: any = d3.line().curve(d3.curveNatural);

  public markers(svg: any): void {
    svg.append("svg:defs")
    .selectAll("marker")
    .data(["end"])
    .enter()
    .append("svg:marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 10)
    .attr("refY", 0)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto-start-reverse")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");
  }

  public zoom(svg: any): any {
    return d3.zoom()
    .scaleExtent([1/4, 1])
    .on(
      'zoom',
      (event: any) => {
        svg.select('.map').attr('transform', event.transform);
      }
    );
  }

  private room(room: any): void {
    room
    .style('filter', 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7)')
    .style('opacity', 0).transition().duration(500).ease(d3.easeLinear).style('opacity', 1);
  }

  private roomContainer(roomContainer: any): void {
    roomContainer
    .attr("x", (node: Node, i: number) => node.x)
    .attr("y", (node: Node, i: number) => node.y)
    .attr("width", MapUtils.NodeSide)
    .attr("height", MapUtils.NodeSide)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2')
    .style('cursor', 'pointer');
  }

  private title(title: any) {
    title
    .attr("text-anchor", "middle")
    .style('height', '65px')
    .style('overflow', 'hidden')
    .style('text-align', 'center')
    .html((node: Node) => node.id + '\n' + node.room.title)
  }

  private titleContainer(titleContainer: any): void {
    titleContainer
    .attr("x", (node: Node, i: number) => node.x)
    .attr("y", (node: Node, i: number) => node.y)
    .attr('width', 150)
    .attr('height', 75)
    .style('border', '1px solid black')
    .style('border-bottom', 'none')
    .style('background-color', '#498392')
    .style('padding', 5)
    .style('cursor', 'pointer');

    const title = titleContainer.select('.title');

    this.title(title);
  }

  private linkArrow(linkArrow: any): void {
    linkArrow
    .attr('d', (link: Link) => this.linkCurve(link.lineCoords))
    .attr('stroke', 'black')
    .attr('fill', 'none')
    .attr("marker-end", "url(#arrowhead)")
    .attr("marker-start", "url(#arrowhead)");
  }

  private linkDoor(linkDoor: any): void {
    linkDoor
		.attr('height', '33px')
    .attr('width', '30px')
    .attr('transform', (link: Link) => `translate(${link.doorCoords[0]}, ${link.doorCoords[1]})`)
    .style('font-size', '30px')
    .html('<i class="fa fa-dungeon"></i>')
    .style('cursor', 'pointer');
  }

  public render(svg: any, zoom: any, world: World, z: number): void {
    svg.on('click', () => { this.mapViewerService.selectNode(null); this.mapAnimatorService.selectNode(svg, world, zoom, null)});

    this.enterRooms(svg, zoom, world, z);
    this.updateRooms(svg, zoom, world, z);
    this.exitRooms(svg, zoom, world, z);

    this.enterLinks(svg, zoom, world, z);
    this.updateLinks(svg, zoom, world, z);
    this.exitLinks(svg, zoom, world, z);
  }

  private coplanarLinks(links: Link[], z: number): Link[] {
    return links.filter(
      (link: Link): boolean => {
        return MapUtils.coplanarDirections.includes(link.direction) && link.source.unitZ === z;
      }
    );
  }

  private enterLinks(svg: any, zoom: any, world: World, z: number): void {
    const linkEnter = svg.select('.map').selectAll('.link').data(this.coplanarLinks(world.links, z), (link: Link) => link.id).enter();

    const link = linkEnter
    .append('g')
    .attr('class', 'link')
    .attr('id', (link: Link) => 'link_' + link.id)
    .on('click', (event: any, link: Link) => { event.stopPropagation(); this.mapViewerService.selectLink(link); this.mapAnimatorService.selectLink(svg, world, zoom, link) });

    const linkArrow = link
    .append('path')
    .attr('class', 'arrow');
    this.linkArrow(linkArrow);

    const linkDoor = link.filter((link: Link) => link.door)
    .append('foreignObject')
    .attr('class', 'door');
    this.linkDoor(linkDoor);
  }

  private updateLinks(svg: any, zoom: any, world: World, z: number): void {
    const linkUpdate = svg.select('.map').selectAll('.link').data(this.coplanarLinks(world.links, z), (link: Link) => link.id);

    linkUpdate
    .select('foreignObject')
    .remove();

    linkUpdate.filter((link: Link) => link.door)
    .append('foreignObject')
    .attr('class', 'door');

    const linkArrow = linkUpdate.select('.arrow');
    this.linkArrow(linkArrow);


    const linkDoor = linkUpdate.select('.door');
    this.linkDoor(linkDoor);
  }

  private exitLinks(svg: any, zoom: any, world: World, z: number): void {
    svg.select('.map').selectAll('.link').data(this.coplanarLinks(world.links, z), (link: Link) => link.id)
    .exit()
    .remove();
  }

  private enterRooms(svg: any, zoom: any, world: World, z: number): void {
    const roomEnter = svg.select('.map').selectAll('.node').data(world[z].nodes, (node: Node) => node.id).enter();

    const room = roomEnter
    .append('g')
    .attr('class', 'node')
    .attr('id', (node: Node) => 'node_' + node.idString)
    .on('click', (event: any, node: Node) => { event.stopPropagation(); this.mapViewerService.selectNode(node); this.mapAnimatorService.selectNode(svg, world, zoom, node) });
    this.room(room);

    const roomContainer = room
    .append('rect')
    .attr('class', 'room-container');
    this.roomContainer(roomContainer);

    const titleContainer = room
    .append('foreignObject')
    .attr('class', 'title-container');
    this.titleContainer(titleContainer);

    const title = titleContainer
    .append('xhtml:div')
    .attr('class', 'title');
  }

  private updateRooms(svg: any, zoom: any, world: World, z: number): void {
    const roomUpdate = svg.select('.map').selectAll('.node').data(world[z].nodes, (node: Node) => node.id);

    const roomContainer = roomUpdate.selectAll('.room-container');
    this.roomContainer(roomContainer);

    const titleContainer = roomUpdate.selectAll('.title-container');
    this.titleContainer(titleContainer);
  }

  private exitRooms(svg: any, zoom: any, world: World, z: number): void {
    svg.select('.map').selectAll('.node').data(world[z].nodes, (node: Node) => node.id).exit().transition().duration(500).ease(d3.easeLinear).style('opacity', 0).remove();
  }

}
