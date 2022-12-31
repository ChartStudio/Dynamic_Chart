import { TooltipStyle } from '../type';

/**
 * Tooltip Style
 */
const DEFAULT_TYPE = 'base'

const DEFAULT_BOX_STROKE_STYLE = '#111111';
const DEFAULT_BOX_STROKE_OPACITY = 0.7;
const DEFAULT_BOX_FILL_STYLE = '#111111';
const DEFAULT_BOX_FILL_OPACITY = 0.5;
const DEFAULT_BOX_LINE_WIDTH = 3;
const DEFAULT_BOX_LINE_JOIN = 'round';

const DEFAULT_LINE_STROKE_STYLE = '#111111';
const DEFAULT_LINE_STROKE_OPACITY = 1;
const DEFAULT_LINE_FILL_STYLE = '#111111';
const DEFAULT_LINE_FILL_OPACITY = 1;
const DEFAULT_LINE_LINE_WIDTH = 1;

class TooltipStyleConfig {
  type: string = DEFAULT_TYPE

  boxStrokeStyle: string = DEFAULT_BOX_STROKE_STYLE;
  boxStrokeOpacity: number = DEFAULT_BOX_STROKE_OPACITY;
  boxFillStyle: string = DEFAULT_BOX_FILL_STYLE;
  boxFillOpacity: number = DEFAULT_BOX_FILL_OPACITY;
  boxLineWidth: number = DEFAULT_BOX_LINE_WIDTH;
  boxLineJoin: string = DEFAULT_BOX_LINE_JOIN;

  lineStrokeStyle: string = DEFAULT_LINE_STROKE_STYLE;
  lineStrokeOpacity: number = DEFAULT_LINE_STROKE_OPACITY;
  lineFillStyle: string = DEFAULT_LINE_FILL_STYLE;
  lineFillOpacity: number = DEFAULT_LINE_FILL_OPACITY;
  lineLineWidth: number = DEFAULT_LINE_LINE_WIDTH;

  constructor(style: TooltipStyle | undefined) {
    if (style === undefined) {
      return;
    }
    
    this.type = style.type ?? DEFAULT_TYPE

    if (style.box !== undefined) {
      this.boxStrokeStyle = style.box.strokeStyle ?? DEFAULT_BOX_STROKE_STYLE
      this.boxStrokeOpacity = style.box.strokeOpacity ?? DEFAULT_BOX_STROKE_OPACITY
      this.boxFillStyle = style.box.fillStyle ?? DEFAULT_BOX_FILL_STYLE
      this.boxFillOpacity = style.box.fillOpacity ?? DEFAULT_BOX_FILL_OPACITY
      this.boxLineWidth = style.box.lineWidth ?? DEFAULT_BOX_LINE_WIDTH
      this.boxLineJoin = style.box.lineJoin ?? DEFAULT_BOX_LINE_JOIN
    }

    if (style.line !== undefined) {
      this.lineStrokeStyle = style.line.strokeStyle ?? DEFAULT_LINE_STROKE_STYLE
      this.lineStrokeOpacity = style.line.strokeOpacity ?? DEFAULT_LINE_STROKE_OPACITY
      this.lineFillStyle = style.line.fillStyle ?? DEFAULT_LINE_FILL_STYLE
      this.lineFillOpacity = style.line.fillOpacity ?? DEFAULT_LINE_FILL_OPACITY
      this.lineLineWidth = style.line.lineWidth ?? DEFAULT_LINE_LINE_WIDTH
    }
  }
}

export default TooltipStyleConfig;