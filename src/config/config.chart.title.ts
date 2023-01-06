import {ChartTitle, TitleOptions, TitleType} from "../type";


const DEFAULT_TITLE_OPTIONS: TitleOptions = {
    type:"TitleOptions",
    backgroundColor: "rgba(255,255,255,0)", //transparent
    color: "#ffffff",
    font: "Noto Sans KR",
    fontSize: 24,
    fontWeight: "bold",
    link: "",
    shadow: ""
}

const DEFAULT_NONE_TITLE = "";
const DEFAULT_INVALID_TITLE = "";


class ChartTitleConfig{
    private content: string;
    private options: TitleOptions;
    private titleType: TitleType;


    constructor(content:string, type:TitleType, options:TitleOptions) {
        this.titleType = type;
        this.content = content;
        this.options = options;
    }


    public static createTitleConfig(title: ChartTitle | string | undefined, options?:TitleOptions):ChartTitleConfig{
        if (typeof title === "undefined"){
            return new ChartTitleConfig(DEFAULT_NONE_TITLE,"none", options ?? DEFAULT_TITLE_OPTIONS)
        }
        if (typeof title === "string"){
            return new ChartTitleConfig(title, "standard", options ?? DEFAULT_TITLE_OPTIONS)
        } else if ('type' in title && title.type === 'ChartTitle'){
            return new ChartTitleConfig(title.content, "standard", title.options ?? DEFAULT_TITLE_OPTIONS);
        } else {
            return new ChartTitleConfig(DEFAULT_INVALID_TITLE, "none",DEFAULT_TITLE_OPTIONS);
        }
    }

    getTitleConfig(): ChartTitle{
        return {content : this.content, titleType :this.titleType, options: this.options, type:'ChartTitle'};
    }

    getTitleType():TitleType{
        return this.titleType;
    }

    getTitleContent():string{
        return this.content;
    }

    getTitleOptions():any{
        return this.options;
    }

    setTitleType(type:TitleType):void{
        this.titleType = type;
    }
    setTitleContent(content:string):void{
        this.content = content;
    }
    setTitleOptions(options:any):void{
        this.options = options;
    }
}


export default ChartTitleConfig;