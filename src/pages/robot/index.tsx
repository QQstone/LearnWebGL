import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const ASSET_PATH = '/assets/models/robot/';

export default function Robot() {
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    const container = containerRef.current;

    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.4, 4);

    const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);
    const gui = new GUI({ title: 'Robot Joints' });

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const rgbeLoader = new RGBELoader();
    const gltfLoader = new GLTFLoader();
    gltfLoader.setPath(ASSET_PATH);
    gltfLoader.setResourcePath(ASSET_PATH);

    let frameId = 0;
    let robot: THREE.Object3D | null = null;
    let environmentMap: THREE.Texture | null = null;
    let mounted = true;
    const jointFolder = new GUI()
    jointFolder.domElement.style.top = '100px'

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      container.width = innerWidth;
      container.height = innerHeight;
      renderer.setSize(innerWidth, innerHeight, false); // false 避免 devicePixelRatio 二次缩放
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    const frameModel = (object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);
      const fitHeightDistance = maxSize / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      const fitWidthDistance = fitHeightDistance / camera.aspect;
      const distance = 1.2 * Math.max(fitHeightDistance, fitWidthDistance);

      controls.target.copy(center);
      camera.position.set(center.x, center.y + size.y * 0.15, center.z + distance);
      camera.near = Math.max(distance / 100, 0.1);
      camera.far = distance * 100;
      camera.updateProjectionMatrix();
      controls.update();
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    rgbeLoader.load(`${ASSET_PATH}env_shop.hdr`, (hdrTexture) => {
      if (!mounted) {
        hdrTexture.dispose();
        return;
      }

      environmentMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
      scene.environment = environmentMap;
      scene.background = new THREE.Color(0xeeeeee);// environmentMap;
      hdrTexture.dispose();
      pmremGenerator.dispose();
    });

    // 材质预设

    const materials = {
      // a, b, o: 标准 PBR 材质
      a: new THREE.MeshStandardMaterial({
        color: 0xeeeeee, // 15658734 in hex
        roughness: 0.5,
        metalness: 0 // 默认值
      }),
      b: new THREE.MeshStandardMaterial({
        color: 0x333333, // 3355443 in hex
        roughness: 0.5,
        metalness: 0
      }),
      c: new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0,
        metalness: 1 // roughness=0 通常意味着是金属
      }),
      // d, e: 发光材质
      d: new THREE.MeshStandardMaterial({
        emissive: 0x00f1fe, // 61950 in hex
        emissiveIntensity: 1 // 默认强度
      }),
      e: new THREE.MeshStandardMaterial({
        emissive: 0x00f1fe, // 61950 in hex
        emissiveIntensity: 1
      }),
      // f: 基础材质 (无光照)
      f: new THREE.MeshBasicMaterial({
        color: 0xcccccc // 13421772 in hex
      }),
      o: new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        roughness: 0.5,
        metalness: 0
      })
    };

    // --- 2. 加载纹理并应用 ---
    const textureLoader = new THREE.TextureLoader();

    // 加载 light1.jpg 到 d 材质
    textureLoader.load(
      "light1.jpg",
      (texture) => {
        materials.d.emissiveMap = texture;
        materials.d.needsUpdate = true; // 重要！通知材质更新
      }
    );

    // 加载 light2.jpg 到 e 材质
    textureLoader.load(
      "light2.jpg",
      (texture) => {
        materials.e.emissiveMap = texture;
        materials.e.needsUpdate = true;
      }
    );

    // 加载 back.jpg 作为场景背景
    // 注意: `li` 应该是场景 (scene) 的引用
    textureLoader.load(
      "back.jpg",
      (texture) => {
        scene.background = texture;
      }
    );

    // ???
    function updateEmissiveIntensity(i = 0) {
      const { d, e, f } = materials;
      const intensity = Math.min(Math.max(0.2, i), 1); // 将 i 限制在 [0.2, 1] 范围内

      // 设置 d 和 e 材质的发光强度
      d.emissiveIntensity = intensity;
      e.emissiveIntensity = intensity;

      // 对 f 材质的颜色进行插值
      // 起始颜色: 0xcccccc (13421772)
      // 目标颜色: 0x00f1fe (61950)
      const startColor = new THREE.Color(0xcccccc);
      const targetColor = new THREE.Color(0x00f1fe);

      // 使用 lerp 方法进行线性插值
      f.color.copy(startColor).lerp(targetColor, intensity);
    }

    gltfLoader.load(
      'robot.glb',
      (gltf) => {
        if (!mounted) return;

        robot = gltf.scene;
        const joints: THREE.Object3D[] = [];

        robot.traverse((child) => {
          if (/^j-/i.test(child.name)) {
            joints.push(child);
          }

          if (!(child instanceof THREE.Mesh)) return;

          child.castShadow = true;
          child.receiveShadow = true;

          child.material = materials.c
          if (child.name.includes('a')) child.material = materials.a;
          if (child.name.includes('e')) child.material = materials.e;
          if (child.name.includes('f')) child.material = materials.e;

        });

        scene.add(robot);
        frameModel(robot);

        // joints
        //   .sort((a, b) => a.name.localeCompare(b.name))
        //   .forEach((joint) => {
        //     const initialRotation = {
        //       x: THREE.MathUtils.radToDeg(joint.rotation.x),
        //       y: THREE.MathUtils.radToDeg(joint.rotation.y),
        //       z: THREE.MathUtils.radToDeg(joint.rotation.z),
        //     };

        //     const state = {
        //       ...initialRotation,
        //       reset: () => {
        //         state.x = initialRotation.x;
        //         state.y = initialRotation.y;
        //         state.z = initialRotation.z;
        //         joint.rotation.set(
        //           THREE.MathUtils.degToRad(state.x),
        //           THREE.MathUtils.degToRad(state.y),
        //           THREE.MathUtils.degToRad(state.z)
        //         );
        //         folder.controllersRecursive().forEach((controller) => controller.updateDisplay());
        //       },
        //     };

        //     const folder = gui.addFolder(joint.name);
        //     jointFolders.push(folder);
        //     folder.add(state, 'x', -180, 180, 1).name('Rotate X').onChange((value: number) => {
        //       joint.rotation.x = THREE.MathUtils.degToRad(value);
        //     });
        //     folder.add(state, 'y', -180, 180, 1).name('Rotate Y').onChange((value: number) => {
        //       joint.rotation.y = THREE.MathUtils.degToRad(value);
        //     });
        //     folder.add(state, 'z', -180, 180, 1).name('Rotate Z').onChange((value: number) => {
        //       joint.rotation.z = THREE.MathUtils.degToRad(value);
        //     });
        //     folder.add(state, 'reset').name('Reset');
        //   });
        joints.forEach(joint => {
          const initialRotation = {
            x: THREE.MathUtils.radToDeg(joint.rotation.x),
            y: THREE.MathUtils.radToDeg(joint.rotation.y),
            z: THREE.MathUtils.radToDeg(joint.rotation.z),
          };

          const state = {
            ...initialRotation,
            reset: () => {
              state.x = initialRotation.x;
              state.y = initialRotation.y;
              state.z = initialRotation.z;
              joint.rotation.set(
                THREE.MathUtils.degToRad(state.x),
                THREE.MathUtils.degToRad(state.y),
                THREE.MathUtils.degToRad(state.z)
              );
              // folder.controllersRecursive().forEach((controller) => controller.updateDisplay());
            },
          };
          if (['j-06'].includes(joint.name)) {
            jointFolder.add(state, 'x', -180, 180, 1).name(joint.name).onChange((value: number) => {
              joint.rotation.x = THREE.MathUtils.degToRad(value);
            });
          }
          if (['j-01', 'j-05'].includes(joint.name)) {
            jointFolder.add(state, 'y', -180, 180, 1).name(joint.name).onChange((value: number) => {
              joint.rotation.y = THREE.MathUtils.degToRad(value);
            });
          }
          if (['j-02', 'j-03', 'j-04'].includes(joint.name)) {
            jointFolder.add(state, 'z', -180, 180, 1).name(joint.name).onChange((value: number) => {
              joint.rotation.z = THREE.MathUtils.degToRad(value);
            });
          }
        })
      },
      undefined,
      (error) => {
        // Keep the page usable while surfacing the asset load failure.
        console.error('Failed to load robot model:', error);
      }
    );

    return () => {
      mounted = false;
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frameId);
      controls.dispose();
      jointFolder.destroy();
      gui.destroy();

      if (robot) {
        scene.remove(robot);
        robot.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;

          child.geometry.dispose();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        });
      }

      environmentMap?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={containerRef} />;
}
