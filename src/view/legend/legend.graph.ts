import { LineStyleConfig } from "../../config";
import { LegendDrawConfig } from "../../core/core.position";
import Position from "../../core/core.position";
import Styler from "../../core/core.styler";

class GraphLegend {
  // Canvas Object
  private context: CanvasRenderingContext2D | null;
  // Postion Object
  private position: Position;
  // Styler Object
  private styler: Styler;
  // Draw Config Object
  private DrawConfig: LegendDrawConfig;

  constructor(
    context: CanvasRenderingContext2D | null,
    position: Position,
    styler: Styler,
  ) {
    this.context = context;
    this.position = position;
    this.styler = styler;
    this.DrawConfig = this.position.getLegendViewConfig();
  }

  drawChartLegend() {
    const pixels = this.position.getLineDrawPixels();
    const totalWidth =
      this.DrawConfig.boxCount * (this.DrawConfig.gap + this.DrawConfig.width);

    // Set initial pos of legend
    let x = this.DrawConfig.xPos - totalWidth / 2;
    let y = this.DrawConfig.yPos;

    for (let i = 0; i < this.DrawConfig.boxCount; i++) {}

    pixels.map((pixel, index) => {
      this.drawSquare(
        x,
        y,
        this.DrawConfig.width,
        this.DrawConfig.height,
        pixel.style,
      );

      x += this.DrawConfig.gap + this.DrawConfig.width;
    });
  }

  private drawSquare(
    x: number,
    y: number,
    width: number,
    height: number,
    style: LineStyleConfig,
  ) {
    this.styler.setSquareColorWithLineStyle(style, 1);
    this.context!.fillRect(x, y, width, height);
  }
}

export default GraphLegend;
