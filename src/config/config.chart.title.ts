import {ChartTitle, TitleType} from "../type";


class ChartTitleConfig{
    private content: string;
    private options?: any;
    private type: TitleType;


    constructor(TitleConfig:ChartTitle, ...args:any) {
        this.type = TitleConfig.type
        this.content = TitleConfig.content
        this.options = TitleConfig.options ?? {};
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