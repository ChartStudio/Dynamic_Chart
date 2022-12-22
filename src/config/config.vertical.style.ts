import { VerticalStyle } from '../type';

/**
 * XAxis Style
 */
const DEFAULT_STROKE_STYLE = '#111111';
const DEFAULT_FILL_STYLE = '#111111';
const DEFAULT_IS_DRAW_LINE = true;
const DEFAULT_FONT = '10px';
const DEFAULT_LINE_WIDTH = 0.1;
const DEFAULT_TEXT_BASE_LINE = 'bottom';
const DEFAULT_TEXT_ALIGN = 'center';

class VerticalStyleConfig {
  strokeStyle: string = DEFAULT_STROKE_STYLE;
  fillStyle: string = DEFAULT_FILL_STYLE;
  drawLine: boolean = DEFAULT_IS_DRAW_LINE;
  font: string = DEFAULT_FONT;
  lineWidth: number = DEFAULT_LINE_WIDTH;
  textBaseline: string = DEFAULT_TEXT_BASE_LINE; // front position style
  textAlign: string = DEFAULT_TEXT_ALIGN

  constructor(style: VerticalStyle | undefined) {
    if (style !== undefined) {
      this.strokeStyle = style.strokeStyle ?? DEFAULT_STROKE_STYLE
      this.fillStyle = style.fillStyle ?? DEFAULT_FILL_STYLE
      this.drawLine = style.drawLine ?? DEFAULT_IS_DRAW_LINE
      this.font = style.font ?? DEFAULT_FONT
      this.lineWidth = style.lineWidth ?? DEFAULT_LINE_WIDTH
      this.textBaseline = style.textBaseline ?? DEFAULT_TEXT_BASE_LINE
      this.textAlign = style.textAlign ?? DEFAULT_TEXT_ALIGN
    }
  }
}

export default VerticalStyleConfig;