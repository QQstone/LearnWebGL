import{j as g,r as n}from"./index-hNCDGm2d.js";import{R as T,V as A,a as v,C as F,S as V,b as W,P as k,W as B,I,c as O,A as _,d as G,M as D,e as S,f as b,D as H}from"./three.module-CxX1q5Pt.js";const L=()=>{const e=n.useRef(null),m=n.useRef(null),r=n.useRef(null),i=n.useRef(null),u=n.useRef(null),h=n.useRef(new T),p=n.useRef(new A),f=n.useRef(new v(999,999,999)),w=n.useRef(new v(999,999,999)),R=n.useRef(new F);n.useEffect(()=>{if(!e.current)return;const t=new V;t.background=new W(657946),m.current=t;const s=new k(60,e.current.clientWidth/e.current.clientHeight,.1,100);s.position.set(0,0,6),r.current=s;const a=new B({antialias:!0,alpha:!1});a.setSize(e.current.clientWidth,e.current.clientHeight),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.current.appendChild(a.domElement),i.current=a;const l=new I(2,20),d={uTime:{value:0},uMouse3D:{value:new v(999,999,999)}},c=new O({uniforms:d,transparent:!0,depthWrite:!1,blending:_,vertexShader:`
        uniform float uTime;
        uniform vec3 uMouse3D;
        varying float vDist;

        void main() {
          vec3 pos = position; 
          
          float dist = distance(pos, uMouse3D);
          vDist = dist;

          float radius = 2.0; 
          
          if (dist < radius) {
            float influence = smoothstep(radius, 0.0, dist);
            
            vec3 dir = normalize(pos - uMouse3D);
            float repelForce = pow(influence, 2.0) * 0.3;
            
            vec3 noiseVec = vec3(
              sin(pos.x * 8.0 + uTime * 4.0),
              cos(pos.y * 8.0 + uTime * 3.5),
              sin(pos.z * 8.0 + uTime * 5.0)
            );
            
            float noiseAmplitude = 0.2;
            vec3 noiseDisplacement = noiseVec * noiseAmplitude * influence;

            pos += (dir * repelForce) + noiseDisplacement; 
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          gl_PointSize = (14.0 / -mvPosition.z); 
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        varying float vDist;
        void main() {
          vec2 uv = gl_PointCoord.xy - vec2(0.5);
          if (length(uv) > 0.5) discard;

          vec3 baseColor = vec3(0.1, 0.3, 0.8); 
          vec3 highlightColor = vec3(0.2, 1.0, 1.0); 
          
          float mixRatio = smoothstep(0.0, 1.5, vDist);
          vec3 finalColor = mix(highlightColor, baseColor, mixRatio);

          gl_FragColor = vec4(finalColor, 0.9);
        }
      `}),x=new G(l,c);t.add(x),u.current=x;const E=new D(new S(2.2,32,32),new b({visible:!1}));t.add(E);const P=()=>{if(!e.current||!r.current||!i.current)return;const o=e.current.clientWidth,y=e.current.clientHeight;r.current.aspect=o/y,r.current.updateProjectionMatrix(),i.current.setSize(o,y)};window.addEventListener("resize",P);let M;const C=()=>{if(M=requestAnimationFrame(C),!R.current||!i.current||!m.current||!u.current||!r.current)return;const o=R.current.getElapsedTime();u.current.material.uniforms.uTime.value=o,w.current.lerp(f.current,.15),u.current.material.uniforms.uMouse3D.value.copy(w.current),u.current.rotation.y+=.002,i.current.render(m.current,r.current)};return C(),()=>{cancelAnimationFrame(M),window.removeEventListener("resize",P),i.current&&e.current&&(e.current.removeChild(i.current.domElement),i.current.dispose()),l&&l.dispose(),c&&(c.dispose(),Object.values(c.uniforms).forEach(o=>{"value"in o&&o.value instanceof H&&o.value.dispose()}))}},[]);const j=t=>{if(!h.current||!r.current||!e.current)return;const s=e.current.getBoundingClientRect(),a="touches"in t?t.touches[0].clientX:t.clientX,l="touches"in t?t.touches[0].clientY:t.clientY;p.current.x=(a-s.left)/s.width*2-1,p.current.y=-((l-s.top)/s.height)*2+1,h.current.setFromCamera(p.current,r.current);const d=new D(new S(2.2,32,32),new b({visible:!1})),c=h.current.intersectObject(d);c.length>0?f.current.copy(c[0].point):f.current.set(999,999,999),d.geometry.dispose(),d.material.dispose()},z=()=>{f.current.set(999,999,999)};return g.jsx("div",{ref:e,style:{width:"100%",height:"100%"},onPointerMove:j,onPointerOut:z})};function q(){return g.jsx("div",{style:{width:"100%",height:"calc(100vh - 72px)",backgroundColor:"#0a0a1a"},children:g.jsx(L,{})})}export{q as default};
