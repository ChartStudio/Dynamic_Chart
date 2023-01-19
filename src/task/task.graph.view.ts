import { GraphView } from "../view";
import LayerSnapshot from "../core/core.snapshot";

class GraphViewTask {
  static initTask(layerSnapshot: LayerSnapshot, graphView: GraphView) {
    return new Promise((resolve, reject) => {
      graphView.refreshCanvas();
      graphView.drawBackground();
      graphView.drawChartTitle();
      graphView.drawChartLegend();
      graphView.drawXAxis();
      graphView.drawYAxis();
      layerSnapshot.shot("flow");
      graphView.drawLines();
      layerSnapshot.shot("line");
      graphView.drawPoints();
      layerSnapshot.shot("point");

      resolve("initTask");
    });
  }
}

export default GraphViewTask;
