import { Track } from "./Track";

export class Compose{
    //parent:Compose|null
    children:Array<Track>
    constructor(){
        //this.parent = null;
        this.children = []
    }
    add(obj:Track){
        //obj.parent = this
        this.children.push(obj)
    }
    // 基于时间点得更新动作
    update(t:number){
        this.children.forEach(ele=>{
            ele.update(t)
        })
    }
}