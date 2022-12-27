class BasicListener {
  basicHoverEvent(
    x: number,
    y: number,
    helper: void,
    event: MouseEvent
  ) {
    console.log("Coordinate x: " + x, "Coordinate y: " + y);
  }
}

export default BasicListener;