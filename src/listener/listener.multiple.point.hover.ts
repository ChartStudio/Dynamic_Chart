import Position from "../core/core.position";
import { GraphTaskController } from "../task";

class MultiplePointHoverHelper {
  isPopUp: boolean;
  position: Position;
  graphTaskController: GraphTaskController; 
  savedIndex: number;

  constructor(position: Position, graphTaskController: GraphTaskController) {
    this.isPopUp = false;
    this.savedIndex = this.initLocation()
    this.position = position;
    this.graphTaskController = graphTaskController;
  }

  changeStatusPopUp() {
    this.isPopUp = !this.isPopUp
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

export const multiplePointMouseMoveListener = (x: number, y: number, helper: MultiplePointHoverHelper, event: MouseEvent) => {
  let lineGapWidth = helper.position.getLineGapWidth()
  let findIndex = helper.position.isPixelXAxisPoint(x, lineGapWidth / 2)
  if (!helper.isLocationValid(findIndex)) {
    return;
  }

  if (helper.isPopUp === false) {
    helper.changeStatusPopUp()
    helper.savedIndex = findIndex
    helper.graphTaskController.multiplePointPopUp(helper.savedIndex, true)
  } else if (helper.isPopUp === true && !helper.isSameLocation(findIndex)) {
    helper.graphTaskController.multiplePointPopUpDown(helper.savedIndex, findIndex, true)
    helper.savedIndex = findIndex
  }
}

export const multiplePointMouseLeaveListener = (event: MouseEvent, helper: MultiplePointHoverHelper) => {
  event.stopPropagation()

  if (helper.isLocationValid(helper.savedIndex)) {
    helper.changeStatusPopUp()
    helper.graphTaskController.multiplePointPopDown(helper.savedIndex, false)
    helper.savedIndex = helper.initLocation()
  }
}


export default MultiplePointHoverHelper;