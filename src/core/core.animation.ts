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
      this.graphView.drawLinesToFixedPosition(nextEndCondition)
      
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

  pointPopUpAnimation(lineIndex: number, index: number) {
    let nextSize = 0
    
    const animate = () => {
      this.graphView.refreshCanvas()
      this.graphView.drawBackground()
      this.graphView.drawYAxis()
      this.graphView.drawXAxis()
      this.graphView.drawLinesToFixedSize(lineIndex, index, nextSize)
      
      nextSize += 1
  
      if (nextSize <= 6) {
        this.animate.start(animate)
      } else {
        this.animate.stop()
      }
    }
    
    this.animate.start(animate)
  }

  pointPopDownAnimation(lineIndex: number, index: number) {
    let nextSize = 6
    
    const animate = () => {
      this.graphView.refreshCanvas()
      this.graphView.drawBackground()
      this.graphView.drawYAxis()
      this.graphView.drawXAxis()
      this.graphView.drawLinesToFixedSize(lineIndex, index, nextSize)
      
      nextSize -= 1
  
      if (nextSize >= 0) {
        this.animate.start(animate)
      } else {
        this.animate.stop()
      }
    }
    
    this.animate.start(animate)
  }
}

export default Animation;