import {HorizontalStyleConfig, VerticalStyleConfig, LineStyleConfig} from '../config'

class Styler {
  static setHorizontalStyle(context: CanvasRenderingContext2D | null, style: HorizontalStyleConfig) {
    context!.strokeStyle = style.strokeStyle;
    context!.fillStyle = style.fillStyle;
    context!.font = style.font;
    context!.lineWidth = style.lineWidth;
    context!.textBaseline = style.textBaseline as CanvasTextBaseline;
    context!.textAlign = style.textAlign as CanvasTextAlign;
  }

  static setVerticalStyle(context: CanvasRenderingContext2D | null, style: VerticalStyleConfig) {
    context!.strokeStyle = style.strokeStyle;
    context!.fillStyle = style.fillStyle;
    context!.font = style.font;
    context!.lineWidth = style.lineWidth;
    context!.textBaseline = style.textBaseline as CanvasTextBaseline;
    context!.textAlign = style.textAlign as CanvasTextAlign;
  }

  static setLineStyle(context: CanvasRenderingContext2D | null, style: LineStyleConfig) {
    context!.strokeStyle = style.strokeStyle;
    context!.fillStyle = style.fillStyle;
    context!.lineCap = style.lineCap as CanvasLineCap;
    context!.lineWidth = style.lineWidth;
  }
}

export default Styler;