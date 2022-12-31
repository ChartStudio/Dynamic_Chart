import Position from '../core/core.position'

interface Layer {
  createTime: number;
  data: HTMLImageElement;
}

class LayerSnapshot {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;

  // Postion Object
  private position: Position;

  private directory: Map<string, Layer>

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null, position: Position) {
    this.canvas = canvas;
    this.context = context;
    this.position = position;

    this.directory = new Map();
  }

  hasShot(key: string): boolean {
    return this.directory.has(key)
  }

  shot(key: string) {
    this.directory.set(key, this.buildLayer())
  }

  print(key: string) {
    if (!this.hasShot(key)) {
      return;
    }

    let pixel = this.position.getRectPixel()
    let layer = this.getLayer(key)
    this.context?.drawImage(layer!.data, 0, 0, pixel.x, pixel.y);
  }

  private getLayer(key: string): Layer | undefined {
    return this.directory.get(key)
  }

  private buildLayer(): Layer {
    let url = this.canvas.toDataURL()
    let snapshot = new Image()
    snapshot.src = url
    snapshot.onload = () => {}

    return {
      createTime: Date.now(),
      data: snapshot
    }
  }
}

export default LayerSnapshot;