import {ChartTitle, TitleType} from "../type";

export interface TitleOptions{
    font?:string,
    fontSize?:number,
    fontWeight?:string,
    color?:string,
    backgroundColor?:string,
    shadow?:string,
    link?:string,
}

const DEFAULT_TITLE_OPTIONS: TitleOptions = {
    backgroundColor: "rgba(255,255,255,0)", //transparent
    color: "#ffffff",
    font: "Noto Sans KR",
    fontSize: 24,
    fontWeight: "bold",
    link: "",
    shadow: ""
}

class ChartTitleConfig{
    private content: string;
    private options: TitleOptions;
    private type: TitleType;


    constructor(content?: string | ChartTitleConfig | undefined, type?: TitleType, options?: TitleOptions) {
        if(typeof content === "undefined"){
            this.type = "none";
            this.content = "undefined Title";
            this.options = DEFAULT_TITLE_OPTIONS;
        } else if (typeof content === "string"){
            this.type = type ?? "standard";
            this.content = content;
            this.options = options ?? DEFAULT_TITLE_OPTIONS;
        }else{
            this.type = content.type ?? "standard";
            this.content = content.content ?? "DEFAULT TITLE";
            this.options = content.options ?? DEFAULT_TITLE_OPTIONS;
        }

    }

    getTitleInfo():ChartTitle{
        return {content:this.content, options: this.options, type: this.type}
    }

    getTitleType():TitleType{
        return this.type;
    }

    getTitleContent():string{
        return this.content;
    }

    getTitleOptions():any{
        return this.options;
    }

    setTitleType(type:TitleType):void{
        this.type = type;
    }
    setTitleContent(content:string):void{
        this.content = content;
    }
    setTitleOptions(options:any):void{
        this.options = options;
    }
}

export default ChartTitleConfig;