import { ColorUtil } from '../util' 

class Drawer {
  /**
   * draw vertical line by line graph
   * 세로 축 생성
   */
  static drawVerticalLine(context: CanvasRenderingContext2D | null, x: number, y: number, nextY: number) {
    context?.beginPath();
    context?.moveTo(x, y);
    context?.lineTo(x, nextY);
    context?.stroke();
    context?.closePath();
  }

  /**
   * draw horizental line by line graph
   * 가로 축 생성
   */
  static drawHorizontalLine(context: CanvasRenderingContext2D | null, x: number, nextX: number, y: number) {
    context?.beginPath();
    context?.moveTo(x, y);
    context?.lineTo(nextX, y);
    context?.stroke();
    context?.closePath();
  }

  static drawLineFull(
    context: CanvasRenderingContext2D | null, 
    x: number, 
    nextX: number, 
    y: number,
    color: string,
    opacity: number
  ) {
    let rgb = ColorUtil.hexToRgb(color)
    context!.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    context?.lineTo(x, y);
    context?.lineTo(nextX, y);
    context!.globalCompositeOperation = 'destination-over';
    context?.fill();
    context!.globalCompositeOperation = 'source-over';
  }

  /**
   * draw background by color
   */
  static drawBackground(
    context: CanvasRenderingContext2D | null, 
    width: number,
    height: number,
    color: string,
    opacity: number
  ) {
    let rgb = ColorUtil.hexToRgb(color)
    context!.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    context?.fillRect(0, 0, width, height);
  }

  /**
   * draw background by image(first onloading)
   */
  static drawBackgroundToImage(
    context: CanvasRenderingContext2D | null, 
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    return new Promise((resolve, reject) => {
      image.onload = () => {
        context?.drawImage(image, 0, 0, width, height);
        resolve(0)
      }
    })
  }

    /**
   * draw background by image(reloading)
   */
  static reloadBackgroundToImage(
    context: CanvasRenderingContext2D | null, 
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    context?.drawImage(image, 0, 0, width, height);
  }
}

export default Drawer;