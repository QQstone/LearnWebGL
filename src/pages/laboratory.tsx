import { Color } from 'three';
import { useRef, useState, useEffect } from 'react';

import { Track } from 'src/models/Track';
import { Compose } from 'src/models/Compose';

type Point = {
  x: number;
  y: number;
  size: number;
  color: Color;
  opacity: number;
};

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const composeRef = useRef(new Compose());
  const animationRef = useRef<number>();
  const pointsRef = useRef<Point[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [webglProgram, setWebglProgram] = useState<WebGLProgram>();

  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || webglProgram) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const webgl = canvas.getContext('webgl');
    if (!webgl) return;

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
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    setWebglProgram(program);
  }, [webglProgram]);

  useEffect(() => {
    if (!webglProgram || !canvasRef.current) return undefined;

    const canvas = canvasRef.current;
    const webgl = canvas.getContext('webgl');
    if (!webgl) return undefined;

    const positionLocation = webgl.getAttribLocation(webglProgram, 'a_Position');
    const pointSizeLocation = webgl.getAttribLocation(webglProgram, 'a_PointSize');
    const colorLocation = webgl.getUniformLocation(webglProgram, 'u_FragColor');

    const render = () => {
      webgl.clear(webgl.COLOR_BUFFER_BIT);
      pointsRef.current.forEach((point) => {
        webgl.vertexAttrib2f(positionLocation, point.x, point.y);
        webgl.vertexAttrib1f(pointSizeLocation, point.size);
        webgl.uniform4fv(
          colorLocation,
          new Float32Array([point.color.r, point.color.g, point.color.b, point.opacity])
        );
        webgl.drawArrays(webgl.POINTS, 0, 1);
      });
    };

    const animate = () => {
      composeRef.current.update(Date.now());
      render();
      animationRef.current = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [webglProgram]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const {
      left, top, width, height,
    } = canvas.getBoundingClientRect();
    const cssX = event.clientX - left;
    const cssY = event.clientY - top;
    const color = new Color(Math.random(), Math.random(), Math.random());
    const point: Point = {
      x: (cssX / width) * 2 - 1,
      y: (-cssY / height) * 2 + 1,
      size: Math.random() * 50 + 10,
      color,
      opacity: 1,
    };

    const track = new Track(point);
    track.start = Date.now();
    track.timelen = 2000;
    track.loop = true;
    track.keyFrameMap = new Map([
      ['opacity', [[500, 1], [1000, 0], [1500, 1]]],
    ]);

    composeRef.current.add(track);
    setPoints((current) => [point, ...current]);
  };

  return <canvas ref={canvasRef} onClick={handleClick} />;
}
