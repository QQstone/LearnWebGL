import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

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
      -100,
      1000
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const vertices = new Float32Array([
      0.0, 0.1, 0.0,
      -0.1, -0.1, 0.0,
      0.1, -0.1, 0.0,
      -0.1, 0.2, 0.0,
    ]);
    const verticesAttribute = new THREE.BufferAttribute(vertices, 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', verticesAttribute);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const fontLoader = new FontLoader();
    fontLoader.load('/assets/font/Kristen ITC_Regular.json', (font) => {
      const textGeometry = new TextGeometry('Hello 3D', {
        font,
        size: 2,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.2,
        bevelOffset: 0,
        bevelSegments: 5,
        curveSegments: 6,
      });

      const textMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(textMesh);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = mesh.position;
    controls.update();

    const axes = new THREE.AxesHelper();
    scene.add(axes);

    let animationId = 0;
    const animate = () => {
      animationId = window.requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      axes.geometry.dispose();
      (axes.material as THREE.Material).dispose();
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', background: 'red' }} />;
}
