import { HorizontalStyleConfig, VerticalStyleConfig, BackgroundStyleConfig, DataFlowConfig, LineStyleConfig } from '../config'
import { HorizontalStyle, VerticalStyle, BackgroundStyle, DataFlow } from '../type'

interface Options {
  type: string;
  width?: number;
  height?: number;
  graph: {
    xAxis: {
      gap?: number;
      style?: VerticalStyle;
    };
    yAxis: {
      gap?: number;
      style?: HorizontalStyle;
    };
    background?: BackgroundStyle;
    line: {
      datasets: DataFlow[]
      isAnimate?: boolean;
      isPointEvent?: boolean;
    };
  }
}

const DEFAULT_ANIMATION = false;
const DEFAULT_POINT_EVENT = true;
const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 200;
const DEFAULT_X_AXIS_GAP = 5;
const DEFAULT_Y_AXIS_GAP = 5;

class BaseConfig {
  type: string;
  width: number = DEFAULT_WIDTH;
  height: number = DEFAULT_HEIGHT;
  xAxisGap: number = DEFAULT_X_AXIS_GAP;
  yAxisGap: number = DEFAULT_Y_AXIS_GAP;

  // Animation Flag
  isAnimate: boolean = DEFAULT_ANIMATION;
  // Point Event Flag
  isPointEvent: boolean = DEFAULT_POINT_EVENT;

  // Style Option
  horizontalConfig: HorizontalStyleConfig;
  verticalConfig: VerticalStyleConfig;
  backgroundConfig: BackgroundStyleConfig;
  lineConfigList: LineStyleConfig[];

  // Data Option
  dataFlowConfig: DataFlowConfig;

  // After Data Settings
  maxXAxis: number;
  minXAxis: number;
  maxYAxis: number;
  minYAxis: number;
  xAxisUnit: number;
  yAxisUnit: number;
  totalXWidth: number;
  totalYHeight: number;

  constructor(options: Options) {
    this.type = options.type;
    this.width = options.width ?? DEFAULT_WIDTH
    this.height = options.height ?? DEFAULT_HEIGHT
    this.xAxisGap = options.graph.xAxis.gap ?? DEFAULT_X_AXIS_GAP
    this.yAxisGap = options.graph.yAxis.gap ?? DEFAULT_Y_AXIS_GAP

    // animation setting
    this.isAnimate = options.graph.line.isAnimate ?? DEFAULT_ANIMATION
    // point event setting
    this.isPointEvent = options.graph.line.isPointEvent ?? DEFAULT_POINT_EVENT

    // style config
    this.horizontalConfig = new HorizontalStyleConfig(options.graph.yAxis.style)
    this.verticalConfig = new VerticalStyleConfig(options.graph.xAxis.style)
    this.backgroundConfig = new BackgroundStyleConfig(options.graph.background)
    this.lineConfigList = options.graph.line.datasets.map((value: DataFlow) : LineStyleConfig => new LineStyleConfig(value.style));
    
    // data flow config
    this.dataFlowConfig = new DataFlowConfig(options.graph.line.datasets)

    // data setting
    this.maxXAxis = this.dataFlowConfig.getXAxisMaxValue()
    this.minXAxis = this.dataFlowConfig.getXAxisMinValue()
    this.maxYAxis = this.dataFlowConfig.getYAxisMaxValue()
    this.minYAxis = this.dataFlowConfig.getYAxisMinValue()

    this.totalXWidth = this.maxXAxis - this.minXAxis
    this.totalYHeight =this.maxYAxis - this.minYAxis
    this.yAxisUnit = this.buildYAxisUnit()
    this.xAxisUnit = this.buildXAxisUnit()
  }

  /**
   * TODO(It will be Customized)
   */
  buildXAxisUnit(): number {
    let totalWidth = this.maxXAxis - this.minXAxis;
    return Math.ceil(totalWidth / (this.xAxisGap - 1))
  }

  /**
   * TODO(It will be Customized)
   */
  buildYAxisUnit(): number {
    let totalHeight = this.maxYAxis - this.minYAxis;
    return Math.ceil(totalHeight / (this.yAxisGap - 1))
  }
}

export default BaseConfig;