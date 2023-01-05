import Animate from '../core/core.animate';
import LayerSnapshot from '../core/core.snapshot';
import { GraphView } from '../view';
import { TaskEventQueue } from '../core/task';
import GraphAnimationTask from './task.graph.animation';
import GraphViewTask from './task.graph.view';

class GraphTaskController {
  private animate: Animate;
  private layerSnapshot: LayerSnapshot;
  private graphView: GraphView;
  private taskEventQueue: TaskEventQueue;

  constructor(animate: Animate, layerSnapshot: LayerSnapshot, graphView: GraphView, taskEventQueue: TaskEventQueue) {
    this.animate = animate;
    this.layerSnapshot = layerSnapshot;
    this.graphView = graphView;
    this.taskEventQueue = taskEventQueue;
  }

  init() {
    this.taskEventQueue.register(
      "primary", 
      [this.layerSnapshot, this.graphView], 
      GraphViewTask.initTask
    );
  }

  flowLine(interval: number, endCondition: number) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, interval, endCondition], 
      GraphAnimationTask.flowLineTask
    );
  }

  singlePointPopUp(lineIndex: number, index: number) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, lineIndex, index], 
      GraphAnimationTask.singlePointPopUpTask
    );
  }

  singlePointPopDown(lineIndex: number, index: number) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, lineIndex, index], 
      GraphAnimationTask.singlePointPopDownTask
    );
  }

  singleInteractivePointPopUp(lineIndex: number, index: number) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, lineIndex, index], 
      GraphAnimationTask.singleInteractivePointPopUpTask
    );
  }

  singleInteractivePointPopDown(lineIndex: number, index: number) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, lineIndex, index], 
      GraphAnimationTask.singleInteractivePointPopDownTask
    );
  }

  multiplePointPopUp(index: number, isTooltip: boolean) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, index, isTooltip], 
      GraphAnimationTask.multiplePointPopUpTask
    );
  }

  multiplePointPopUpDown(lastIndex: number, index: number, isTooltip: boolean) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, lastIndex, index, isTooltip], 
      GraphAnimationTask.multiplePointPopUpDownTask
    );
  }

  multiplePointPopDown(index: number, isTooltip: boolean) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, index, isTooltip], 
      GraphAnimationTask.multiplePointPopDownTask
    );
  }

  fixedPointPopUp(x: number, index: number, isTooltip: boolean) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, x, index, isTooltip], 
      GraphAnimationTask.fixedPointPopUpTask
    );
  }

  fixedPointPopDown(x: number,index: number, isTooltip: boolean) {
    this.taskEventQueue.register(
      "event", 
      [this.animate, this.layerSnapshot, this.graphView, x, index, isTooltip], 
      GraphAnimationTask.fixedPointPopDownTask
    );
  }
}

export default GraphTaskController;