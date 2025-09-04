import { assert } from 'console';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default function Page() {
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!container.current) return
        const scene = new THREE.Scene()
        // const camera = new THREE.PerspectiveCamera(60,
        //     container.current.clientWidth / container.current.clientHeight,
        //     0.1,
        //     100
        // )

        // camera.position.set(0, 0, 20)
        const camera = new THREE.OrthographicCamera(
            -20*container.current.clientWidth/container.current.clientHeight,
            20*container.current.clientWidth/container.current.clientHeight,
            20,
            -20,
            -100,
            1000
        )
        camera.position.set(0,0,100)
        camera.lookAt(scene.position)

        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(new THREE.Color(0x000000))
        renderer.setSize(container.current.clientWidth, container.current.clientHeight)
        container.current.appendChild(renderer.domElement)

        const vertices = new Float32Array([
            0.0, 0.1,
            -0.1, -0.1,
            0.1, -0.1,
            -0.1, 0.2
        ])
        const verticesAttribute = new THREE.BufferAttribute(vertices, 3)
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', verticesAttribute)

        const merterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
        const cube = new THREE.Mesh(geometry, merterial)

        scene.add(cube)

        // text
        const fontLoader = new FontLoader()
        fontLoader.load('./assets/font/Kristen ITC_Regular.json', (font) => {
            const textGeometry = new TextGeometry(
                'Hello 3D',
                {
                    font,
                    size: 2,
                    depth:0.2,
                    bevelEnabled: true, /**是否倒角 */
                    bevelThickness: 0.3,
                    bevelSize: 0.2,
                    bevelOffset: 0,
                    bevelSegments: 5, /**倒角细分数量 */
                    curveSegments:6 /**曲线细分数量 */
                }
            )

            const textMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe:true })
            const textMesh = new THREE.Mesh(textGeometry, textMaterial)
            //textMesh.position.set(0,0,0)
            scene.add(textMesh)
        })

        // // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target = cube.position
        controls.update()
        const axes = new THREE.AxesHelper()
        scene.add(axes)
        renderer.render(scene, camera);

        const animate = () => {
            //     const t = clock.getElapsedTime()
            //     group.rotation.y=0.5*Math.PI*t
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup on unmount
        return () => {
            container.current?.removeChild(renderer.domElement);
        };
    }, [])

    return (
        <>
            <div ref={container} style={{ width: "100%", height: "100vh", background: "red" }}></div>
        </>
    );
}
