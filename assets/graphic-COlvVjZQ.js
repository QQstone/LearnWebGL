import{r as s,j as m}from"./index-hNCDGm2d.js";function P(){const f=s.useRef(null),[o,g]=s.useState(),l=`
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }
  `,u=`
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
  `;return s.useEffect(()=>{const t=f.current;if(!t||o)return;t.width=window.innerWidth,t.height=window.innerHeight;const e=t.getContext("webgl");if(!e)return;const n=(d,S)=>{const a=e.createShader(d);return a?(e.shaderSource(a,S),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?a:(alert(`Shader compile failed: ${e.getShaderInfoLog(a)}`),e.deleteShader(a),null)):null},r=e.createProgram();if(!r)return;const c=n(e.VERTEX_SHADER,l),i=n(e.FRAGMENT_SHADER,u);if(!(!c||!i)){if(e.attachShader(r,c),e.attachShader(r,i),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){alert(`Program link failed: ${e.getProgramInfoLog(r)}`);return}e.useProgram(r),g(r)}},[o,l,u]),s.useEffect(()=>{const t=f.current;if(!t||!o)return;const e=t.getContext("webgl");if(!e)return;const n=e.getAttribLocation(o,"a_Position"),r=e.getAttribLocation(o,"a_PointSize"),c=new Float32Array([0,.1,-.1,-.1,.1,-.1,-.1,.2]),i=e.createBuffer();i&&(e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,c,e.STATIC_DRAW),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(n),e.vertexAttrib1f(r,50),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3))},[o]),m.jsx("canvas",{ref:f})}export{P as default};
