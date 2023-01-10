import {
  HorizontalStyleConfig,
  VerticalStyleConfig,
  LineStyleConfig,
  BackgroundStyleConfig,
  TooltipStyleConfig,
  ChartTitleConfig, ChartLegendConfig,
} from '../config'
import { ColorUtil } from '../util' 
import BaseConfig from "./core.config"

class Styler {
  private context: CanvasRenderingContext2D | null;
  private horizontalConfig: HorizontalStyleConfig;
  private verticalConfig: VerticalStyleConfig;
  private backgroundConfig: BackgroundStyleConfig;
  private lineConfigList: LineStyleConfig[];
  private tooltipConfig: TooltipStyleConfig;
  private chartTitleConfig: ChartTitleConfig;
  private chartLegendConfig: ChartLegendConfig;


  private isAnimate: boolean;
  private isPointEvent: boolean;
  private isTooltipEvent: boolean;

  constructor(context: CanvasRenderingContext2D | null, config: BaseConfig) {
    this.context = context;
    this.horizontalConfig = config.horizontalConfig;
    this.verticalConfig = config.verticalConfig;
    this.backgroundConfig = config.backgroundConfig;
    this.lineConfigList = config.lineConfigList
    this.tooltipConfig = config.tooltipConfig;
    this.chartTitleConfig = config.chartTitleConfig;
    this.chartLegendConfig = config.chartLegendConfig;

    this.isAnimate = config.isAnimate;
    this.isPointEvent = config.isPointEvent;
    this.isTooltipEvent = config.isTooltipEvent;
  }
  
  isActivaPointEvent(): boolean {
    return this.isPointEvent
  }

  isActivaAnimation(): boolean {
    return this.isAnimate
  }

  isActiveTooltipEvent(): boolean {
    return this.isTooltipEvent;
  }

  isActiveBackground(): boolean {
    return this.backgroundConfig.isActvie;
  }

  isActiveBackgroundImage(): boolean {
    return this.backgroundConfig.isImage;
  }

  getBackgroundImage(): HTMLImageElement {
    return this.backgroundConfig.image;
  }

  getTooltipType(): string {
    return this.tooltipConfig.type;
  }

  getChartTitle() : ChartTitleConfig{
    return this.chartTitleConfig;
  }





  setHorizontalStyle() {
    this.context!.strokeStyle = this.horizontalConfig.strokeStyle;
    this.context!.fillStyle = this.horizontalConfig.fillStyle;
    this.context!.font = this.horizontalConfig.font;
    this.context!.lineWidth = this.horizontalConfig.lineWidth;
    this.context!.textBaseline = this.horizontalConfig.textBaseline as CanvasTextBaseline;
    this.context!.textAlign = this.horizontalConfig.textAlign as CanvasTextAlign;
  }

  setVerticalStyle() {
    this.context!.strokeStyle = this.verticalConfig.strokeStyle;
    this.context!.fillStyle = this.verticalConfig.fillStyle;
    this.context!.font = this.verticalConfig.font;
    this.context!.lineWidth = this.verticalConfig.lineWidth;
    this.context!.textBaseline = this.verticalConfig.textBaseline as CanvasTextBaseline;
    this.context!.textAlign = this.verticalConfig.textAlign as CanvasTextAlign;
  }

  setTooltipBoxStyle() {
    this.context!.lineJoin = this.tooltipConfig.boxLineJoin as CanvasLineJoin;
    this.context!.lineWidth = this.tooltipConfig.boxLineWidth;
    this.context!.strokeStyle = this.getDetailColor(this.tooltipConfig.boxStrokeStyle, this.tooltipConfig.boxStrokeOpacity);
    this.context!.fillStyle = this.getDetailColor(this.tooltipConfig.boxFillStyle, this.tooltipConfig.boxFillOpacity);
  }

  setTooltipLineStyle() {
    this.context!.lineWidth = this.tooltipConfig.lineLineWidth;
    this.context!.strokeStyle = this.getDetailColor(this.tooltipConfig.lineStrokeStyle, this.tooltipConfig.lineStrokeOpacity);
    this.context!.fillStyle = this.getDetailColor(this.tooltipConfig.lineFillStyle, this.tooltipConfig.lineFillOpacity);
  }

  setTooltipFontStyle(index: number) {
    this.context!.fillStyle = this.lineConfigList[index].tooltipFillStyle;
    this.context!.textAlign = this.lineConfigList[index].tooltipTextAlign as CanvasTextAlign
    this.context!.textBaseline = this.lineConfigList[index].tooltipTextBaseline as CanvasTextBaseline
    this.context!.font = this.lineConfigList[index].tooltipFont;
  }

  setLineStyle(style: LineStyleConfig) {
    this.context!.strokeStyle = style.strokeStyle;
    this.context!.fillStyle = style.fillStyle;
    this.context!.lineCap = style.lineCap as CanvasLineCap;
    this.context!.lineWidth = style.lineWidth;
  }

  setBackgroundStyle() {
    this.context!.fillStyle = this.getDetailColor(this.backgroundConfig.fillStyle, this.backgroundConfig.opacity);
  }

  setDetailFillStyle(color: string, opacity: number) {
    this.context!.fillStyle = this.getDetailColor(color, opacity)
  }

  private getDetailColor(color: string, opacity: number): string {
    let rgb = ColorUtil.hexToRgb(color)
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  }

  setDetailStrokeStyle(strokeStyle: string, width: number) {
    this.context!.strokeStyle = strokeStyle;
    this.context!.lineWidth = width;
  }
}

export default Styler;