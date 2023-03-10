
export interface ChartTitle{
    type:"ChartTitle",// 제목의 타입 설정
    content : string, // 제목의 내용
    options? : TitleOptions,
    titleType:TitleType,
}

export interface TitleOptions{
    type:"TitleOptions"
    font?:string,
    fontSize?:number,
    fontWeight?:string,
    color?:string,
    backgroundColor?:string,
    shadow?:string,
    link?:string,
}


export type TitleType = "standard" | "none" | "advanced";