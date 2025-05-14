import { NodeTypes } from "../enums/node";

export type Node = {
  id: string;
  type: NodeTypes;
  name: string;
  path: Node[];
};

export interface LoopNode extends Node {
  maxLoopCount: number;
  loopCount: number;
}
