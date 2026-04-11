
const defaultAttr = ()=>({
    webgl:null,
    vertices:[],
    geoData:[],
    size:2,
    attrName:'a_Position',
    count:0,
    types:['POINTS']
})

interface PolyPropInterface{
    webgl:WebGLRenderingContext
    vertices:Float32Array
    [key:string]:any
}

export class Poly {
    // @ts-ignore
    webgl:WebGLRenderingContext

    // @ts-ignore
    webglProgram:WebGLProgram

    vertices:number[] = []// : Float32Array = new Float32Array()

    // 对象化顶点集合
    geoData = []

    size = 2

    attrName = 'a_Position'

    count = 0

    types = ['POINTS']

    circleDot = false

    u_IsPOINTS:any

    constructor(props:PolyPropInterface){
       Object.assign(this, defaultAttr, props)
       this.init()
    }

    init(){
        // @ts-ignore
        const {attrName, size, webgl} = this
        if(!webgl) return
        const vertexBuffer = (webgl as WebGLRenderingContext).createBuffer()
        webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer)
        this.updateBuffer(webgl)
        const attrPointer = webgl.getAttribLocation(this.webglProgram, attrName)
        // vertexAttribPointer(index, size, type, normalized(是否归一化), stride, offset)
        webgl.vertexAttribPointer(attrPointer, size, webgl.FLOAT, false, 0, 0)
        webgl.enableVertexAttribArray(attrPointer)
        if (this.circleDot) {
            this.u_IsPOINTS=this.webgl.getUniformLocation(this.webglProgram, 'u_IsPOINTS')
          }
    }

    addVertice(...params: number[]){
        this.vertices.push(...params)
        this.updateBuffer(this.webgl)
    }

    popVertice(){
        // @ts-ignore
        const {vertices, size} = this
        const len = vertices.length
        vertices.slice(len-size, len)
        this.updateCount()
    }

    updateBuffer(webgl:WebGLRenderingContext){
        // TODO update
        console.log(this.webgl)
    }

    updateCount(){
        this.count = Math.floor(this.vertices.length/this.size)
    }

    draw(types=this.types){
        const {webgl,count,circleDot,u_IsPOINTS}=this
        // for (let type of types) {
        //   circleDot&&webgl.uniform1f(u_IsPOINTS, type==='POINTS')
        //   webgl.drawArrays(webgl[type],0,count);
        // }
        
      }
}
