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

  drawLine() {
    let pixelList = this.position.getLineDrawPixels()

    pixelList.forEach(({line, full, lineStyle}) => {
      this.styler.setLineStyle(lineStyle)
      line.forEach((pixel, index) => {
        if (index === 0) {
          this.context?.beginPath();
          this.context?.moveTo(pixel.x, pixel.y);
        } else {
          this.context?.lineTo(pixel.x, pixel.y);
        }

        if (index === line.length - 1) {
          this.context?.stroke();
          if (lineStyle.isFull === true) {
            this.styler.setDetailFillStyle(lineStyle.fullFillStyle, lineStyle.fullOpacity)
            this.drawLineWithFullOver(full.x, full.nextX, full.y)
          }
          this.context?.closePath();
        }
      })
    })
  }

  private drawLineWithFullOver(x: number, nextX: number, y: number) {
    this.context?.lineTo(x, y);
    this.context?.lineTo(nextX, y);
    this.context!.globalCompositeOperation = 'destination-over';
    this.context?.fill();
    this.context!.globalCompositeOperation = 'source-over';
  }

  drawLineToFixedPosition(fixedPosition: number) {
    let pixelList = this.position.getLineDrawPixelsForAnimation()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let lineStyle = pixelList[i].lineStyle;
      let full = pixelList[i].full;

      this.styler.setLineStyle(lineStyle);

      this.context?.beginPath();
      this.context?.moveTo(line[0].x, line[0].y);

      for (let j = 1; j < fixedPosition; j++) {
        this.context?.save();
        this.context?.lineTo(line[j].x, line[j].y);
        this.context?.restore();
      }

      this.context?.stroke();
      if (lineStyle.isFull === true) {
        let endIndexPixel = line[fixedPosition - 1]

        this.styler.setDetailFillStyle(lineStyle.fullFillStyle, lineStyle.fullOpacity);
        this.drawLineWithFullOver(endIndexPixel.x, full.nextX, full.y);
      }
      this.context?.closePath();
    }
  }
}

export default GraphView;