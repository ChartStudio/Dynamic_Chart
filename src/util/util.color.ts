class ColorUtil {
  static hexToRgb(hexType: string): number[] {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    let hex = hexType.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  }
}

export default ColorUtil;