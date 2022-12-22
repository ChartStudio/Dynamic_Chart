import Styler from './core.styler'
import BaseChart from './core.controller';
import Animate from './core.animate';
import { FrameUtil } from '../util';

class Animation {
  static drawLineAnimation(chart: BaseChart, interval: number, callback: Function) {
    let nextEndCondition = interval
    let frameList = FrameUtil.buildFrameList(chart.config.xAxisData, chart.config.yAxisData)
    let frameUpList = FrameUtil.frameUp(frameList)

    const animate = () => {
      chart.refresh()
      chart.background(() => {
        chart.yAxis()
        chart.xAxis()
        Styler.setLineStyle(chart.context, chart.config.lineConfig)
  
        chart.context?.beginPath();
        chart.context?.moveTo(
          chart.getXAxisDataPixel(chart.config.xAxisData[0]) + chart.baseXAxisPadding,
          chart.getYAxisDataPixel(chart.config.yAxisData[0]) - chart.baseYAxisPadding
        );
    
        for (let i = 1; i < nextEndCondition; i++) {
          chart.context?.save();
          chart.context?.lineTo(
            chart.getXAxisDataPixel(frameUpList[i].x) + chart.baseXAxisPadding,
            chart.getYAxisDataPixel(frameUpList[i].y) - chart.baseYAxisPadding
          );
          chart.context?.restore();
        }
  
        chart.context?.stroke();
        chart.context?.closePath();
        nextEndCondition += interval
  
        if (nextEndCondition <= frameUpList.length) {
          Animate.start(animate)
        } else {
          Animate.stop()
          callback()
        }
      })
    }
    
    Animate.start(animate)
  }
}

export default Animation;