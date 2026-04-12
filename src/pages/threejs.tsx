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
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0x009e60 }),
      new THREE.MeshBasicMaterial({ color: 0x0051ba }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0xffee00 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    ];

    const group = new THREE.Group();
    for (let x = 0; x < 3; x += 1) {
      for (let y = 0; y < 3; y += 1) {
        for (let z = 0; z < 3; z += 1) {
          const cubeGeometry = new THREE.BoxGeometry(2.9, 2.9, 2.9);
          const cube = new THREE.Mesh(cubeGeometry, materials);
          cube.position.set(x * 3 - 3, y * 3 - 3, z * 3 - 3);
          group.add(cube);
        }
      }
    }

    scene.add(group);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = group.position;
    controls.update();
    renderer.render(scene, camera);

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.x - container.offsetLeft) / container.clientWidth - 0.5;
      camera.position.z = Math.cos(x * Math.PI * 10) * 20;
      camera.position.x = Math.sin(x * Math.PI * 10) * 20;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      controls.dispose();
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
      materials.forEach((material) => material.dispose());
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', background: 'red' }} />;
}
