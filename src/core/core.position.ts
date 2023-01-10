import BaseConfig from "./core.config"
import {ChartLegendConfig, ChartTitleConfig, DataFlowConfig, LineStyleConfig} from '../config'
import { GraphData } from '../type'
import { FrameUtil, Frame } from '../util';

export interface LineDrawPixels {
  line: BasePixel[];
  full: FullLineDrawPixel
  style: LineStyleConfig
}

export interface BasePixel {
  x: number,
  y: number
}

export interface FullLineDrawPixel {
  x: number,
  y: number,
  nextX: number
}

export interface AnimationDrawPixels {
  line: AnimationPixel[];
  full: FullLineDrawPixel
  style: LineStyleConfig
}

export interface AnimationPixel {
  x: number,
  y: number,
  isDot: boolean
}

export interface AxisDrawPixel {
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

export interface FindPointIndex {
  lineIndex: number;
  index: number;
}

const DEFAULT_X_AXIS_PADDING = 20;
const DEFAULT_Y_AXIS_PADDING = 80;
const DEFAULT_X_AXIS_MARGIN = 40;
const DEFAULT_Y_AXIS_MARGIN = 40;

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
    //canvas size
    this.width = config.width
    this.height = config.height;

    // 표준 x,y축 padding
    this.baseXAxisPadding = DEFAULT_X_AXIS_PADDING;
    this.baseYAxisPadding = DEFAULT_Y_AXIS_PADDING;

    //표준 x,y축 margin
    this.baseXAxisMargin = DEFAULT_X_AXIS_MARGIN;
    this.baseYAxisMargin = DEFAULT_Y_AXIS_MARGIN;

    //title과 legend 유무에 따른 padding과 margin 설정
    this.setTitleSpace(config.chartTitleConfig)
    this.setLegendSpace(config.chartLegendConfig)

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

  setTitleSpace(titleConfig:ChartTitleConfig){
    if(titleConfig.getTitleType() !== "none"){
      this.baseYAxisMargin += 10;
    }
  }
  setLegendSpace(legendConfig:ChartLegendConfig): void{
    if(legendConfig.getLegendType() !== 'none'){
      if(legendConfig.getLegendPosition() === 'top'){
        this.baseYAxisMargin += legendConfig.getLegendHeight()
      } else {
        this.baseYAxisPadding += legendConfig.getLegendHeight()
      }
    }
  }

  getMaxYAxisPixel(): number {
    return this.baseYAxisMargin
  }

  getMiddleYAxisPixel(): number {
    return this.baseYAxisMargin + ((this.height - this.baseYAxisPadding - this.baseYAxisMargin) / 2)
  }

  getMinYAxisPixel(): number {
    return this.height - this.baseYAxisPadding
  }

  getMiddleXAxisPixel(): number {
    return (this.width - this.baseXAxisMargin - this.baseXAxisPadding)/2
  }

  isLeft(index: number): boolean {
    return (index > (this.dataFlowConfig.graphDataList[0].length / 2))
  }

  getFlowEndIndex(): number {
    if (this.requireFrameUp()) {
      return (this.dataFlowConfig.graphDataList[0].length * 9)
    }
    return this.dataFlowConfig.graphDataList[0].length
  }

  getFlowInterval(): number {
    if (this.requireFrameUp()) {
      return 1
    }
    return Math.floor(this.dataFlowConfig.graphDataList[0].length / 100)
  }

  private requireFrameUp(): boolean {
    return (this.dataFlowConfig.graphDataList[0].length < 100)
  }

  getRectPixel(): BasePixel {
    //canvas size 반환
    return {
      x: this.width,
      y: this.height,
    }
  }

  getXAxisDrawPixels(): AxisDrawPixel[] {
    //gap을 유동값으로 해야 legend의 동적 애니메이션 구현이 가능할 듯 함
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
        style: this.dataFlowConfig.lineConfigList[index]
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

  getLineDrawPixelsForAnimation(): AnimationDrawPixels[] {
    if (this.requireFrameUp()) {
      return this.getLineDrawAnimationPixelsWithFrameUp()
    }
    return this.getLineDrawAnimationPixels()
  }

  private getLineDrawAnimationPixels(): AnimationDrawPixels[] {
    return this.dataFlowConfig.graphDataList.map((value: GraphData[], index: number) : AnimationDrawPixels => {
      let frameList: Frame[] = FrameUtil.buildFrameList(
        value.map((value: GraphData): number => value.x), 
        value.map((value: GraphData): number => value.y)
      )
      
      return {
        line: this.getAnimationPixel(frameList),
        full: this.getFullLineDrawPixel(),
        style: this.dataFlowConfig.lineConfigList[index]
      }
    })
  }

  private getLineDrawAnimationPixelsWithFrameUp(): AnimationDrawPixels[] {
    return this.dataFlowConfig.graphDataList.map((value: GraphData[], index: number) : AnimationDrawPixels => {
      let frameList: Frame[] = FrameUtil.buildFrameList(
        value.map((value: GraphData): number => value.x), 
        value.map((value: GraphData): number => value.y)
      )

      let frameUpList: Frame[] = FrameUtil.frameUp(frameList)
      
      return {
        line: this.getAnimationPixel(frameUpList),
        full: this.getFullLineDrawPixel(),
        style: this.dataFlowConfig.lineConfigList[index]
      }
    })
  }

  private getAnimationPixel(frameList: Frame[]): AnimationPixel[] {
    return frameList.map((value: Frame) : AnimationPixel => {
      return {
        x: (this.getXAxisDataPixel(value.x) + this.baseXAxisPadding), 
        y: (this.getYAxisDataPixel(value.y) - this.baseYAxisPadding),
        isDot: value.isDot
      }
    })
  }

  getXAxisDataPixel(value: number): number {
    return (((this.width - this.baseXAxisPadding - this.baseXAxisMargin) / (this.xAxisUnit * (this.xAxisGap - 1))) * (value - this.minXAxis));
  }

  getYAxisDataPixel(value: number): number {
    return (this.height - ((this.height - this.baseYAxisPadding - this.baseYAxisMargin) / (this.yAxisUnit * (this.yAxisGap - 1))) * (value - this.minYAxis));
  }

  isPixelInDotPoint(x: number, y: number, fixedSize: number): FindPointIndex {
    for (let i = 0; i < this.dataFlowConfig.graphDataList.length; i++) {
      let line = this.dataFlowConfig.graphDataList[i];
      let style = this.dataFlowConfig.lineConfigList[i];
      let originalRadius = style.pointRadius
      let r = originalRadius + fixedSize

      for (let j = 0; j < line.length; j++) {
        let a = this.getXAxisDataPixel(line[j].x) + this.baseXAxisPadding
        let b = this.getYAxisDataPixel(line[j].y) - this.baseYAxisPadding
        let condition = ((x - a) * (x - a)) + ((y - b) * (y - b))
        if (condition < (r * r)) {
          return {lineIndex: i, index: j}
        }
      }
    }
    return {lineIndex: -1, index: -1}
  }

  isPixelXAxisPoint(x: number, fixedSize: number): number {
    for (let i = 0; i < this.dataFlowConfig.graphDataList.length; i++) {
      let line = this.dataFlowConfig.graphDataList[i];

      for (let j = 0; j < line.length; j++) {
        let pointX = this.getXAxisDataPixel(line[j].x) + this.baseXAxisPadding
        if (pointX + fixedSize > x && pointX - fixedSize < x) {
          return j
        }
      }
    }
    return -1
  }

  getLineGapWidth(): number {
    let line = this.dataFlowConfig.graphDataList[0];
    if (line.length <= 1) {
      return this.width - this.baseXAxisMargin - this.baseXAxisPadding;
    } else {
      return this.getXAxisDataPixel(line[1].x) - this.getXAxisDataPixel(line[0].x)
    }
  }

  getSingleIndexToPixel(lineIndex: number, index: number): BasePixel {
    let line = this.dataFlowConfig.graphDataList[lineIndex];

    let x = this.getXAxisDataPixel(line[index].x) + this.baseXAxisPadding
    let y = this.getYAxisDataPixel(line[index].y) - this.baseYAxisPadding
    
    return {x: x, y: y}
  }

  getSingleIndexToAvgPixel(index: number): BasePixel {
    let totalX = 0
    let totalY = 0

    for (let i = 0; i < this.dataFlowConfig.graphDataList.length; i++) {
      let line = this.dataFlowConfig.graphDataList[i];
      
      totalX += this.getXAxisDataPixel(line[index].x) + this.baseXAxisPadding
      totalY += this.getYAxisDataPixel(line[index].y) - this.baseYAxisPadding
    }

    let avgX = totalX / this.dataFlowConfig.graphDataList.length
    let avgY = totalY / this.dataFlowConfig.graphDataList.length


    return {x: avgX, y: avgY}
  }

  getTwinIndexToAvgMovingPixel(lastIndex: number, index: number, fixedSize: number, gap: number): BasePixel {
    let lastAvgPixel = this.getSingleIndexToAvgPixel(lastIndex)
    let avgPixel = this.getSingleIndexToAvgPixel(index)

    return this.getTwinPixelToAvgPixel(lastAvgPixel.x, avgPixel.x, 
      lastAvgPixel.y, avgPixel.y, 
      fixedSize, gap)
  }

  getTwinPixelToAvgPixel(x0: number, x1: number, y0: number, y1: number, fixedSize: number, gap: number): BasePixel {
    let x = x0 + (x1 - x0) * fixedSize / gap;
    let y = y0 + (y1 - y0) * fixedSize / gap;

    return {x: x, y: y}
  }

  getDisplayTooltipDatas(index: number): string {
    let data = []

    for (let lineIndex = 0; lineIndex < this.dataFlowConfig.graphDataList.length; lineIndex++) {
      data.push(this.getDisplayTooltipData(lineIndex, index))
    }

    return data.join("\n")
  }

  getDisplayTooltipData(lineIndex: number, index: number): string {
    let line = this.dataFlowConfig.graphDataList[lineIndex];
    let style = this.dataFlowConfig.lineConfigList[lineIndex];

    let x = line[index].x
    let y = line[index].y

    return style.tooltipCallback(x, y, lineIndex)
  }

  getLegendBoxPixel(legendConfig:ChartLegendConfig){
    const DEFAULT_LEGEND_BOX_GAP = 5;
    const middleXAxisPixel = this.getMiddleXAxisPixel()


    if(legendConfig.getLegendPosition() === "top"){

    } else if (legendConfig.getLegendPosition() === "bottom"){

    }
  }
}

export default Position;