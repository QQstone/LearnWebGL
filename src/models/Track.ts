type FrameVal = [number, any]
export class Track{
    // 将动画效果添加到target对象
    target:any
    start:number
    timelen:number
    loop:boolean
    // 关键帧Map
    /** [
     *      [
     *          "对象属性1",
     *          [
     *              [时间点0, 属性值01],
     *              [时间点1, 属性值11]
     *          ]
     *      ],
     *      [
     *          "对象属性2"
     *          [
     *              [时间点0, 属性值02],
     *              [时间点1, 属性值12]
     *          ]
     *      ]
     *  ] */ 
    keyFrameMap:Map<string, Array<FrameVal>>
    //parent:any
    constructor(target:any){
        this.target = target
        this.start = 0
        this.timelen = 5
        this.loop = false
        this.keyFrameMap = new Map()
    }
    update(t:number){
        const {keyFrameMap: keyMap, start, timelen, target, loop} = this
        let time = t - start
        if(loop){
            time = time % timelen
        }
        // key-fms 是属性和关键帧集合对 如 key="对象属性1" fms=[[时间点0, 属性值01],[时间点1, 属性值11]]
        for(const [key, fms] of keyMap.entries()){
            const last = fms.length - 1
            // 当本地时间小于时间点0时
            if(time<fms[0][0]){
                // 目标属性设为属性值01
                target[key] = fms[0][1]
            //
            }else if(time>fms[last][0]){
                target[key] = fms[last][1]
            }else{
                target[key]=getValBetweenFms(time,fms,last)
            }
        }
    }

    /**
     * 线性插值函数
     * @param time 本地时间
     * @param fms 某属性的关键帧集合
     * @param last 最后一个关键帧的索引
     */
    getValBetweenFms(time:number, fms:Array<FrameVal>, last:number){
        for(let i=0;i<last;i++){
            const fm1 = fms[i]
            const fm2 = fms[i+1]
            if(time>=fm1[0]&&time<=fm2[0]){
                const delta = {
                    x:fm2[0]-fm1[0],
                    y:fm2[1]-fm1[1]
                }
                const k = delta.y/delta.x
                const b = fm1[1] - fm1[0]*k
                return k*time+b
            }
        }
    }
}