import { LineStyleConfig } from '../config'
import Styler from '../core/core.styler'
import { default as Position, LineDrawPixels } from '../core/core.position'
import { GraphTooltip } from './tooltip';
import { GraphPoint } from './point';

class GraphView {
  private context: CanvasRenderingContext2D | null;

  // Postion Object
  private position: Position

  // Styler Object
  private styler: Styler

  // Sub domain
  private graphPoint: GraphPoint;
  private graphTooltip: GraphTooltip;

  constructor(
    context: CanvasRenderingContext2D | null, 
    position: Position,
    styler: Styler
  ) {
    this.context = context;
    this.position = position;
    this.styler = styler;

    this.graphPoint = new GraphPoint(this.context, this.position, this.styler)
    this.graphTooltip = new GraphTooltip(this.context, this.position, this.styler)
  }

  refreshCanvas() {
    let pixel = this.position.getRectPixel()
    this.context?.clearRect(0, 0, pixel.x, pixel.y)
  }

  drawChartTitle(){
    let pixel = this.position.getRectPixel();
    this.context?.fillText(this.styler.getChartTitle().getTitleContent(),  pixel.x / 2, 20)
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

  drawLines() {
    let pixelList = this.position.getLineDrawPixels()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;
      let full = pixelList[i].full;

      /**
       * Draw Line
       */
      this.styler.setLineStyle(style);
      this.context?.beginPath();
      this.context?.moveTo(line[0].x, line[0].y);
      for (let j = 1; j < line.length; j++) {        
        this.drawLine(line[j].x, line[j].y, style)
      }
      this.context?.stroke();

      /**
       * Fill the Line
       */
      this.drawLineWithFullOver(full.x, full.nextX, full.y, style);
      this.context?.closePath();
    }
  }

  private drawLine(x: number, y: number, style: LineStyleConfig) {
    if (style.isLine === true) {
      this.context?.lineTo(x, y);
    } else {
      this.context?.moveTo(x, y);
    }
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

  /**
   * Animation Drawing Lines Functions
   */

  drawFlowLines(endIndex: number) {
    let pixelList = this.position.getLineDrawPixelsForAnimation()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;
      let full = pixelList[i].full;

      /**
       * Draw Line
       */
      this.styler.setLineStyle(style);
      this.context?.beginPath();
      this.context?.moveTo(line[0].x, line[0].y);
      for (let j = 1; j < endIndex; j++) {
        this.drawLine(line[j].x, line[j].y, style)
      }
      this.context?.stroke();

      /**
       * Fill the Line
       */
      let endIndexPixel = line[endIndex - 1]
      this.drawLineWithFullOver(endIndexPixel.x, full.nextX, full.y, style);
      this.context?.closePath();
    }
  }

  /**
   * Drawing Points Functions
   */

  drawPoints() {
    let pixelList = this.position.getLineDrawPixels()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;

      /**
       * Draw the Point
       */
      for (let j = 0; j < line.length; j++) {
        this.graphPoint.drawPoint(line[j].x, line[j].y, style)
      }
    }
  }

  drawFlowPoints(endIndex: number) {
    let pixelList = this.position.getLineDrawPixelsForAnimation()
    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;

      /**
       * Draw the Point
       */
      for (let j = 0; j < endIndex; j++) {
        if (line[j].isDot === true) {
          this.graphPoint.drawPoint(line[j].x, line[j].y, style)
        }
      }
    }
  }

  isDrawPointsEvent(): boolean {
    return this.styler.isActivaPointEvent()
  }

  drawMultiplePointPop(index: number, size: number) {
    let pixelList = this.position.getLineDrawPixels()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;

      /**
       * Draw the Point
       */
      for (let j = 0; j < line.length; j++) {
        if (!this.isDrawPointsEvent()) {
          this.graphPoint.drawPoint(line[j].x, line[j].y, style)
          continue
        }

        if (j === index) {
          this.graphPoint.drawPointToFixedSize(line[j].x, line[j].y, size, style)
        } else {
          this.graphPoint.drawPoint(line[j].x, line[j].y, style)
        }
      }
    }
  }

  drawMultiplePointPopUpDown(lastIndex: number, index: number, lastSize: number, size: number) {
    let pixelList = this.position.getLineDrawPixels()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;

      /**
       * Draw the Point
       */
      for (let j = 0; j < line.length; j++) {
        if (!this.isDrawPointsEvent()) {
          this.graphPoint.drawPoint(line[j].x, line[j].y, style)
          continue
        }

        if (j === index) {
          this.graphPoint.drawPointToFixedSize(line[j].x, line[j].y, size, style)
        } else if (j === lastIndex) {
          this.graphPoint.drawPointToFixedSize(line[j].x, line[j].y, lastSize, style)
        } else {
          this.graphPoint.drawPoint(line[j].x, line[j].y, style)
        }
      }
    }
  }

  drawSinglePointPop(lineIndex: number, index: number, size: number) {
    let pixelList = this.position.getLineDrawPixels()

    for (let i = 0; i < pixelList.length; i++) {
      let line = pixelList[i].line;
      let style = pixelList[i].style;

      /**
       * Draw the Point
       */
      for (let j = 0; j < line.length; j++) {
        if (!this.isDrawPointsEvent()) {
          this.graphPoint.drawPoint(line[j].x, line[j].y, style)
          continue
        }
        
        if (i === lineIndex && j === index) {
          this.graphPoint.drawPointToFixedSize(line[j].x, line[j].y, size, style)
        } else {
          this.graphPoint.drawPoint(line[j].x, line[j].y, style)
        }
      }
    }
  }

  /**
   * Drawing Tooltip Functions
   */
  isDrawTooltipEvent(): boolean {
    return this.styler.isActiveTooltipEvent()
  }

  drawAvgTooltips(index: number, isActive: boolean) {
    if (isActive === false) {
      return;
    }

    let avgPixel = this.position.getSingleIndexToAvgPixel(index)
    let displayData = this.position.getDisplayTooltipDatas(index)

    this.graphTooltip.drawTooltip(avgPixel.x, avgPixel.y, displayData, index)
  }

  drawMovingAvgTooltips(lastIndex: number, index: number, size:number, gap: number, isActive: boolean) {
    if (isActive === false) {
      return;
    }

    let movingPixel = this.position.getTwinIndexToAvgMovingPixel(lastIndex, index, size, gap)
    let displayData = this.position.getDisplayTooltipDatas(index)

    this.graphTooltip.drawTooltip(movingPixel.x, movingPixel.y, displayData, index)
  }

  drawSingleTooltips(lineIndex: number, index: number, isActive: boolean) {
    if (isActive === false) {
      return;
    }

    let pixel = this.position.getSingleIndexToPixel(lineIndex, index)
    let displayData = this.position.getDisplayTooltipData(lineIndex, index)

    this.graphTooltip.drawTooltip(pixel.x, pixel.y, displayData, index)
  }

  drawSingleInteractiveTooltips(lineIndex: number, index: number, isActive: boolean) {
    if (isActive === false) {
      return;
    }

    let pixel = this.position.getSingleIndexToPixel(lineIndex, index)
    let displayData = this.position.getDisplayTooltipDatas(index)

    this.graphTooltip.drawTooltip(pixel.x, pixel.y, displayData, index)
  }

  drawFixedTooltips(x: number, index: number, isActive: boolean) {
    if (isActive === false) {
      return;
    }

    let fixedY = this.position.getMiddleYAxisPixel()
    let displayData = this.position.getDisplayTooltipDatas(index)

    this.graphTooltip.drawTooltip(x, fixedY, displayData, index)
  }
}

export default GraphView;