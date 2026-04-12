import { useRef, useState, useEffect } from 'react';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglProgram, setWebglProgram] = useState<WebGLProgram>();

  const vertexShaderSource = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (d < 0.5) {
        gl_FragColor = u_FragColor;
      } else {
        discard;
      }
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || webglProgram) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const webgl = canvas.getContext('webgl');
    if (!webgl) return;

    const loadShader = (type: number, source: string) => {
      const shader = webgl.createShader(type);
      if (!shader) return null;

      webgl.shaderSource(shader, source);
      webgl.compileShader(shader);
      if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
        alert(`Shader compile failed: ${webgl.getShaderInfoLog(shader)}`);
        webgl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const program = webgl.createProgram();
    if (!program) return;

    const vertexShader = loadShader(webgl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = loadShader(webgl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader);
    webgl.linkProgram(program);

    if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
      alert(`Program link failed: ${webgl.getProgramInfoLog(program)}`);
      return;
    }

    webgl.useProgram(program);
    setWebglProgram(program);
  }, [webglProgram, vertexShaderSource, fragmentShaderSource]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !webglProgram) return;

    const webgl = canvas.getContext('webgl');
    if (!webgl) return;

    const positionLocation = webgl.getAttribLocation(webglProgram, 'a_Position');
    const pointSizeLocation = webgl.getAttribLocation(webglProgram, 'a_PointSize');

    const vertices = new Float32Array([
      0.0, 0.1,
      -0.1, -0.1,
      0.1, -0.1,
      -0.1, 0.2,
    ]);

    const vertexBuffer = webgl.createBuffer();
    if (!vertexBuffer) return;

    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttrib1f(pointSizeLocation, 50);
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLES, 0, 3);
  }, [webglProgram]);

  return <canvas ref={canvasRef} />;
}
