import { LineStyle } from "./type.line.style";

export interface DataFlow {
  data: GraphData[];
  style?: LineStyle;
}

export interface GraphData {
  x: number;
  y: number;
}
