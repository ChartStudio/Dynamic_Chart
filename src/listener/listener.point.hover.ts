import Animation from "../core/core.animation";
import Position from "../core/core.position";

interface PointLocation {
  lineIndex: number;
  index: number;
}

class PointHoverHelper {
  isPopUp: boolean;
  position: Position;
  animation: Animation; 
  savedLoaction: PointLocation;

  constructor(position: Position, animation: Animation) {
    this.isPopUp = false;
    this.savedLoaction = this.initLocation()
    this.position = position;
    this.animation = animation;
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

export const pointMouseMoveListener = (x: number, y: number, helper: PointHoverHelper, event: MouseEvent) => {
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
    helper.animation.pointPopUpAnimation(helper.savedLoaction.lineIndex, helper.savedLoaction.index)
  } else if (helper.isPopUp === true && !helper.isLocationValid(findLoaction.index, findLoaction.lineIndex)) {
    helper.changeStatusPopUp()
    helper.animation.pointPopDownAnimation(helper.savedLoaction.lineIndex, helper.savedLoaction.index)
    helper.savedLoaction = findLoaction
  }
}

export const pointMouseLeaveListener = (event: MouseEvent, helper: PointHoverHelper,) => {
  event.stopPropagation()

  if (helper.isPopUp === true && helper.isLocationValid(helper.savedLoaction.index, helper.savedLoaction.lineIndex)) {
    helper.changeStatusPopUp()
    helper.animation.pointPopDownAnimation(helper.savedLoaction.lineIndex, helper.savedLoaction.index)
    helper.savedLoaction = helper.initLocation()
  }
}


export default PointHoverHelper;