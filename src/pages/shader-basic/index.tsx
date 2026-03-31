// templates/three-cube-page.tsx
import { GUI } from 'lil-gui';
import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Shader Basic Page Component
 */
export default function ShaderBasic() {
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 获取窗口尺寸
    const { innerWidth: width, innerHeight: height } = window;

    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器
    if(!containerRef.current) return;
    const canvas = containerRef.current;
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true });


    // 创建立方体
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // lil-gui
    const gui = new GUI();
    const cubeFolder = gui.addFolder('Cube');
    cubeFolder.add(cube.position, 'x', -5, 5).name('Position X');
    cubeFolder.add(cube.position, 'y', -5, 5).name('Position Y');
    cubeFolder.add(cube.position, 'z', -5, 5).name('Position Z');
    cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
    cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
    cubeFolder.open();

    // 动画循环
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update(); // required if damping is enabled
      renderer.render(scene, camera);
    };
    animate();

    // 窗口大小调整
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      renderer.setSize(innerWidth, innerHeight, false); // false 避免 devicePixelRatio 二次缩放
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    handleResize()
    window.addEventListener('resize', handleResize);

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      gui.destroy();
      // if (containerRef.current) {
      //   containerRef.current.removeChild(renderer.domElement);
      // }
      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={containerRef} />
  );
}
