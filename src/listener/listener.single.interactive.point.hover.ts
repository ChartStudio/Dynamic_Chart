import Position from "../core/core.position";
import { GraphTaskController } from "../task";

interface PointLocation {
  lineIndex: number;
  index: number;
}

class SingleInteractivePointHoverHelper {
  isPopUp: boolean;
  position: Position;
  graphTaskController: GraphTaskController; 
  savedLoaction: PointLocation;

  constructor(position: Position, graphTaskController: GraphTaskController) {
    this.isPopUp = false;
    this.savedLoaction = this.initLocation()
    this.position = position;
    this.graphTaskController = graphTaskController;
  }

  changeStatusPopUp() {
    this.isPopUp = !this.isPopUp
  }

  initLocation() {
    return {index: -1, lineIndex: -1}
  }

  isLocationValid(index: number, lineIndex: number) {
    if (index !== -1 && lineIndex !== -1) {
      return true;
    }
    return false;
  }

  isSameLocation(index: number, lineIndex: number) {
    if (index === this.savedLoaction.index && lineIndex === this.savedLoaction.lineIndex) {
      return true;
    }
    return false;
  }
}

export const singleInteractivePointMouseMoveListener = (x: number, y: number, helper: SingleInteractivePointHoverHelper, event: MouseEvent) => {
  event.stopPropagation()

  let findLoaction = helper.initLocation()

  if (helper.isPopUp === false) {
    findLoaction = helper.position.isPixelInDotPoint(x, y, 0)
  } else {
    findLoaction = helper.position.isPixelInDotPoint(x, y, 6)
  }

  if (helper.isPopUp === false && helper.isLocationValid(findLoaction.index, findLoaction.lineIndex)) {
    helper.changeStatusPopUp()
    helper.savedLoaction = findLoaction
    helper.graphTaskController.singleInteractivePointPopUp(helper.savedLoaction.lineIndex, helper.savedLoaction.index)
  } else if (helper.isPopUp === true && !helper.isLocationValid(findLoaction.index, findLoaction.lineIndex)) {
    helper.changeStatusPopUp()
    helper.graphTaskController.singleInteractivePointPopDown(helper.savedLoaction.lineIndex, helper.savedLoaction.index)
    helper.savedLoaction = findLoaction
  } else if (helper.isPopUp === true && !helper.isSameLocation(findLoaction.index, findLoaction.lineIndex)) {
    helper.savedLoaction = findLoaction
    helper.graphTaskController.singleInteractivePointPopUp(helper.savedLoaction.lineIndex, helper.savedLoaction.index)
  }
}

export const singleInteractivePointMouseLeaveListener = (event: MouseEvent, helper: SingleInteractivePointHoverHelper) => {
  event.stopPropagation()

  if (helper.isPopUp === true && helper.isLocationValid(helper.savedLoaction.index, helper.savedLoaction.lineIndex)) {
    helper.changeStatusPopUp()
    helper.graphTaskController.singleInteractivePointPopDown(helper.savedLoaction.lineIndex, helper.savedLoaction.index)
    helper.savedLoaction = helper.initLocation()
  }
}


export default SingleInteractivePointHoverHelper;