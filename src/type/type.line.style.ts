export interface LineStyle {
  isLine?: boolean;
  line?: {
    strokeStyle?: string;
    fillStyle?: string;
    cap?: string;
    width?: number;
  }
  isFull?: boolean;
  full?: {
    fillStyle?: string;
    opacity?: number;
  }
  isPoint?: boolean;
  point?: {
    type?: string;
    radius?: number;
    strokeStyle?: string;
    width?: number;
    fillStyle?: string;
    opacity?: number;
  }
  tooltip?: {
    fillStyle?: string;
    font?: string;
    textBaseline?: string;
    textAlign?: string;
    callback?: Function;
  }
}