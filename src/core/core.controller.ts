import BaseConfig from "./core.config"
import Styler from './core.styler'
import Animation from "./core.animation";
import EventListener from "./core.event.listener";
import Position from "./core.position";

// sub domain
import { GraphView } from "../view";
import { PointHoverHelper, pointMouseMoveListener, pointMouseLeaveListener } from "../listener";

class BaseChart {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private width: number;
  private height: number;
  private config: BaseConfig;

  /**
   * Core Object
   */
  // Postion Object
  private position: Position
  // Styler Object
  private styler: Styler
  // Event Listener Object
  private event: EventListener;
  // Animation Object
  private animation: Animation;

  /**
   * View Object
   */
  // Graph View Object
  private graphView: GraphView;

  constructor(canvas: HTMLCanvasElement, config: BaseConfig) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    // refeshing canvas size
    this.area(config)

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.config = config;

    
    // position object
    this.position = new Position(this.width, this.height, this.config)
    // styler object
    this.styler = new Styler(this.context, this.config)
    // graph view
    this.graphView = new GraphView(this.context, this.position, this.styler)
    // animation object
    this.animation = new Animation(this.graphView)
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
    this.canvas.style.width = config.width+ 100 + 'px';
    this.canvas.style.height = config.height + 100 + 'px';
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  /**
   * generate chart
   */
  loadScreen() {
    if (this.styler.isActivaAnimation()) {
      this.animation.drawLineAnimation(1, this.position.getAnimationEndCondition(), () => {
        this.init()
      })
    } else {
      this.init()
    }
  }

  private init() {
    this.refresh()
    this.background()
    this.setTitle()
    this.yAxis()
    this.xAxis()
    this.line()
  }

  private setTitle(){
    this.graphView.drawCanvasTitle();
  }

  private refresh() {
    this.graphView.refreshCanvas()
  }

  private background() {
    this.graphView.drawBackground()
  }

  private xAxis() {
    this.graphView.drawXAxis()
  }

  private yAxis() {
    this.graphView.drawYAxis()
  }

  private line() {
    this.graphView.drawLines()
  }

  /**
   * load event
   */
  loadEvent() {
    if (this.styler.isActivaPointEvent()) {
      this.pointHoverEvent()
    }
  }

  private pointHoverEvent() {
    let pointHoverHelper = new PointHoverHelper(this.position, this.animation)

    this.event.mouseMoveEvent(pointMouseMoveListener, pointHoverHelper)
    this.event.mouseLeaveEvent(pointMouseLeaveListener, pointHoverHelper)
  }
}

export default BaseChart;