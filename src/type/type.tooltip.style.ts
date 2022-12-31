export interface TooltipStyle {
  type?: string;
  box: {
    strokeStyle?: string;
    strokeOpacity?: number;
    fillStyle?: string;
    fillOpacity?: number;
    lineWidth?: number;
    lineJoin?: string;
  }
  line: {
    strokeStyle?: string;
    strokeOpacity?: number;
    fillStyle?: string;
    fillOpacity?: number;
    lineWidth?: number;
  }
}