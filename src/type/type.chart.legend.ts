export interface ChartLegend{
    type?: "ChartLegend"
    legendType?: ChartLegendType
    width?: number,
    height?: number,
    subTitleList?: string[],
    position?:ChartLegendPosition;
    styles:LegendStyles;
    options?: LegendOptions

}

export interface LegendStyles{
    type: "LegendStyle"
    box?: {
        strokeStyle?: string;
        strokeOpacity?: number;
        fillStyle?: string;
        fillOpacity?: number;
        lineWidth?: number;
        lineJoin?: string;
    }
}

export interface LegendOptions{
    type:"LegendOptions"
}


export type ChartLegendPosition = "top" | "bottom";
export type ChartLegendType = "static" | "dynamic" | "none";