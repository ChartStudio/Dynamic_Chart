export interface Frame {
  x: number;
  y: number;
}

class FrameUtil {
  static buildFrameList(xList: number[], yList: number[]) {
    let frameList = []

    for (let i = 0; i < xList.length; i++) {
      let x = xList[i];
      let y = yList[i];
      frameList.push({ x:x , y:y });
    }

    return frameList
  }

  static frameUp(frameList: Frame[]): Frame[] {
    let frameUpList = []

    for (let i = 1; i < frameList.length; i++) {
      let pt0X = frameList[i-1].x;
      let pt0Y = frameList[i-1].y;
      let pt1X = frameList[i].x;
      let pt1Y = frameList[i].y;

      let dx = pt1X - pt0X;
      let dy = pt1Y - pt0Y;

      for (var j = 0; j < 10; j++) {
        let x = pt0X + dx * j / 10;
        let y = pt0Y + dy * j / 10;
        frameUpList.push({ x:x , y:y });
      }
    }
    return frameUpList
  }
}

export default FrameUtil;