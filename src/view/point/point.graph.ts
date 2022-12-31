import { LineStyleConfig } from '../../config'
import Styler from '../../core/core.styler'
import Position from '../../core/core.position'

class GraphPoint {
  private context: CanvasRenderingContext2D | null;

  // Postion Object
  private position: Position

  // Styler Object
  private styler: Styler

  constructor(
    context: CanvasRenderingContext2D | null, 
    position: Position,
    styler: Styler
  ) {
    this.context = context;
    this.position = position;
    this.styler = styler;
  }

  drawPoint(x: number, y: number, style: LineStyleConfig) {
    if (style.isPoint === false) {
      return;
    }

    switch(style.pointType) {
      case "dot":
        this.drawDotPoint(x, y, style);
        break;
      default:
        break;
    }
  }

  private drawDotPoint(x: number, y: number, style: LineStyleConfig) {
    let radius = style.pointRadius
    let startAngle = 0
    let endAngle = Math.PI * 2 // 360
    let counterClockWise = true // 반시계 방향 여부

    this.context?.beginPath();
    
    this.styler.setDetailFillStyle(style.pointFillStyle, style.pointOpacity)
    this.context?.arc(x, y, radius, startAngle, endAngle, counterClockWise);
    this.context?.fill()

    this.styler.setDetailStrokeStyle(style.pointStrokeStyle, style.pointLineWidth);
    this.context?.stroke()
    this.context?.closePath();
  }

  drawPointToFixedSize(x: number, y: number, fixedSize: number, style: LineStyleConfig) {
    if (style.isPoint === false) {
      return;
    }

    switch(style.pointType) {
      case "dot":
        this.drawDotPointToFixedSize(x, y, fixedSize, style);
        break;
      default:
        break;
    }
  }

  private drawDotPointToFixedSize(x: number, y: number, fixedSize: number, style: LineStyleConfig) {
    let radius = style.pointRadius + fixedSize
    let startAngle = 0
    let endAngle = Math.PI * 2 // 360
    let counterClockWise = true // 반시계 방향 여부

    this.context?.beginPath();
    
    this.styler.setDetailFillStyle(style.pointFillStyle, style.pointOpacity)
    this.context?.arc(x, y, radius, startAngle, endAngle, counterClockWise);
    this.context?.fill()

    this.styler.setDetailStrokeStyle(style.pointStrokeStyle, style.pointLineWidth);
    this.context?.stroke()
    this.context?.closePath();
  }
}

export default GraphPoint;