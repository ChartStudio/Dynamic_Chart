import { DataFlow, GraphData } from "../type";
import LineStyleConfig from "./config.line.style";

class DataFlowConfig {
  xAxisDataList: number[][];
  yAxisDataList: number[][];
  graphDataList: GraphData[][];
  lineConfigList: LineStyleConfig[];

  constructor(datas: DataFlow[]) {
    this.xAxisDataList = datas.map((value: DataFlow): number[] =>
      value.data.map((value: GraphData): number => value.x),
    );
    this.yAxisDataList = datas.map((value: DataFlow): number[] =>
      value.data.map((value: GraphData): number => value.y),
    );
    this.graphDataList = datas.map(
      (value: DataFlow): GraphData[] => value.data,
    );
    this.lineConfigList = datas.map(
      (value: DataFlow): LineStyleConfig => new LineStyleConfig(value.style),
    );
  }

  getXAxisMaxValue(): number {
    return Math.max(...this.xAxisDataList.flat());
  }

  getXAxisMinValue(): number {
    return Math.min(...this.xAxisDataList.flat());
  }

  getYAxisMaxValue(): number {
    return Math.max(...this.yAxisDataList.flat());
  }

  getYAxisMinValue(): number {
    return Math.min(...this.yAxisDataList.flat());
  }

  getDataListLength(): number {
    return this.graphDataList.length;
  }
}

export default DataFlowConfig;
