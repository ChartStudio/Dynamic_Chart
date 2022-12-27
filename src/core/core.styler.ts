import { HorizontalStyleConfig, VerticalStyleConfig, LineStyleConfig, BackgroundStyleConfig } from '../config'
import { ColorUtil } from '../util' 
import BaseConfig from "./core.config"

class Styler {
  private context: CanvasRenderingContext2D | null;
  private title : string;
  private horizontalConfig: HorizontalStyleConfig;
  private verticalConfig: VerticalStyleConfig;
  private backgroundConfig: BackgroundStyleConfig;
  private isAnimate: boolean;
  private isPointEvent: boolean;

  constructor(context: CanvasRenderingContext2D | null, config: BaseConfig) {
    this.context = context;
    this.title = config.title;
    this.horizontalConfig = config.horizontalConfig;
    this.verticalConfig = config.verticalConfig;
    this.backgroundConfig = config.backgroundConfig;
    this.isAnimate = config.isAnimate;
    this.isPointEvent = config.isPointEvent;
  }
  
  isActivePointEvent(): boolean {
    return this.isPointEvent
  }

  isActiveAnimation(): boolean {
    return this.isAnimate
  }

  isActiveBackground(): boolean {
    return this.backgroundConfig.isActvie;
  }

  isActiveBackgroundImage(): boolean {
    return this.backgroundConfig.isImage;
  }

  getBackgroundImage(): HTMLImageElement {
    return this.backgroundConfig.image
  }

  getGraphTitle(): string {
    return this.title
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

  setLineStyle(style: LineStyleConfig) {
    this.context!.strokeStyle = style.strokeStyle;
    this.context!.fillStyle = style.fillStyle;
    this.context!.lineCap = style.lineCap as CanvasLineCap;
    this.context!.lineWidth = style.lineWidth;
  }

  setBackgroundStyle() {
    this.setDetailFillStyle(this.backgroundConfig.fillStyle, this.backgroundConfig.opacity);
  }

  setDetailFillStyle(color: string, opacity: number) {
    let rgb = ColorUtil.hexToRgb(color)
    this.context!.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  }

  setDetailStrokeStyle(strokeStyle: string, width: number) {
    this.context!.strokeStyle = strokeStyle;
    this.context!.lineWidth = width;
  }
}

export default Styler;