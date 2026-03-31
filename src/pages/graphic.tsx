import type { Color } from 'three';

import { useRef, useState, useEffect } from 'react';

import { Compose } from 'src/models/Compose';

// ----------------------------------------------------------------------
// type RGBA = {r:number,g:number, b:number, opacity:number}
type Point = {x:number, y:number, size:number, color:Color, opacity:number}
export default function Page() {
    const canvas = useRef<HTMLCanvasElement>(null)
    const [webglProgram, setWebglProgram] = useState<WebGLProgram>()
    const [points, setPoints] = useState<Array<Point>>([])
    const [testing, setTesting] = useState<boolean>(false)
    const compose = useRef<Compose>(new Compose())
    // step1 创建着色器源文件
    const vertexShaderSource = `
        attribute vec4 a_Position;
        attribute float a_PointSize;
        void main(){
            gl_Position=a_Position;
            gl_PointSize=a_PointSize;
        }
    `;
    const fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_FragColor;
        void main(){
            float d = distance(gl_PointCoord, vec2(0.5, 0.5));
            if(d<0.5){
                gl_FragColor=u_FragColor;
            }else{
                discard;
            }
        }
    ` 
    const loadShader = (gl: WebGLRenderingContext, type:number, source: string)=>{
        const shader = gl.createShader(type)
        if(!shader) return null
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(
           `编译着色器时出错：${  gl.getShaderInfoLog(shader)}`,
            );
            gl.deleteShader(shader);
            return null;
          }
        return shader
    }
    
    const initShader = (gl: WebGLRenderingContext )=>{
        const program = gl.createProgram();
        if(program){
            const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
            const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
            
            gl.attachShader(program, vertexShader!)
            gl.attachShader(program, fragmentShader!)
            gl.linkProgram(program)
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert(
                  `无法初始化着色器程序: ${ 
                 gl.getProgramInfoLog(program)}`,
                );
                return null;
              }
            gl.useProgram(program)
            setWebglProgram(program)
        }
        
    }

    useEffect(() => {
        if (canvas && canvas.current) {
            if(webglProgram) return;
            const { innerWidth, innerHeight } = window;
            canvas.current.width = innerWidth;
            canvas.current.height = innerHeight;
            
            
            const webgl = canvas.current.getContext('webgl')
            if (!webgl) return
            // step3 初始化着色器
            initShader(webgl)
            
        }
    }, [canvas])
    // step2 获取webgl context
    // const webgl = useMemo(()=>{
    //     if (canvas && canvas.current) {
    //         return canvas.current.getContext('webgl')
    //     }else{
    //         return null
    //     }
    // }, [canvas])



    useEffect(()=>{
        const webgl = canvas!.current!.getContext('webgl')
        if(!webgl || !webglProgram) return
        // assert(webgl != null) useless
        // step4 设置多点坐标
        const a_Position = webgl!.getAttribLocation(webglProgram, 'a_Position')
        const a_PointSize = webgl!.getAttribLocation(webglProgram, 'a_PointSize')
        const u_FragColor = webgl!.getUniformLocation(webglProgram, 'u_FragColor')

        const vertices = new Float32Array([
            0.0, 0.1,
            -0.1, -0.1,
            0.1, -0.1,
            -0.1, 0.2
        ])
        // create  buffer
        const vertexBuffer = webgl!.createBuffer()
        // bind buffer to webgl
        webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer)
        webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW)
        // vertexAttribPointer(index, size, type, normalized, stride, offset)
        webgl.vertexAttribPointer(a_Position, 2, webgl.FLOAT, false, 0, 0)
        webgl.enableVertexAttribArray(a_Position)
        webgl.vertexAttrib1f(a_PointSize, 50);
        // step5 clear
        webgl.clearColor(0.0, 0.0, 0.0, 1.0)
        webgl.clear(webgl.COLOR_BUFFER_BIT)
        // step6 draw array
        webgl.drawArrays(webgl.TRIANGLES, 0, 3)
    }, [webglProgram])
    return (
        <canvas ref={canvas}/>
    );
}
