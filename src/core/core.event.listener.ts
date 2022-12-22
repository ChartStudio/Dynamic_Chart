class EventListener {
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  mouseMoveEvent(handler: Function) {
    this.canvas.addEventListener("mousemove", (e) => handler(this.canvas, e))
  }

  mouseDownEvent(handler: Function) {
    this.canvas.addEventListener("mousedown", (e) => handler(this.canvas, e))
  }

  mouseUpEvent(handler: Function) {
    this.canvas.addEventListener("mouseup", (e) => handler(this.canvas, e))
  }

  mouseLeaveEvent(handler: Function) {
    this.canvas.addEventListener("mouseleave", (e) => handler(this.canvas, e))
  }
}

export default EventListener;