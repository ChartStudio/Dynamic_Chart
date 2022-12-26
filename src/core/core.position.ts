import BaseConfig from "./core.config"
import { DataFlowConfig, LineStyleConfig } from '../config'
import { GraphData } from '../type'
import { FrameUtil, Frame } from '../util';

interface LineDrawPixels {
  line: BasePixel[];
  full: FullLineDrawPixel
  lineStyle: LineStyleConfig
}

interface BasePixel {
  x: number,
  y: number
}

interface FullLineDrawPixel {
  x: number,
  y: number,
  nextX: number
}

interface AxisDrawPixel {
  line: {
    x: number,
    y: number,
    nextX: number,
    nextY: number
  }
  text: {
    value: string;
    x: number;
    y: number;
  }
}

const DEFAULT_X_AXIS_PADDING = 20;
const DEFAULT_Y_AXIS_PADDING = 20;
const DEFAULT_X_AXIS_MARGIN = 10;
const DEFAULT_Y_AXIS_MARGIN = 10;

class Position {
  private width: number;
  private height: number;

  private baseXAxisPadding: number;
  private baseYAxisPadding: number;
  private baseXAxisMargin: number;
  private baseYAxisMargin: number;

  private xAxisGap: number;
  private yAxisGap: number;

  // Data Option
  private dataFlowConfig: DataFlowConfig;

  // After Data Settings
  private maxXAxis: number;
  private minXAxis: number;
  private maxYAxis: number;
  private minYAxis: number;
  private xAxisUnit: number;
  private yAxisUnit: number;

  constructor(width: number, height: number, config: BaseConfig) {
    this.width = width
    this.height = height

    this.baseXAxisPadding = DEFAULT_X_AXIS_PADDING;
    this.baseYAxisPadding = DEFAULT_Y_AXIS_PADDING;

    this.baseXAxisMargin = DEFAULT_X_AXIS_MARGIN;
    this.baseYAxisMargin = DEFAULT_Y_AXIS_MARGIN;

    this.xAxisGap = config.xAxisGap
    this.yAxisGap = config.yAxisGap

    // data setting
    this.maxXAxis = config.maxXAxis
    this.minXAxis = config.minXAxis
    this.maxYAxis = config.maxYAxis
    this.minYAxis = config.minYAxis

    this.xAxisUnit = config.xAxisUnit
    this.yAxisUnit = config.yAxisUnit

    this.dataFlowConfig = config.dataFlowConfig
  }

  getAnimationEndCondition(): number {
    if (this.requireFrameUp()) {
      return (this.dataFlowConfig.graphDataList[0].length * 9)
    }
    return this.dataFlowConfig.graphDataList[0].length
  }

  private requireFrameUp(): boolean {
    return (this.dataFlowConfig.graphDataList[0].length < 100)
  }

  getRectPixel(): BasePixel {
    return {
      x: this.width,
      y: this.height
    }
  }

  getXAxisDrawPixels(): AxisDrawPixel[] {
    let axisDrawPixelList: AxisDrawPixel[] = []

    let baseXDrawPoint = this.minXAxis
    let baseXDrawPixel = this.baseXAxisPadding
    let baseXDrawInterval = (this.width - this.baseXAxisMargin - this.baseXAxisPadding) / (this.xAxisGap - 1)
    
    for (let i = 0; i < this.xAxisGap; i++) {
      axisDrawPixelList.push(
        {
          line: {
            x: baseXDrawPixel,
            y: this.height - this.baseYAxisPadding,
            nextX: baseXDrawPixel,
            nextY: this.baseYAxisMargin
          },
          text: {
            value: baseXDrawPoint.toString(),
            x: baseXDrawPixel,
            y: this.height
          }
        }
      )

      baseXDrawPoint += this.xAxisUnit;
      baseXDrawPixel += baseXDrawInterval;
    }

    return axisDrawPixelList
  }

  getYAxisDrawPixels(): AxisDrawPixel[] {
    let axisDrawPixelList: AxisDrawPixel[] = []

    let baseYDrawPoint = this.minYAxis
    let baseYDrawPixel = this.height - this.baseYAxisPadding
    let baseYDrawInterval = (this.height - this.baseYAxisMargin - this.baseYAxisPadding) / (this.yAxisGap - 1)
    
    for (let i = 0; i < this.yAxisGap; i++) {
      axisDrawPixelList.push(
        {
          line: {
            x: this.baseXAxisPadding,
            y: baseYDrawPixel,
            nextX: this.width - this.baseXAxisMargin,
            nextY: baseYDrawPixel
          },
          text: {
            value: baseYDrawPoint.toString(),
            x: 0,
            y: baseYDrawPixel
          }
        }
      )

      baseYDrawPoint += this.yAxisUnit;
      baseYDrawPixel -= baseYDrawInterval;
    }

    return axisDrawPixelList
  }

  getLineDrawPixels(): LineDrawPixels[] {
    return this.dataFlowConfig.graphDataList.map((value: GraphData[], index: number) : LineDrawPixels => {
      return {
        line: this.getLineDrawPixel(value),
        full: this.getFullLineDrawPixel(),
        lineStyle: this.dataFlowConfig.lineConfigList[index]
      }
    })
  }

  getLineDrawPixelsForAnimation(): LineDrawPixels[] {
    if (this.requireFrameUp()) {
      return this.getLineDrawPixelsWithFrameUp()
    }
    return this.getLineDrawPixels()
  }

  private getLineDrawPixelsWithFrameUp(): LineDrawPixels[] {
    return this.dataFlowConfig.graphDataList.map((value: GraphData[], index: number) : LineDrawPixels => {
      let frameList: Frame[] = FrameUtil.buildFrameList(
        value.map((value: GraphData): number => value.x), 
        value.map((value: GraphData): number => value.y)
      )

      let frameUpList: Frame[] = FrameUtil.frameUp(frameList)

      let frameUpPixel: GraphData[] = frameUpList.map((value: Frame) => {
        return {
          x: value.x,
          y: value.y
        }
      })
      
      return {
        line: this.getLineDrawPixel(frameUpPixel),
        full: this.getFullLineDrawPixel(),
        lineStyle: this.dataFlowConfig.lineConfigList[index]
      }
    })
  }

  private getLineDrawPixel(graphData: GraphData[]): BasePixel[] {
    return graphData.map((value: GraphData) : BasePixel => {
      return {
        x: (this.getXAxisDataPixel(value.x) + this.baseXAxisPadding), 
        y: (this.getYAxisDataPixel(value.y) - this.baseYAxisPadding)
      }
    })
  }

  private getFullLineDrawPixel(): FullLineDrawPixel {
    return {
      x: this.width - this.baseXAxisMargin,
      nextX: this.baseXAxisPadding,
      y: this.height - this.baseYAxisPadding,
    }
  }

  getXAxisDataPixel(value: number): number {
    return (((this.width - this.baseXAxisPadding - this.baseXAxisMargin) / (this.xAxisUnit * (this.xAxisGap - 1))) * (value - this.minXAxis));
  }

  getYAxisDataPixel(value: number): number {
    return (this.height - ((this.height - this.baseYAxisPadding - this.baseYAxisMargin) / (this.yAxisUnit * (this.yAxisGap - 1))) * (value - this.minYAxis));
  }
}

export default Position;