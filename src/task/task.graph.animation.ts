import Animate from "../core/core.animate";
import LayerSnapshot from "../core/core.snapshot";
import { GraphView } from "../view";

class GraphAnimationTask {
  static flowLineTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    interval: number,
    endCondition: number,
  ) {
    return new Promise((resolve, reject) => {
      let nextEndCondition = interval;

      const animatiton = () => {
        graphView.refreshCanvas();
        if (layerSnapshot.hasShot("flow")) {
          layerSnapshot.print("flow");
        } else {
          graphView.drawBackground();
          graphView.drawChartTitle();
          graphView.drawChartLegend();
          graphView.drawYAxis();
          graphView.drawXAxis();
        }

        graphView.drawFlowLines(nextEndCondition);
        graphView.drawFlowPoints(nextEndCondition);

        nextEndCondition += interval;

        if (nextEndCondition <= endCondition) {
          animate.start(animatiton);
        } else {
          animate.stop();
          resolve("flowLineTask");
        }
      };

      animate.start(animatiton);
    });
  }

  static singlePointPopUpTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    lineIndex: number,
    index: number,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 0;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawSinglePointPop(lineIndex, index, nextSize);
        }

        graphView.drawSingleTooltips(lineIndex, index, true);

        nextSize += 1;

        if (nextSize <= 6) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("singlePointPopUpTask");
        }
      };

      animate.start(animation);
    });
  }

  static singlePointPopDownTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    lineIndex: number,
    index: number,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 6;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawSinglePointPop(lineIndex, index, nextSize);
        }

        graphView.drawSingleTooltips(lineIndex, index, false);

        nextSize -= 1;

        if (nextSize >= 0) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("singlePointPopDownTask");
        }
      };

      animate.start(animation);
    });
  }

  static singleInteractivePointPopUpTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    lineIndex: number,
    index: number,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 0;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawMultiplePointPop(index, nextSize);
        }

        graphView.drawSingleInteractiveTooltips(lineIndex, index, true);

        nextSize += 1;

        if (nextSize <= 6) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("singlePointPopUpTask");
        }
      };

      animate.start(animation);
    });
  }

  static singleInteractivePointPopDownTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    lineIndex: number,
    index: number,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 6;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawMultiplePointPop(index, nextSize);
        }

        graphView.drawSingleInteractiveTooltips(lineIndex, index, false);

        nextSize -= 1;

        if (nextSize >= 0) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("singlePointPopDownTask");
        }
      };

      animate.start(animation);
    });
  }

  static multiplePointPopUpTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    index: number,
    isTooltip: boolean,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 0;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawMultiplePointPop(index, nextSize);
        }

        graphView.drawAvgTooltips(index, isTooltip);
        nextSize += 1;

        if (nextSize <= 6) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("multiplePointPopUpTask");
        }
      };

      animate.start(animation);
    });
  }

  static multiplePointPopUpDownTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    lastIndex: number,
    index: number,
    isTooltip: boolean,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 0;
      let lastSize = 6;

      let endSize = 6;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawMultiplePointPopUpDown(
            lastIndex,
            index,
            lastSize,
            nextSize,
          );
        }

        graphView.drawMovingAvgTooltips(
          lastIndex,
          index,
          nextSize,
          endSize,
          isTooltip,
        );

        nextSize += 1;
        lastSize -= 1;

        if (nextSize <= endSize) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("multiplePointPopUpDownTask");
        }
      };

      animate.start(animation);
    });
  }

  static multiplePointPopDownTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    index: number,
    isTooltip: boolean,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 6;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawMultiplePointPop(index, nextSize);
        }

        graphView.drawAvgTooltips(index, isTooltip);

        nextSize -= 1;

        if (nextSize >= 0) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("multiplePointPopDownTask");
        }
      };

      animate.start(animation);
    });
  }

  static fixedPointPopUpTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    x: number,
    index: number,
    isTooltip: boolean,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 0;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
          graphView.drawFixedTooltips(x, index, isTooltip);
          animate.stop();
          resolve("multiplePointPopUpTask");
          return;
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawMultiplePointPop(index, nextSize);
        }

        graphView.drawFixedTooltips(x, index, isTooltip);
        nextSize += 1;

        if (nextSize <= 6) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("multiplePointPopUpTask");
        }
      };

      animate.start(animation);
    });
  }

  static fixedPointPopDownTask(
    animate: Animate,
    layerSnapshot: LayerSnapshot,
    graphView: GraphView,
    x: number,
    index: number,
    isTooltip: boolean,
  ) {
    return new Promise((resolve, reject) => {
      let nextSize = 6;

      const animation = () => {
        graphView.refreshCanvas();
        if (!graphView.isDrawPointsEvent()) {
          if (layerSnapshot.hasShot("point")) {
            layerSnapshot.print("point");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
            graphView.drawPoints();
          }
          graphView.drawFixedTooltips(x, index, isTooltip);
          animate.stop();
          resolve("multiplePointPopUpTask");
          return;
        } else {
          if (layerSnapshot.hasShot("line")) {
            layerSnapshot.print("line");
          } else {
            graphView.drawBackground();
            graphView.drawChartTitle();
            graphView.drawChartLegend();
            graphView.drawYAxis();
            graphView.drawXAxis();
            graphView.drawLines();
          }
          graphView.drawMultiplePointPop(index, nextSize);
        }

        graphView.drawFixedTooltips(x, index, isTooltip);

        nextSize -= 1;

        if (nextSize >= 0) {
          animate.start(animation);
        } else {
          animate.stop();
          resolve("multiplePointPopDownTask");
        }
      };

      animate.start(animation);
    });
  }
}

export default GraphAnimationTask;
