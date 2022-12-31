import { LineBreakUtil, LineFontData } from '../../util';
import Styler from '../../core/core.styler'
import Position from '../../core/core.position'

class GraphTooltip {
  private context: CanvasRenderingContext2D | null;

  // Postion Object
  private position: Position

  // Styler Object
  private styler: Styler

  constructor(context: CanvasRenderingContext2D | null, position: Position, styler: Styler) {
    this.context = context;
    this.position = position;
    this.styler = styler;
  }

  drawTooltip(x: number, y: number, displayData: string, index: number) {
    if (!this.styler.isActiveTooltipEvent()) {
      return;
    }

    switch(this.styler.getTooltipType()) {
      case "base":
        this.drawPointTooltip(x, y, displayData, index);
        break;
      case "line":
        this.drawLineTooltip(x, y, displayData, index);
        break;
      default:
        break;
    }
  }

  private drawPointTooltip(x: number, y: number, displayData: string, index: number) {
    if (this.position.isLeft(index)) {
      this.drawPointLeftTooltip(x, y, displayData)
    } else {
      this.drawPointRightTooltip(x, y, displayData)
    }
  }

  private drawPointLeftTooltip(x: number, y: number, displayData: string) {
    // TODO(need automatic height style)

    let lineBreakList = LineBreakUtil.lineBreak(displayData, x, y)
    let displayDataList = lineBreakList.map((value: LineFontData) : string => value.value)

    let height = lineBreakList[lineBreakList.length - 1].y - lineBreakList[0].y
    let width =  this.getMaxWidthOfFont(displayDataList)
    let padding = 10

    let heightUnit = (height + padding * 2) / 2
    let widthUnit = (width + padding * 2)

    let tipSize = 10

    this.drawTooltipBox(x, y, tipSize, widthUnit, heightUnit, true)
    this.drawTooltipInText(lineBreakList, tipSize, widthUnit, true)
  }

  private drawPointRightTooltip(x: number, y: number, displayData: string) {
    // TODO(need automatic height style)

    let lineBreakList = LineBreakUtil.lineBreak(displayData, x, y)
    let displayDataList = lineBreakList.map((value: LineFontData) : string => value.value)
    
    let height = lineBreakList[lineBreakList.length - 1].y - lineBreakList[0].y
    let width =  this.getMaxWidthOfFont(displayDataList)
    let padding = 10

    let heightUnit = (height + padding * 2) / 2
    let widthUnit = (width + padding * 2)

    let tipSize = 10

    this.drawTooltipBox(x, y, tipSize, widthUnit, heightUnit, false)
    this.drawTooltipInText(lineBreakList, tipSize, widthUnit, false)
  }

  private drawLineTooltip(x: number, y: number, displayData: string, index: number) {
    if (this.position.isLeft(index)) {
      this.drawLineLeftTooltip(x, y, displayData)
    } else {
      this.drawLineRightTooltip(x, y, displayData)
    }
  }

  private drawLineLeftTooltip(x: number, y: number, displayData: string) {
    // TODO(need automatic height style)

    let lineBreakList = LineBreakUtil.lineBreak(displayData, x, y)
    let displayDataList = lineBreakList.map((value: LineFontData) : string => value.value)

    let height = lineBreakList[lineBreakList.length - 1].y - lineBreakList[0].y
    let width =  this.getMaxWidthOfFont(displayDataList)
    let padding = 10

    let heightUnit = (height + padding * 2) / 2
    let widthUnit = (width + padding * 2)

    let tipSize = 10

    this.drawTooltipLine(x)
    this.drawTooltipBox(x, y, tipSize, widthUnit, heightUnit, true)
    this.drawTooltipInText(lineBreakList, tipSize, widthUnit, true)
  }

  private drawLineRightTooltip(x: number, y: number, displayData: string) {
    // TODO(need automatic height style)

    let lineBreakList = LineBreakUtil.lineBreak(displayData, x, y)
    let displayDataList = lineBreakList.map((value: LineFontData) : string => value.value)
    
    let height = lineBreakList[lineBreakList.length - 1].y - lineBreakList[0].y
    let width =  this.getMaxWidthOfFont(displayDataList)
    let padding = 10

    let heightUnit = (height + padding * 2) / 2
    let widthUnit = (width + padding * 2)

    let tipSize = 10

    this.drawTooltipLine(x)
    this.drawTooltipBox(x, y, tipSize, widthUnit, heightUnit, false)
    this.drawTooltipInText(lineBreakList, tipSize, widthUnit, false)
  }

  private drawTooltipBox(x: number, y: number, tipSize: number, widthUnit: number, heightUnit: number, isLeft: boolean) {
    this.styler.setTooltipBoxStyle()
    this.context?.beginPath();
    this.context?.moveTo(x, y);
    if (isLeft) {
      this.context?.lineTo(x - tipSize, y - tipSize / 2);
      this.context?.lineTo(x - tipSize, y - heightUnit);
      this.context?.lineTo(x - tipSize - widthUnit, y - heightUnit);
      this.context?.lineTo(x - tipSize - widthUnit, y + heightUnit);
      this.context?.lineTo(x - tipSize, y + heightUnit);
      this.context?.lineTo(x - tipSize, y + tipSize / 2);
      this.context?.lineTo(x, y);
    } else {
      this.context?.lineTo(x + tipSize, y - tipSize / 2);
      this.context?.lineTo(x + tipSize, y - heightUnit);
      this.context?.lineTo(x + tipSize + widthUnit, y - heightUnit);
      this.context?.lineTo(x + tipSize + widthUnit, y + heightUnit);
      this.context?.lineTo(x + tipSize, y + heightUnit);
      this.context?.lineTo(x + tipSize, y + tipSize / 2);
      this.context?.lineTo(x, y);
    }
    this.context?.stroke();
    this.context?.closePath();
    this.context?.fill();
  }

  private drawTooltipLine(x: number) {
    this.styler.setTooltipLineStyle()
    this.context?.beginPath();
    this.context?.moveTo(x - 1, this.position.getMaxYAxisPixel());
    this.context?.lineTo(x - 1, this.position.getMinYAxisPixel());
    this.context?.lineTo(x + 1, this.position.getMinYAxisPixel());
    this.context?.lineTo(x + 1, this.position.getMaxYAxisPixel());
    this.context?.lineTo(x, this.position.getMaxYAxisPixel());
    this.context?.stroke();
    this.context?.closePath();
  }

  private drawTooltipInText(lineBreakList: LineFontData[], tipSize: number, widthUnit: number, isLeft: boolean) {
    lineBreakList.forEach(({value, x, y}, index) => {
      this.styler.setTooltipFontStyle(index)
      if (isLeft) {
        this.context?.fillText(value, (x - tipSize - (widthUnit / 2)), y);
      } else {
        this.context?.fillText(value, (x + tipSize + (widthUnit / 2)), y);
      }
    })
  }

  private getTotalHeightOfFont(dataList: string[]): number {
    // TODO(need to apply this function)
    let total = 0
    dataList.forEach((value, index) => {
      this.styler.setTooltipFontStyle(index)
      let measureText = this.context!.measureText(value);
      let fontHeight = measureText.fontBoundingBoxAscent + measureText.fontBoundingBoxDescent;
      total += fontHeight;
    })
    return total;
  }

  private getMaxWidthOfFont(dataList: string[]): number {
    let max = 0
    dataList.forEach((value, index) => {
      this.styler.setTooltipFontStyle(index)
      let targetWidth = this.context!.measureText(value).width;
      if (max < targetWidth) {
        max = targetWidth;
      }
    })
    return max;
  }
}

export default GraphTooltip;