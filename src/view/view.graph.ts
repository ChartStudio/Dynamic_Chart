import { LineStyleConfig } from '../config'
import Styler from '../core/core.styler'
import Position from '../core/core.position'

class GraphView {
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

  refreshCanvas() {
    let pixel = this.position.getRectPixel()
    this.context?.clearRect(0, 0, pixel.x, pixel.y)
  }

  drawBackground() {
    if (this.styler.isActiveBackground() === false) {
      return;
    }
    if (this.styler.isActiveBackgroundImage()) {
      this.drawBackgroundWithImage()
    } else {
      this.drawBackgroundWithCanvas()
    }
  }

  drawCanvasTitle(){
    let pixel = this.position.getRectPixel();
    this.context?.fillText(this.styler.getGraphTitle(),  pixel.x/2, 20)
  }

  private drawBackgroundWithCanvas() {
    let pixel = this.position.getRectPixel()
    this.styler.setBackgroundStyle()

    this.context?.fillRect(0, 0, pixel.x, pixel.y);
  }

  private drawBackgroundWithImage() {
    let pixel = this.position.getRectPixel()
    let image = this.styler.getBackgroundImage()

    this.context?.drawImage(image, 0, 0, pixel.x, pixel.y);
  }

  drawXAxis() {
    let pixel = this.position.getXAxisDrawPixels()

    this.styler.setVerticalStyle()

    pixel.forEach(({line, text}) => {
      this.context?.fillText(text.value, text.x, text.y)
      this.drawVerticalLine(line.x, line.y, line.nextY)
    })
  }

  private drawVerticalLine(x: number, y: number, nextY: number) {
    this.context?.beginPath();
    this.context?.moveTo(x, y);
    this.context?.lineTo(x, nextY);
    this.context?.stroke();
    this.context?.closePath();
  }

  drawYAxis() {
    let pixel = this.position.getYAxisDrawPixels()

    this.styler.setHorizontalStyle()

    pixel.forEach(({line, text}) => {
      this.context?.fillText(text.value, text.x, text.y)
      this.drawHorizontalLine(line.x, line.nextX, line.y)
    })
  }

  private drawHorizontalLine(x: number, nextX: number, y: number) {
    this.context?.beginPath();
    this.context?.moveTo(x, y);
    this.context?.lineTo(nextX, y);
    this.context?.stroke();
    this.context?.closePath();
  }

  drawLines() {
    let pixelList = this.position.getLineDrawPixels()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;
      let full = pixelList[i].full;

      this.styler.setLineStyle(style);

      this.context?.beginPath();
      this.context?.moveTo(line[0].x, line[0].y);

      for (let j = 1; j < line.length; j++) {        
        this.drawLine(line[j].x, line[j].y, style)
      }

      this.context?.stroke();
      this.drawLineWithFullOver(full.x, full.nextX, full.y, style);
      this.context?.closePath();

      for (let j = 0; j < line.length; j++) {
        this.drawPoint(line[j].x, line[j].y, style)
      }
    }
  }

  private drawLine(x: number, y: number, style: LineStyleConfig) {
    this.styler.setLineStyle(style)

    if (style.isLine === true) {
      this.context?.lineTo(x, y);
    } else {
      this.context?.moveTo(x, y);
    }
  }

  private drawPoint(x: number, y: number, style: LineStyleConfig) {
    if (style.isPoint === false) {
      return;
    }

    switch(style.pointType) {
      case "dot":
        this.drawDotPoint(x, y, style);
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

  private drawLineWithFullOver(x: number, nextX: number, y: number, style: LineStyleConfig) {
    if (style.isFull === false) {
      return;
    }

    this.styler.setDetailFillStyle(style.fullFillStyle, style.fullOpacity)
    
    this.context?.lineTo(x, y);
    this.context?.lineTo(nextX, y);
    this.context!.globalCompositeOperation = 'destination-over';
    this.context?.fill();
    this.context!.globalCompositeOperation = 'source-over';
  }

  drawLinesToFixedPosition(fixedPosition: number) {
    let pixelList = this.position.getLineDrawPixelsForAnimation()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;
      let full = pixelList[i].full;

      this.context?.beginPath();
      this.context?.moveTo(line[0].x, line[0].y);

      for (let j = 1; j < fixedPosition; j++) {
        this.drawLine(line[j].x, line[j].y, style)
      }

      let endIndexPixel = line[fixedPosition - 1]

      this.context?.stroke();
      this.drawLineWithFullOver(endIndexPixel.x, full.nextX, full.y, style);
      this.context?.closePath();

      for (let j = 0; j < fixedPosition; j++) {
        if (line[j].isDot === true) {
          this.drawPoint(line[j].x, line[j].y, style)
        }
      }
    }
  }

  drawLinesToFixedSize(lineIndex: number, index: number, fixedSize: number) {
    let pixelList = this.position.getLineDrawPixels()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;
      let full = pixelList[i].full;

      this.styler.setLineStyle(style);

      this.context?.beginPath();
      this.context?.moveTo(line[0].x, line[0].y);

      for (let j = 1; j < line.length; j++) {        
        this.drawLine(line[j].x, line[j].y, style)
      }

      this.context?.stroke();
      this.drawLineWithFullOver(full.x, full.nextX, full.y, style);
      this.context?.closePath();

      for (let j = 0; j < line.length; j++) {
        if (i === lineIndex && j === index) {
          this.drawPointToFixedSize(line[j].x, line[j].y, fixedSize, style)
        } else {
          this.drawDotPoint(line[j].x, line[j].y, style)
        }
      }
    }
  }

  private drawPointToFixedSize(x: number, y: number, fixedSize: number, style: LineStyleConfig) {
    if (style.isPoint === false) {
      return;
    }

    switch(style.pointType) {
      case "dot":
        this.drawDotPointToFixedSize(x, y, fixedSize, style);
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

export default GraphView;