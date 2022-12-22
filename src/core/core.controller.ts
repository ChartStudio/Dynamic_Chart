import BaseConfig from "./core.config"
import Styler from './core.styler'
import Drawer from './core.drawer'
import Animation from "./core.animation";
import EventListener from "./core.event.listener";
import { HoverListener } from "../listener";

class BaseChart {
  private canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  config: BaseConfig;
  baseXAxisPadding: number;
  baseYAxisPadding: number;

  baseXAxisMargin: number;
  baseYAxisMargin: number;
  isOnloadNBackgroundImage: boolean = false;

  // Event Listener Object
  event: EventListener;

  constructor(canvas: HTMLCanvasElement, config: BaseConfig) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    // refeshing canvas size
    this.area(config)

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.config = config;

    this.baseXAxisPadding = 20;
    this.baseYAxisPadding = 20;

    this.baseXAxisMargin = 10;
    this.baseYAxisMargin = 10;

    // event object
    this.event = new EventListener(this.canvas)

    // loading Screen
    this.loadScreen()
    // loading Event
    this.loadEvent()
  }

  /**
   * base setting canvas
   */
  area(config: BaseConfig) {
    this.canvas.style.width = config.width + 'px';
    this.canvas.style.height = config.height + 'px';
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  /**
   * generate chart
   */
  loadScreen() {
    if (this.config.lineConfig.enableAnimation === true) {
      Animation.drawLineAnimation(this, 1, () => {
        this.init()
      })
    } else {
      this.init()
    }
  }

   /**
   * load event
   */
  loadEvent() {
    this.event.mouseMoveEvent(HoverListener.basicHoverEvent)
  }

  refresh() {
    this.context?.clearRect(0, 0, this.width + 100, this.height + 100)
  }

  init() {
    this.refresh()
    this.background(() => {
      this.yAxis()
      this.xAxis()
      this.line()
    })
  }

  background(callback: Function) {
    if (this.config.backgroundConfig.isActvie === false) {
      callback()
      return;
    }
    if (this.isOnloadNBackgroundImage === true){
      Drawer.reloadBackgroundToImage(
        this.context,
        this.width,
        this.height,
        this.config.backgroundConfig.image
      )
      callback()
    } else if (this.config.backgroundConfig.isImage === true) {
      Drawer.drawBackgroundToImage(
        this.context,
        this.width,
        this.height,
        this.config.backgroundConfig.image
      ).then((_) => {
        this.isOnloadNBackgroundImage = true
        callback()
      })
    } else {
      Drawer.drawBackground(
        this.context,
        this.width,
        this.height,
        this.config.backgroundConfig.fillStyle,
        this.config.backgroundConfig.opacity
      )
      callback()
    }
  }

  xAxis() {
    Styler.setVerticalStyle(this.context, this.config.verticalConfig)
    
    let baseXDrawPoint = this.config.minXAxis
    let baseXDrawPixel = this.baseXAxisPadding
    let baseXDrawInterval = (this.width - this.baseXAxisMargin - this.baseXAxisPadding) / (this.config.xAxisOption.space - 1)
    
    for (let i = 0; i < this.config.xAxisOption.space; i++) {
      this.context?.fillText(baseXDrawPoint.toString(), baseXDrawPixel, this.height);
      
      if (this.config.verticalConfig.drawLine === true) {
        Drawer.drawVerticalLine(
          this.context, baseXDrawPixel, this.height - this.baseYAxisPadding, this.baseYAxisMargin
        )
      }


      baseXDrawPoint += this.config.xAxisUnit;
      baseXDrawPixel += baseXDrawInterval;
    }
  }

  yAxis() {
    Styler.setHorizontalStyle(this.context, this.config.horizontalConfig)

    let baseYDrawPoint = this.config.minYAxis
    let baseYDrawPixel = this.height - this.baseYAxisPadding
    let baseYDrawInterval = (this.height - this.baseYAxisMargin - this.baseYAxisPadding) / (this.config.yAxisOption.space - 1)
    
    for (let i = 0; i < this.config.yAxisOption.space; i++) {
      this.context?.fillText(baseYDrawPoint.toString(), 0, baseYDrawPixel);
      
      if (this.config.horizontalConfig.drawLine === true) {
        Drawer.drawHorizontalLine(
          this.context, this.baseXAxisPadding, this.width - this.baseXAxisMargin, baseYDrawPixel
        )
      }

      baseYDrawPoint += this.config.yAxisUnit;
      baseYDrawPixel -= baseYDrawInterval;
    }
  }

  line() {
    Styler.setLineStyle(this.context, this.config.lineConfig)

    this.context?.beginPath();
    this.context?.moveTo(
      this.getXAxisDataPixel(this.config.xAxisData[0]) + this.baseXAxisPadding,
      this.getYAxisDataPixel(this.config.yAxisData[0]) - this.baseYAxisPadding
    );

    for (let i = 1; i < this.config.xAxisData.length; i++) {
      this.context?.lineTo(
        this.getXAxisDataPixel(this.config.xAxisData[i]) + this.baseXAxisPadding,
        this.getYAxisDataPixel(this.config.yAxisData[i]) - this.baseYAxisPadding
      );
    }

    this.context?.stroke();
    if (this.config.lineConfig.isFull == true) {
      Drawer.drawLineFull(
        this.context, 
        this.width - this.baseXAxisMargin,
        this.baseXAxisPadding,
        this.height - this.baseYAxisPadding,
        this.config.lineConfig.fullFillStyle,
        this.config.lineConfig.fullOpacity
      )
    }

    this.context?.closePath();
  }

  getXAxisDataPixel(value: number): number {
    return (((this.width - this.baseXAxisPadding - this.baseXAxisMargin) / (this.config.xAxisUnit * (this.config.xAxisOption.space - 1))) * (value - this.config.minXAxis));
  }

  getYAxisDataPixel(value: number): number {
    return (this.height - ((this.height - this.baseYAxisPadding - this.baseYAxisMargin) / (this.config.yAxisUnit * (this.config.yAxisOption.space- 1))) * (value - this.config.minYAxis));
  }
}

export default BaseChart;