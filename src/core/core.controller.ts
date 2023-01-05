import BaseConfig from "./core.config"
import Styler from './core.styler'
import EventListener from "./core.event.listener";
import Position from "./core.position";
import Animate from "./core.animate";
import LayerSnapshot from "./core.snapshot";

// sub domain
import { GraphView } from "../view";

// event domain
import { 
  SinglePointHoverHelper, 
  singlePointMouseMoveListener, 
  singlePointMouseLeaveListener 
} from "../listener";
import { 
  MultiplePointHoverHelper, 
  multiplePointMouseMoveListener, 
  multiplePointMouseLeaveListener 
} from "../listener";
import { 
  SingleInteractivePointHoverHelper, 
  singleInteractivePointMouseMoveListener, 
  singleInteractivePointMouseLeaveListener 
} from "../listener";
import { 
  FixedPointHoverHelper, 
  fixedPointMouseMoveListener, 
  fixedPointMouseLeaveListener 
} from "../listener";

// task domain (engine domain)
import { TaskEventQueue } from "./task";
import { GraphTaskController } from "../task";

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
  // Animate Object
  private animate: Animate;
  // Snapshot Object
  private layerSnapshot: LayerSnapshot;

  /**
   * View Object
   */
  // Graph View Object
  private graphView: GraphView;
  
  /**
   * Task Object
   */
  private taskEventQueue: TaskEventQueue;
  private graphTaskController: GraphTaskController;

  constructor(canvas: HTMLCanvasElement, config: BaseConfig) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    // refeshing canvas size
    this.area(config)

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.config = config;

    // Core Domain
    // position object
    this.position = new Position(this.width, this.height, this.config)
    // styler object
    this.styler = new Styler(this.context, this.config)
    // animate object
    this.animate = new Animate()
    // snapshot object
    this.layerSnapshot = new LayerSnapshot(this.canvas, this.context, this.position)


    // Sub Domain
    // graph view
    this.graphView = new GraphView(this.context, this.position, this.styler)
    // event object
    this.event = new EventListener(this.canvas)

    // task object
    this.taskEventQueue = new TaskEventQueue()
    this.graphTaskController = new GraphTaskController(this.animate, this.layerSnapshot, this.graphView, this.taskEventQueue)

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
    if (this.styler.isActivaAnimation()) {
      this.graphTaskController.flowLine(this.position.getFlowInterval(), this.position.getFlowEndIndex())
    }
    this.graphTaskController.init()
  }

  /**
   * load event
   */
  loadEvent() {
    this.linkEvent()
    // if (this.styler.isActivaPointEvent()) {
    //   this.linkEvent()
    // }
  }

  private linkEvent() {
    switch(this.config.eventFlowConfig.type) {
      case "single-point":
        this.singlePointHoverEvent();
        break;
      case "single-interactive-point":
        this.singlePointInteractiveHoverEvent();
        break;
      case "multi-point":
        this.multiplePointHoverEvent()
        break;
      case "fixed-point":
        this.fixedPointHoverEvent()
        break;
      default:
        break;
    }
  }

  private multiplePointHoverEvent() {
    let pointHoverHelper = new MultiplePointHoverHelper(this.position, this.graphTaskController)

    this.event.mouseMoveEvent(multiplePointMouseMoveListener, pointHoverHelper)
    this.event.mouseLeaveEvent(multiplePointMouseLeaveListener, pointHoverHelper)
  }

  private fixedPointHoverEvent() {
    let pointHoverHelper = new FixedPointHoverHelper(this.position, this.graphTaskController)

    this.event.mouseMoveEvent(fixedPointMouseMoveListener, pointHoverHelper)
    this.event.mouseLeaveEvent(fixedPointMouseLeaveListener, pointHoverHelper)
  }

  private singlePointHoverEvent() {
    let pointHoverHelper = new SinglePointHoverHelper(this.position, this.graphTaskController)

    this.event.mouseMoveEvent(singlePointMouseMoveListener, pointHoverHelper)
    this.event.mouseLeaveEvent(singlePointMouseLeaveListener, pointHoverHelper)
  }

  private singlePointInteractiveHoverEvent() {
    let pointHoverHelper = new SingleInteractivePointHoverHelper(this.position, this.graphTaskController)
     
    this.event.mouseMoveEvent(singleInteractivePointMouseMoveListener, pointHoverHelper)
    this.event.mouseLeaveEvent(singleInteractivePointMouseLeaveListener, pointHoverHelper)
  }
}

export default BaseChart;