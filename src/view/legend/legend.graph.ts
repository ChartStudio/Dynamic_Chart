import Position from "../../core/core.position";
import Styler from "../../core/core.styler";

class GraphLegend{
    private context: CanvasRenderingContext2D | null;
    // Postion Object
    private position: Position;
    // Styler Object
    private styler: Styler


    constructor(context:CanvasRenderingContext2D | null, position:Position, styler:Styler){
        this.context = context;
        this.position = position;
        this.styler = styler;
    }




}