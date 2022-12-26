import { LineStyle } from '../type';

const DEFAULT_STROKE_STYLE = '#111111';
const DEFAULT_FILL_STYLE = '#111111';
const DEFAULT_LINE_CAP = 'round';
const DEFAULT_LINE_WIDTH = 2;
const DEFAULT_IS_FULL = false;
const DEFAULT_FULL_FILL_STYLE = '#111111';
const DEFAULT_FULL_OPACITY = 0.2;

class LineStyleConfig {
  strokeStyle: string = DEFAULT_STROKE_STYLE;
  fillStyle: string = DEFAULT_FILL_STYLE;
  lineCap: string = DEFAULT_LINE_CAP;
  lineWidth: number = DEFAULT_LINE_WIDTH;
  isFull: boolean = DEFAULT_IS_FULL;
  fullFillStyle: string = DEFAULT_FULL_FILL_STYLE;
  fullOpacity: number = DEFAULT_FULL_OPACITY;

  constructor(style: LineStyle | undefined) {
    if (style !== undefined) {
      this.strokeStyle = style.strokeStyle ?? DEFAULT_STROKE_STYLE
      this.fillStyle = style.fillStyle ?? DEFAULT_FILL_STYLE
      this.lineCap = style.lineCap ?? DEFAULT_LINE_CAP
      this.lineWidth = style.lineWidth ?? DEFAULT_LINE_WIDTH
      this.isFull = style.isFull ?? DEFAULT_IS_FULL
      this.fullFillStyle = style.fullFillStyle ?? DEFAULT_FULL_FILL_STYLE
      this.fullOpacity = style.fullOpacity ?? DEFAULT_FULL_OPACITY
    }
  }
}

export default LineStyleConfig;