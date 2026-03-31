export class Sky {
    webgl

    children: Array<Sky>

    constructor(webgl:WebGLRenderingContext){
        this.webgl = webgl
        this.children = []
    }

    add(obj:Sky){
        obj.webgl = this.webgl
        this.children.push(obj)
    }

    updateVertices(){
        this.children.forEach(ele=>{
            ele.updateVertices
        })
    }
}