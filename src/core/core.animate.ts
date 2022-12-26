class Animate {
  private animationId: number | null = null;

  start(animation: FrameRequestCallback) {
    this.animationId = window.requestAnimationFrame(animation)
  }

  stop() {
    if (this.animationId !== null) {
      window.cancelAnimationFrame(this.animationId)
    }
  }
}

export default Animate;