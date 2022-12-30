
export interface ChartTitle{
    type : TitleType// 제목의 타입 설정
    content : string, // 제목의 내용
    options?: any,
}


export type TitleType = "standard" | "none" | "advanced";