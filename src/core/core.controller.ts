import BaseConfig from "./core.config"

class BaseChart {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  config: BaseConfig;
  baseXAxisPadding: number;
  baseYAxisPadding: number;

  baseXAxisMargin: number;
  baseYAxisMargin: number;

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

    // first time must refresh canvas
    this.refresh()
    this.init()
  }

  refresh() {
    this.context?.clearRect(0, 0, this.width + 100, this.height + 100)
  }

  init() {
    this.background()
    this.yAxis()
    this.xAxis()
    this.line()
  }

  area(config: BaseConfig) {
    this.canvas.style.width = config.width + 'px';
    this.canvas.style.height = config.height + 'px';
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  background() {
  }

  xAxis() {
    this.context!.fillStyle = '#111111'; // TODO(go to options)
    this.context!.font = '10px'; // TODO(go to options)
    this.context!.strokeStyle = '#111111'; // TODO(go to options)
    this.context!.lineWidth = 1; // TODO(go to options)
    this.context!.textBaseline = "bottom";
    this.context!.textAlign = "center";
    
    let baseXDrawPoint = this.config.minXAxis
    let baseXDrawPixel = this.baseXAxisPadding
    let baseXDrawInterval = (this.width - this.baseXAxisMargin - this.baseXAxisPadding) / (this.config.xAxisOption.space - 1)
    
    for (let i = 0; i < this.config.xAxisOption.space; i++) {
      this.context!.lineWidth = 1; // TODO(go to options)
      this.context?.fillText(baseXDrawPoint.toString(), baseXDrawPixel, this.height);
      
      // TODO(horizantal line paht -> it must be customized)
      this.context!.lineWidth = 0.1; // TODO(go to options)
      this.context?.beginPath();
      this.context?.moveTo(baseXDrawPixel, this.height - this.baseYAxisPadding);
      this.context?.lineTo(baseXDrawPixel, this.baseYAxisMargin);
      this.context?.stroke();
      this.context?.closePath();

      baseXDrawPoint += this.config.xAxisUnit;
      baseXDrawPixel += baseXDrawInterval;
    }
  }

  yAxis() {
    this.context!.fillStyle = '#111111'; // TODO(go to options)
    this.context!.font = '10px'; // TODO(go to options)
    this.context!.lineWidth = 0.1; // TODO(go to options)
    this.context!.textBaseline = "middle";

    let baseYDrawPoint = this.config.minYAxis
    let baseYDrawPixel = this.height - this.baseYAxisPadding
    let baseYDrawInterval = (this.height - this.baseYAxisMargin - this.baseYAxisPadding) / (this.config.yAxisOption.space - 1)
    
    for (let i = 0; i < this.config.yAxisOption.space; i++) {
      this.context?.fillText(baseYDrawPoint.toString(), 0, baseYDrawPixel);
      
      // TODO(horizantal line paht -> it must be customized)
      this.context!.lineWidth = 0.1; // TODO(go to options)
      this.context?.beginPath();
      this.context?.moveTo(this.baseXAxisPadding, baseYDrawPixel);
      this.context?.lineTo(this.width - this.baseXAxisMargin, baseYDrawPixel);
      this.context?.stroke();
      this.context?.closePath();

      baseYDrawPoint += this.config.yAxisUnit;
      baseYDrawPixel -= baseYDrawInterval;
    }
  }

  line() {
    this.context!.strokeStyle = '#111111'; // TODO(go to options)
    this.context!.fillStyle = '#111111'; // TODO(go to options)
    this.context!.lineCap = 'round'; // TODO(go to options)
    this.context!.lineWidth = 2; // TODO(go to options)

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