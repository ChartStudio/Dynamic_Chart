import { LineStyle } from '../type';

const DEFAULT_IS_LINE = true;
const DEFAULT_STROKE_STYLE = '#111111';
const DEFAULT_FILL_STYLE = '#111111';
const DEFAULT_LINE_CAP = 'round';
const DEFAULT_LINE_WIDTH = 2;
const DEFAULT_IS_FULL = false;
const DEFAULT_FULL_FILL_STYLE = '#111111';
const DEFAULT_FULL_OPACITY = 0.2;
const DEFAULT_IS_POINT = false;
const DEFAULT_POINT_TYPE = "dot";
const DEFAULT_POINT_RADIUS = 3;
const DEFAULT_POINT_STROKE_STYLE = '#111111';
const DEFAULT_POINT_LINE_WIDTH = 1.5;
const DEFAULT_POINT_FILL_STYLE = '#111111';
const DEFAULT_POINT_OPACITY = 0.2;

class LineStyleConfig {
  // Line Style
  isLine: boolean = DEFAULT_IS_LINE;
  strokeStyle: string = DEFAULT_STROKE_STYLE;
  fillStyle: string = DEFAULT_FILL_STYLE;
  lineCap: string = DEFAULT_LINE_CAP;
  lineWidth: number = DEFAULT_LINE_WIDTH;
  // Full Style
  isFull: boolean = DEFAULT_IS_FULL;
  fullFillStyle: string = DEFAULT_FULL_FILL_STYLE;
  fullOpacity: number = DEFAULT_FULL_OPACITY;
  // Point Style
  isPoint: boolean = DEFAULT_IS_POINT;
  pointRadius: number = DEFAULT_POINT_RADIUS;
  pointStrokeStyle: string = DEFAULT_POINT_STROKE_STYLE;
  pointLineWidth: number = DEFAULT_POINT_LINE_WIDTH;
  pointType: string = DEFAULT_POINT_TYPE;
  pointFillStyle: string = DEFAULT_POINT_FILL_STYLE;
  pointOpacity: number = DEFAULT_POINT_OPACITY;

  constructor(style: LineStyle | undefined) {
    if (style === undefined) {
      return;
    }

    this.isLine = style.isLine ?? DEFAULT_IS_LINE
    this.isFull = style.isFull ?? DEFAULT_IS_FULL
    this.isPoint = style.isPoint ?? DEFAULT_IS_POINT

    if (style.line !== undefined) {
      this.strokeStyle = style.line.strokeStyle ?? DEFAULT_STROKE_STYLE
      this.fillStyle = style.line.fillStyle ?? DEFAULT_FILL_STYLE
      this.lineCap = style.line.cap ?? DEFAULT_LINE_CAP
      this.lineWidth = style.line.width ?? DEFAULT_LINE_WIDTH
    }

    if (style.full !== undefined) {
      this.fullFillStyle = style.full.fillStyle ?? DEFAULT_FULL_FILL_STYLE
      this.fullOpacity = style.full.opacity ?? DEFAULT_FULL_OPACITY
    }

    if (style.point !== undefined) {
      this.pointType = style.point.type ?? DEFAULT_POINT_TYPE
      this.pointRadius = style.point.radius ?? DEFAULT_POINT_RADIUS
      this.pointStrokeStyle = style.point.strokeStyle ?? DEFAULT_POINT_STROKE_STYLE
      this.pointLineWidth = style.point.width ?? DEFAULT_POINT_LINE_WIDTH
      this.pointFillStyle = style.point.fillStyle ?? DEFAULT_POINT_FILL_STYLE
      this.pointOpacity = style.point.opacity ?? DEFAULT_POINT_OPACITY
    }
  }
}

export default LineStyleConfig;