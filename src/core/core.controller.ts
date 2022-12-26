import BaseConfig from "./core.config"
import Styler from './core.styler'
import Animation from "./core.animation";
import EventListener from "./core.event.listener";
import Position from "./core.position";
import { GraphView } from "../view";
import { HoverListener } from "../listener";

class BaseChart {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private width: number;
  private height: number;
  private config: BaseConfig;

  // Postion Object
  private position: Position
  // Styler Object
  private styler: Styler
  // Event Listener Object
  private event: EventListener;
  // Graph View Object
  private graphView: GraphView;
  // Animation Object
  private animation: Animation;

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
    // event object
    this.event = new EventListener(this.canvas)
    // animation object
    this.animation = new Animation(this.graphView)

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
    if (this.styler.isActivaAnimation() === true) {
      this.animation.drawLineAnimation(1, this.position.getAnimationEndCondition(), () => {
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

  init() {
    this.refresh()
    this.background()
    this.yAxis()
    this.xAxis()
    this.line()
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
    this.graphView.drawLine()
  }
}

export default BaseChart;