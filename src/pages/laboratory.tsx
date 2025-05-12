import { assert } from 'console';
import { CSSProperties, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three';
import { Color } from 'three';

// ----------------------------------------------------------------------

export default function Page() {
    const canvas = useRef<HTMLCanvasElement>(null)
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

                const color = new Color("rgba(255,0,0,1)");

                (function ani(){
                    color.offsetHSL(0.005,0,0);
                    webgl.clearColor(color.r, color.g, color.b, 1);
                    webgl.clear(webgl.COLOR_BUFFER_BIT);
                    requestAnimationFrame(ani);
                })()
            }
        }
    }, [canvas])

    return (
        <>
            <canvas ref={canvas} />
        </>
    );
}
