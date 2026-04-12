var v=Object.defineProperty;var C=(r,e,n)=>e in r?v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var p=(r,e,n)=>C(r,typeof e!="symbol"?e+"":e,n);import{r as f,j as E}from"./index-g-m0crSc.js";import{b}from"./three.module-CxX1q5Pt.js";const x=(r,e,n)=>{for(let u=0;u<n;u+=1){const l=e[u],d=e[u+1];if(r>=l[0]&&r<=d[0]){const s=d[0]-l[0],g=(d[1]-l[1])/s,o=l[1]-l[0]*g;return g*r+o}}return e[n][1]};class A{constructor(e){p(this,"target");p(this,"start");p(this,"timelen");p(this,"loop");p(this,"keyFrameMap");this.target=e,this.start=0,this.timelen=5,this.loop=!1,this.keyFrameMap=new Map}update(e){const{keyFrameMap:n,start:u,timelen:l,target:d,loop:s}=this;let h=e-u;s&&(h%=l),Array.from(n.entries()).forEach(([g,o])=>{const t=o.length-1;h<o[0][0]?d[g]=o[0][1]:h>o[t][0]?d[g]=o[t][1]:d[g]=x(h,o,t)})}}class M{constructor(){p(this,"children");this.children=[]}add(e){this.children.push(e)}update(e){this.children.forEach(n=>{n.update(e)})}}function k(){const r=f.useRef(null),e=f.useRef(new M),n=f.useRef(),u=f.useRef([]),[l,d]=f.useState([]),[s,h]=f.useState();f.useEffect(()=>{u.current=l},[l]),f.useEffect(()=>{const o=r.current;if(!o||s)return;o.width=window.innerWidth,o.height=window.innerHeight;const t=o.getContext("webgl");if(!t)return;const w=`
      attribute vec4 a_Position;
      attribute float a_PointSize;
      void main() {
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
      }
    `,P=`
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
    `,S=(F,_)=>{const a=t.createShader(F);return a?(t.shaderSource(a,_),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)?a:(alert(`Shader compile failed: ${t.getShaderInfoLog(a)}`),t.deleteShader(a),null)):null},c=t.createProgram();if(!c)return;const m=S(t.VERTEX_SHADER,w),i=S(t.FRAGMENT_SHADER,P);if(!(!m||!i)){if(t.attachShader(c,m),t.attachShader(c,i),t.linkProgram(c),!t.getProgramParameter(c,t.LINK_STATUS)){alert(`Program link failed: ${t.getProgramInfoLog(c)}`);return}t.useProgram(c),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),h(c)}},[s]),f.useEffect(()=>{if(!s||!r.current)return;const t=r.current.getContext("webgl");if(!t)return;const w=t.getAttribLocation(s,"a_Position"),P=t.getAttribLocation(s,"a_PointSize"),S=t.getUniformLocation(s,"u_FragColor"),c=()=>{t.clear(t.COLOR_BUFFER_BIT),u.current.forEach(i=>{t.vertexAttrib2f(w,i.x,i.y),t.vertexAttrib1f(P,i.size),t.uniform4fv(S,new Float32Array([i.color.r,i.color.g,i.color.b,i.opacity])),t.drawArrays(t.POINTS,0,1)})},m=()=>{e.current.update(Date.now()),c(),n.current=window.requestAnimationFrame(m)};return m(),()=>{n.current&&window.cancelAnimationFrame(n.current)}},[s]);const g=o=>{const t=r.current;if(!t)return;const{left:w,top:P,width:S,height:c}=t.getBoundingClientRect(),m=o.clientX-w,i=o.clientY-P,F=new b(Math.random(),Math.random(),Math.random()),_={x:m/S*2-1,y:-i/c*2+1,size:Math.random()*50+10,color:F,opacity:1},a=new A(_);a.start=Date.now(),a.timelen=2e3,a.loop=!0,a.keyFrameMap=new Map([["opacity",[[500,1],[1e3,0],[1500,1]]]]),e.current.add(a),d(R=>[_,...R])};return E.jsx("canvas",{ref:r,onClick:g})}export{k as default};
