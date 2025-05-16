import { assert } from 'console';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three';
import { Color } from 'three';

// ----------------------------------------------------------------------
type Point = {x:number, y:number, size:number, color:Color}
export default function Page() {
    const canvas = useRef<HTMLCanvasElement>(null)
    const [webglProgram, setWebglProgram] = useState<WebGLProgram>()
    const [points, setPoints] = useState<Array<Point>>([])
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
           "编译着色器时出错：" + gl.getShaderInfoLog(shader),
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
                  "无法初始化着色器程序: " +
                 gl.getProgramInfoLog(program),
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
        
            const webgl = canvas.current.getContext('webgl');
            if(webgl){
                // Set clear color to black, fully opaque
                webgl.clearColor(0.3, 0.5, 0.3, 1.0);
                // Clear the color buffer with specified clear color
                webgl.clear(webgl.COLOR_BUFFER_BIT);

                const color = new Color("rgba(0,0,0,1)");

                // (function ani(){
                //     color.offsetHSL(0.005,0,0);
                     webgl.clearColor(color.r, color.g, color.b, 1);
                     webgl.clear(webgl.COLOR_BUFFER_BIT);
                //     requestAnimationFrame(ani);
                // })()

                initShader(webgl)
            }
        }
    }, [canvas, webglProgram])

    const handleClick = (event:any)=>{
        if (canvas && canvas.current) {
            const {left, top, width, height} = canvas.current.getBoundingClientRect()
            const {clientX, clientY} = event;
            const [cssX, cssY] = [clientX - left, clientY - top]
            const color = new Color(Math.floor(Math.random()*100)/100,Math.floor(Math.random()*100)/100,Math.floor(Math.random()*100)/100)
            const position:Point = {x:cssX/width*2 - 1, y:-cssY/height*2 + 1, size:Math.random()*50.0 + 10, color}
            //setRectPosition(position)
            setPoints(arr=>{return [position,...arr]})
        }
    }

    const setRectPosition = useCallback((pos:{x:number,y:number})=>{
        if(!webglProgram||!canvas.current) return;
        const webgl = canvas.current.getContext('webgl');
        const a_Position = webgl!.getAttribLocation(webglProgram, 'a_Position')
        webgl!.vertexAttrib2f(a_Position, pos.x, pos.y);
        webgl!.drawArrays(webgl!.POINTS, 0, 1)
    }, [webglProgram, canvas])

    useEffect(()=>{
        if(!webglProgram||!canvas.current) return;
        const webgl = canvas.current.getContext('webgl');
        const a_Position = webgl!.getAttribLocation(webglProgram, 'a_Position')
        const a_PointSize = webgl!.getAttribLocation(webglProgram, 'a_PointSize')
        const u_FragColor = webgl!.getUniformLocation(webglProgram, 'u_FragColor')
        webgl!.clear(webgl!.COLOR_BUFFER_BIT);
        points.forEach(point=>{
            webgl!.vertexAttrib2f(a_Position, point.x, point.y);
            webgl!.vertexAttrib1f(a_PointSize, point.size);
            //webgl!.uniform4f(u_FragColor, point.color.r, point.color.g, point.color.b,1.0)
            const vector = new Float32Array([point.color.r, point.color.g, point.color.b,1.0])
            webgl!.uniform4fv(u_FragColor, vector)
            webgl!.drawArrays(webgl!.POINTS, 0, 1)
        })
    },[points])

    return (
        <>
            <canvas ref={canvas} onClick={handleClick}/>
        </>
    );
}
