import { Injectable } from "@angular/core";
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class MapAnimatorService {

  constructor(

  ) {

  }

  public unselectNodes(svg: any) {
    svg.selectAll('.node')
    .style('opacity', 1)
    .interrupt();
  }

  public selectNode(svg: any, node: Node): void {
    this.unselectNodes(svg);

    if (!node) {
      return;
    }

    const repeat = () => {
      svg.select('#node_' + node.room.id)
      .transition()
      .duration(1000)
      .style('opacity', 0.6)
      .transition()
      .duration(1000)
      .style('opacity', 1)
      .on('end', repeat);
    }

    repeat();
  }

}
