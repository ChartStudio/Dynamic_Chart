export interface LineFontData {
  x: number;
  y: number;
  value: string;
}

class LineBreakUtil {
  static lineBreak(value: string, x: number, y: number): LineFontData[] {
    let result = []
    let lineBreakValue = value.split('\n');
    let lineHeight = 10;
    let startPosition = y - (lineHeight * lineBreakValue.length)

    result.push({
      x: x,
      y: startPosition + lineHeight,
      value: lineBreakValue[0]
    })
    for (let i = 1; i < lineBreakValue.length; i++) {
      result.push({
        x: x,
        y: startPosition + (lineHeight * ((i * 2) + 1)),
        value: lineBreakValue[i]
      })
    }
    return result
  }
}

export default LineBreakUtil;