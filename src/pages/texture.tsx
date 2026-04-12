import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      (-20 * container.clientWidth) / container.clientHeight,
      (20 * container.clientWidth) / container.clientHeight,
      20,
      -20,
      30,
      100
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/assets/images/texture/cover-22.webp');
    texture.repeat.set(2, 2);
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.rotation = Math.PI * 0.5;

    const cubeMaterial = new THREE.MeshDepthMaterial({ map: texture });
    const cubes: THREE.Mesh[] = [];
    const count = 30;

    for (let i = 0; i < count; i += 1) {
      const size = Math.random() * 5;
      const x = Math.random() * 50 - 25;
      const y = Math.random() * 50 - 25;
      const z = Math.random() * 50 - 25;
      const cubeGeometry = new THREE.BoxGeometry(size, size, size);
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(x, y, z);
      scene.add(cube);
      cubes.push(cube);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.update();

    let animationId = 0;
    const animate = () => {
      animationId = window.requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      controls.dispose();
      cubes.forEach((cube) => {
        cube.geometry.dispose();
      });
      cubeMaterial.dispose();
      texture.dispose();
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', background: 'red' }} />;
}
