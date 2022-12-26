import Animate from './core.animate';
import { GraphView } from '../view';

class Animation {
  private animate: Animate
  private graphView: GraphView

  constructor(graphView: GraphView) {
    this.animate = new Animate();
    this.graphView = graphView;
  }

  drawLineAnimation(
    interval: number,
    endCondition: number,
    afterAnimation: Function
  ) {
    let nextEndCondition = interval
    
    const animate = () => {
      this.graphView.refreshCanvas()
      this.graphView.drawBackground()
      this.graphView.drawYAxis()
      this.graphView.drawXAxis()
      this.graphView.drawLineToFixedPosition(nextEndCondition)
      
      nextEndCondition += interval
  
      if (nextEndCondition <= endCondition) {
        this.animate.start(animate)
      } else {
        this.animate.stop()
        afterAnimation()
      }
    }
    
    this.animate.start(animate)
  }
}

export default Animation;