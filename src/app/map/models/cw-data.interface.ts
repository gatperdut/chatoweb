import { DataSet, Edge } from "vis";
import { CwNode } from "./cw-node.interface";

export interface CwData extends vis.Data {

  readonly nodes: DataSet<CwNode>;

  readonly edges: DataSet<Edge>;

}
