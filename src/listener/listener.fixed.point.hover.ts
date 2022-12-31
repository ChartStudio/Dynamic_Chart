import Position from "../core/core.position";
import { GraphTaskController } from "../task";

class FixedPointHoverHelper {
  position: Position;
  graphTaskController: GraphTaskController; 
  savedIndex: number;

  constructor(position: Position, graphTaskController: GraphTaskController) {
    this.savedIndex = this.initLocation()
    this.position = position;
    this.graphTaskController = graphTaskController;
  }

  initLocation() {
    return -1;
  }

  isLocationValid(index: number) {
    if (index !== -1) {
      return true;
    }
    return false;
  }

  isSameLocation(index: number) {
    if (index === this.savedIndex) {
      return true;
    }
    return false;
  }
}

export const fixedPointMouseMoveListener = (x: number, y: number, helper: FixedPointHoverHelper, event: MouseEvent) => {
  let lineGapWidth = helper.position.getLineGapWidth()
  let findIndex = helper.position.isPixelXAxisPoint(x, lineGapWidth / 2)
  if (!helper.isLocationValid(findIndex)) {
    return;
  }

  helper.savedIndex = findIndex
  helper.graphTaskController.fixedPointPopUp(x, helper.savedIndex, true)
}

export const fixedPointMouseLeaveListener = (event: MouseEvent, helper: FixedPointHoverHelper) => {
  event.stopPropagation()

  if (helper.isLocationValid(helper.savedIndex)) {
    helper.graphTaskController.fixedPointPopDown(0, helper.savedIndex, false)
    helper.savedIndex = helper.initLocation()
  }
}


export default FixedPointHoverHelper;