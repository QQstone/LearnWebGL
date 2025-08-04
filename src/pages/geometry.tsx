import { assert } from 'console';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap'

export default function Page() {
    const container = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (!container.current) return
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, 
            container.current.clientWidth/container.current.clientHeight,
            0.1,
            1000
        )
      
        camera.position.set(0,0,1)
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
        const verticesAttribute = new THREE.BufferAttribute(vertices,3)
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', verticesAttribute)

        const merterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe:true
        })
        const cube = new THREE.Mesh(geometry, merterial)
        
        scene.add(cube)

        // // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target = cube.position
        controls.update()
        renderer.render(scene, camera);
       
        // Cleanup on unmount
        return () => {
            container.current?.removeChild(renderer.domElement);
        };
    },[])
    
    return (
        <>
            <div ref={container} style={{width:"100%", height:"100vh", background:"red"}}></div>
        </>
    );
}
