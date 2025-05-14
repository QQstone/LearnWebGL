import { assert } from 'console';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three';
import { Color } from 'three';

// ----------------------------------------------------------------------

export default function Page() {
    const canvas = useRef<HTMLCanvasElement>(null)
    const [webglProgram, setWebglProgram] = useState<WebGLProgram>()
    const vertexShaderSource = `
        attribute vec4 a_Position;
        void main(){
            gl_Position=a_Position;
            gl_PointSize=100.0;
        }
    `;
    const fragmentShaderSource = `
        void main(){
            gl_FragColor=vec4(1.0,1.0,0.0,1.0);
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
    }, [canvas])

    useEffect(()=>{
        if(webglProgram&&canvas.current){
            const webgl = canvas.current.getContext('webgl');
            const a_Position = webgl!.getAttribLocation(webglProgram, 'a_Position')
            webgl!.vertexAttrib3f(a_Position, 1.0, 0.5, 0.0);
            webgl!.drawArrays(webgl!.POINTS, 0, 1)
        }
    }, [webglProgram])

    return (
        <>
            <canvas ref={canvas} />
        </>
    );
}
