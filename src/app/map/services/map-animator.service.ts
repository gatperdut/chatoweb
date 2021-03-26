import { Injectable } from "@angular/core";
import { Link } from "../models/link.model";
import { Node } from '../models/node.model';

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

  private repeat = (svg: any, selector: string) => {
    svg.select(selector)
    .transition()
    .duration(1000)
    .style('opacity', 0.6)
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .on('end', () => this.repeat(svg, selector));
  }

  public selectNode(svg: any, node: Node): void {
    this.unselectNodes(svg);
    this.unselectLinks(svg);

    if (!node) {
      return;
    }

    this.repeat(svg, '#node_' + node.id);
  }

  public selectLink(svg: any, link: Link): void {
    this.unselectNodes(svg);
    this.unselectLinks(svg);

    if (!link) {
      return;
    }

    this.repeat(svg, '#link_' + link.id);
  }

}
