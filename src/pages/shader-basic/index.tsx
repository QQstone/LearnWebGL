import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- 类型定义 (可选，为了更严谨) ---
interface ParticleIcosahedronProps {}

const ParticleIcosahedron: React.FC<ParticleIcosahedronProps> = () => {
  // 1. 容器引用：用于挂载 Three.js 渲染区域
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 2. 存储 Three.js 关键对象的引用 (避免每次渲染重新创建)
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const pointerRef = useRef<THREE.Vector2>(new THREE.Vector2());
  
  // 3. 状态变量：用于平滑插值的鼠标位置
  // 目标位置 (接收到的真实鼠标点)
  const targetMousePos = useRef<THREE.Vector3>(new THREE.Vector3(999, 999, 999));
  // 当前平滑后的位置 (传给 Shader 的值)
  const currentMousePos = useRef<THREE.Vector3>(new THREE.Vector3(999, 999, 999));
  
  // 4. 时钟引用
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // --- 初始化 Three.js 环境 ---
  useEffect(() => {
    if (!containerRef.current) return;

    // A. 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a); // 对应原背景色
    sceneRef.current = scene;

    // B. 创建相机
    const camera = new THREE.PerspectiveCamera(60, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);
    cameraRef.current = camera;

    // C. 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // D. 创建粒子系统 (Geometry + Material)
    const geometry = new THREE.IcosahedronGeometry(2, 20); // args: [radius, detail]

    const uniforms = {
      uTime: { value: 0 },
      uMouse3D: { value: new THREE.Vector3(999, 999, 999) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      
      vertexShader: `
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
      `,
      
      fragmentShader: `
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
      `
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // E. 设置交互用的隐形球体 (用于 Raycaster 检测)
    // 创建一个不可见的球体作为碰撞盒
    const hitSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 32, 32), // 半径略大于几何体
      new THREE.MeshBasicMaterial({ visible: false })
    );
    scene.add(hitSphere);
    // 我们将这个球体也存一下，或者直接在射线检测时临时用，这里直接加到场景里方便复用
    // 注意：为了性能，我们可以在后续点击事件中只检测这个特定的 mesh
    
    // F. 窗口大小调整监听
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // G. 开始动画循环
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!clockRef.current || !rendererRef.current || !sceneRef.current || !pointsRef.current || !cameraRef.current) return;

      const elapsedTime = clockRef.current.getElapsedTime();
      
      // 1. 更新 uTime
      // @ts-ignore
      pointsRef.current.material.uniforms.uTime.value = elapsedTime;

      // 2. 执行 Lerp (平滑过渡)
      // 让 currentMousePos 慢慢靠近 targetMousePos
      currentMousePos.current.lerp(targetMousePos.current, 0.15);

      // 3. 更新 Uniforms
      // @ts-ignore
      pointsRef.current.material.uniforms.uMouse3D.value.copy(currentMousePos.current);

      // 4. 旋转整个粒子群 (可选，增加动态感)
      pointsRef.current.rotation.y += 0.002;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // --- 清理函数 ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (geometry) geometry.dispose();
      if (material) {
        material.dispose();
        Object.values(material.uniforms).forEach((uniform) => {
          if ('value' in uniform && uniform.value instanceof THREE.DataTexture) {
             uniform.value.dispose();
          }
        });
      }
      // 注意：Points 会自动 dispose geometry 和 material，但如果手动创建了其他 Mesh 需要手动 dispose
    };
  }, []);

  // --- 鼠标移动处理逻辑 ---
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!raycasterRef.current || !cameraRef.current || !containerRef.current) return;

    // 获取鼠标在容器内的归一化坐标 (-1 到 1)
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    pointerRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    // 设置射线
    raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);

    // 创建一个临时的 Sphere 用于检测交点 (因为场景中的 Invisible Sphere 可能没被 add 进去或者为了简化逻辑)
    // 优化：我们在上面的 useEffect 中其实已经添加了一个 invisible sphere 到场景了
    // 但为了代码独立性，这里我们重新定义一个临时的几何体进行相交测试，或者假设场景中有一个专门的 hit object
    // 这里采用最通用的方法：在场景中查找所有 Points 或 Mesh，或者像之前一样构造一个虚拟球
    
    // 方案：直接创建一个临时的 Sphere Geometry 进行 intersectObject
    // 注意：为了避免频繁创建对象，建议在 useEffect 中创建一个 mesh 并保存下来
    // 这里为了代码简洁，我们假设场景中有一个专门用于检测的 Mesh (上面代码已添加但未暴露)
    // 让我们修改一下策略：直接在场景中遍历所有 Mesh 或者显式创建一个检测球
    
    // 修正：为了让代码更健壮，我们在 useEffect 中添加了一个 invisible sphere，这里我们直接检测它
    // 但由于我们是在 useEffect 内部创建的局部变量，这里拿不到。
    // 解决方案：在 useEffect 中把 hitSphere 也存进 ref，或者在这里重新创建一个临时的用于检测。
    
    // 简单做法：重新创建一个临时的 Sphere 用于检测 (性能影响极小，因为只在 mousemove 触发)
    const tempSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 32, 32),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    
    const intersects = raycasterRef.current.intersectObject(tempSphere);
    
    if (intersects.length > 0) {
      targetMousePos.current.copy(intersects[0].point);
    } else {
      targetMousePos.current.set(999, 999, 999);
    }
    
    tempSphere.geometry.dispose();
    tempSphere.material.dispose();
  };

  const handlePointerOut = () => {
    targetMousePos.current.set(999, 999, 999);
  };

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100%' }}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    />
  );
};

export default function ShaderBasic() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 72px)', backgroundColor: '#0a0a1a' }}>
      {/* 不需要 Canvas 组件，直接放我们的自定义组件 */}
      <ParticleIcosahedron />
    </div>
  );
}