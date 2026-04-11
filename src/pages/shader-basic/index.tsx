import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleIcosahedron = () => {
  const pointsRef = useRef();
  const targetMouse = useRef(new THREE.Vector3(999, 999, 999));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse3D: { value: new THREE.Vector3(999, 999, 999) }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    // 加快一点回归速度，让粒子爆发后能迅速收回
    uniforms.uMouse3D.value.lerp(targetMouse.current, 0.15); 
  });

  const handlePointerMove = (e) => {
    targetMouse.current.copy(e.point);
  };

  const handlePointerOut = () => {
    targetMouse.current.set(999, 999, 999); 
  };

  return (
    <group>
      {/* 隐形的碰撞盒，用于接收鼠标射线。
          这里保持使用低面数的球体即可，因为仅用于计算相交点，可以提高性能。 */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        visible={false}
      >
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial />
      </mesh>

      {/* 粒子系统 */}
      <points ref={pointsRef}>
        {/* 使用 IcosahedronGeometry，半径为 2，细分度为 80 (生成大量密集顶点) */}
        <icosahedronGeometry args={[2, 20]} />
        
        <shaderMaterial
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          
          vertexShader={`
            uniform float uTime;
            uniform vec3 uMouse3D;
            varying float vDist;

            void main() {
              vec3 pos = position; // 初始位置
              
              float dist = distance(pos, uMouse3D);
              vDist = dist;

              float radius = 2.0; // 增加一点影响半径以便观察爆发效果
              
              // 关键改动：所有的位移和 Noise 都只在影响半径内发生
              if (dist < radius) {
                // 计算影响权重 (influence)：距离中心越近，权重越接近 1；距离达到 radius 时，权重为 0
                float influence = smoothstep(radius, 0.0, dist);
                
                // 1. 基础排斥力 (可选)
                vec3 dir = normalize(pos - uMouse3D);
                float repelForce = pow(influence, 2.0) * 0.3;
                
                // 2. 剧烈的 Noise 扰动
                // 结合空间坐标和时间生成三个方向的剧烈波动
                vec3 noiseVec = vec3(
                  sin(pos.x * 8.0 + uTime * 4.0),
                  cos(pos.y * 8.0 + uTime * 3.5),
                  sin(pos.z * 8.0 + uTime * 5.0)
                );
                
                // 增大 Noise 的振幅 (例如 1.5 到 2.0 之间)，并乘以影响权重
                // 这样只有靠近鼠标的地方才会剧烈爆发，且不会出现边界突兀断层
                float noiseAmplitude = 0.2;
                vec3 noiseDisplacement = noiseVec * noiseAmplitude * influence;

                // 叠加位移
                pos += (dir * repelForce) + noiseDisplacement; 
              }
              // 如果 dist >= radius，代码不会对 pos 做任何修改，完美保持静止

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              
              // 稍微调大一点点尺寸
              gl_PointSize = (14.0 / -mvPosition.z); 
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          
          fragmentShader={`
            varying float vDist;
            void main() {
              vec2 uv = gl_PointCoord.xy - vec2(0.5);
              if (length(uv) > 0.5) discard;

              // 飞出的粒子（距离近的）变成高亮的青色/白色，静止的粒子保持深蓝
              vec3 baseColor = vec3(0.1, 0.3, 0.8); 
              vec3 highlightColor = vec3(0.2, 1.0, 1.0); 
              
              // 让颜色的变化范围和物理影响半径一致 (1.5)
              float mixRatio = smoothstep(0.0, 1.5, vDist);
              vec3 finalColor = mix(highlightColor, baseColor, mixRatio);

              gl_FragColor = vec4(finalColor, 0.9);
            }
          `}
        />
      </points>
    </group>
  );
};

export default function ShaderBasic() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a1a' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        {/* 环境光 */}
        <ambientLight intensity={0.5} />
        {/* 粒子组件 */}
        <ParticleIcosahedron />
      </Canvas>
    </div>
  );
}