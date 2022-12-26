import { HorizontalStyleConfig, VerticalStyleConfig, LineStyleConfig, BackgroundStyleConfig } from '../config'
import { ColorUtil } from '../util' 
import BaseConfig from "./core.config"

class Styler {
  private context: CanvasRenderingContext2D | null;
  private horizontalConfig: HorizontalStyleConfig;
  private verticalConfig: VerticalStyleConfig;
  private backgroundConfig: BackgroundStyleConfig;
  private isAnimate: boolean;

  constructor(context: CanvasRenderingContext2D | null, config: BaseConfig) {
    this.context = context;
    this.horizontalConfig = config.horizontalConfig;
    this.verticalConfig = config.verticalConfig;
    this.backgroundConfig = config.backgroundConfig;
    this.isAnimate = config.isAnimate;
  }

  isActivaAnimation(): boolean {
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
}

export default Styler;