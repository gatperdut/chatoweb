import { Injectable } from "@angular/core";
import { Node } from '../../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsRendererService {

  constructor(

  ) {

  }

  public render(rectsContainer: any): void {
    rectsContainer
    .append('rect')
    .attr('class', 'room')
    .attr(
      "x",
      (node: Node, i: number) => {
        return node.x;
      }
    )
    .attr(
      "y",
      (node: Node, i: number) => {
        return node.y;
      }
    )
    .attr(
      "width",
      function(node: Node) {
        return 150;
      }
    )
    .attr(
      "height",
      function(node: Node) {
        return 150;
      }
    )
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');

    rectsContainer
    .append('text')
    .attr('class', 'room-title')
    .attr(
      "x",
      (node: Node, i: number) => {
        return node.x;
      }
    )
    .attr(
      "y",
      (node: Node, i: number) => {
        return node.y;
      }
    )
    .text(
      function(node: Node) {
        return node.title;
      }
    )
  }

}
