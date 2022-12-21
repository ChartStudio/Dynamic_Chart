interface GraphData {
  x: number,
  y: number
}

interface Options {
  xAxisOption: XAxisOption,
  yAxisOption: YAxisOption,
  width: number,
  height: number
}

interface XAxisOption {
  space: number
}

interface YAxisOption {
  space: number
}

class BaseConfig {
  type: string;
  width: number;
  height: number;
  xAxisData: number[];
  yAxisData: number[];
  maxXAxis: number;
  minXAxis: number;
  maxYAxis: number;
  minYAxis: number;
  xAxisUnit: number;
  yAxisUnit: number;
  totalXWidth: number;
  totalYHeight: number;
  xAxisOption: XAxisOption;
  yAxisOption: YAxisOption;
  // options: Options;

  constructor(type: string, data: GraphData[], options: Options) {
    this.type = type;
    this.width = options.width
    this.height = options.height
    this.xAxisData = data.map((value: GraphData) : number => value.x);
    this.yAxisData = data.map((value: GraphData) : number => value.y);
    this.maxXAxis = this.getXAxisMaxValue()
    this.minXAxis = this.getXAxisMinValue()
    this.maxYAxis = this.getYAxisMaxValue()
    this.minYAxis = this.getYAxisMinValue()
    this.xAxisOption = options.xAxisOption
    this.yAxisOption = options.yAxisOption
    this.totalXWidth = this.maxXAxis - this.minXAxis
    this.totalYHeight =this.maxYAxis - this.minYAxis
    this.yAxisUnit = this.buildYAxisUnit()
    this.xAxisUnit = this.buildXAxisUnit()
    // this.options = options;
  }

  /**
   * TODO(It will be Customized)
   */
  buildXAxisUnit(): number {
    let totalWidth = this.maxXAxis - this.minXAxis;
    return Math.ceil(totalWidth / (this.xAxisOption.space - 1))
  }

  /**
   * TODO(It will be Customized)
   */
  buildYAxisUnit(): number {
    let totalHeight = this.maxYAxis - this.minYAxis;
    return Math.ceil(totalHeight / (this.yAxisOption.space - 1))
  }

  getXAxisMaxValue(): number {
    return Math.max(...this.xAxisData)
  }

  getXAxisMinValue(): number {
    return Math.min(...this.xAxisData)
  }

  getYAxisMaxValue(): number {
    return Math.max(...this.yAxisData)
  }

  getYAxisMinValue(): number {
    return Math.min(...this.yAxisData)
  }
}

export default BaseConfig;