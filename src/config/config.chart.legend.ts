import {
    ChartLegend,
    ChartLegendPosition,
    ChartLegendType,
    LegendOptions,
    LegendStyles
} from "../type/type.chart.legend";


const DEFAULT_LEGEND_HEIGHT = 15
const DEFAULT_LEGEND_WIDTH = 35
const DEFAULT_LEGEND_POSITION = "top";
const DEFAULT_LEGEND_TYPE = "none"
const DEFAULT_LEGEND_OPTIONS:LegendOptions = {type:"LegendOptions"}
const DEFAULT_LEGEND_STYLES:LegendStyles = {type:"LegendStyle"};
const DEFAULT_LEGEND_BOX_GAP = 5;

const DEFAULT_SUBTITLE_LIST:string[] =[]

class ChartLegendConfig{
    private width:number
    private height:number
    private position:ChartLegendPosition
    private legendType: ChartLegendType
    private subTitleList:string[]
    private styles:LegendStyles
    private options:LegendOptions
    private gap:number;


    constructor(width?:number, height?:number, position?:ChartLegendPosition, legendType?:ChartLegendType, subTitleList?:string[], styles?:LegendStyles, options?:LegendOptions, gap?:number) {
        this.width = (width ?? DEFAULT_LEGEND_WIDTH);
        this.height = (height ?? DEFAULT_LEGEND_HEIGHT);
        this.position = position ?? DEFAULT_LEGEND_POSITION;
        this.legendType = legendType ?? DEFAULT_LEGEND_TYPE;
        this.subTitleList = subTitleList ?? DEFAULT_SUBTITLE_LIST;
        this.styles = styles ?? DEFAULT_LEGEND_STYLES;
        this.options = options ?? DEFAULT_LEGEND_OPTIONS;
        this.gap = gap ?? DEFAULT_LEGEND_BOX_GAP;
    }

    public static createChartLegendConfig(legend:ChartLegend | undefined){
        if(!!legend){
            return new ChartLegendConfig(legend.width, legend.height, legend.position, legend.legendType, legend.subTitleList, legend.styles, legend.options)
        }
        return new ChartLegendConfig(); // none type legend
    }

    getLegendType():ChartLegendType{
        return this.legendType
    }

    getLegendWidth():number{
        return this.width
    }

    getLegendHeight():number{
        return this.height
    }

    getLegendPosition(){
        return this.position
    }

    getLegendGap(){
        return this.gap
    }
}

export default ChartLegendConfig;