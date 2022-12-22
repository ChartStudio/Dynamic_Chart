class Animate {
  static animationId: number | null = null;

  static start(animation: FrameRequestCallback) {
    this.animationId = window.requestAnimationFrame(animation)
  }

  static stop() {
    if (this.animationId !== null) {
      window.cancelAnimationFrame(this.animationId)
    }
  }
}

export default Animate;