interface MousePoint {
  x: number;
  y: number;
}

class EventListener {
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  mouseMoveEvent<T>(handler: Function, helper: T) {
    this.canvas.addEventListener("mousemove", (e) => {
      let mouseMove = this.getEventLocation(e)
      return handler(mouseMove.x, mouseMove.y, helper, e)
    })
  }

  mouseDownEvent<T>(handler: Function, helper: T) {
    this.canvas.addEventListener("mousedown", (e) => {
      let mouseMove = this.getEventLocation(e)
      return handler(mouseMove.x, mouseMove.y, helper, e)
    })
  }

  mouseUpEvent<T>(handler: Function, helper: T) {
    this.canvas.addEventListener("mouseup", (e) => {
      let mouseMove = this.getEventLocation(e)
      return handler(mouseMove.x, mouseMove.y, helper, e)
    })
  }

  mouseLeaveEvent<T>(handler: Function, helper: T) {
    this.canvas.addEventListener("mouseleave", (e) => handler(e, helper))
  }

  private getEventLocation(event: MouseEvent): MousePoint {
    let rect = this.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x: x, y: y}
  }
}

export default EventListener;