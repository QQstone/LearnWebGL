import { assert } from 'console';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
        camera.position.set(-30,40,30)
        camera.lookAt(scene.position)

        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(new THREE.Color(0x000000))
        renderer.setSize(container.current.clientWidth, container.current.clientHeight)
        container.current.appendChild(renderer.domElement)

        
        //const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:true})
        const matArray = []
        matArray.push(new THREE.MeshBasicMaterial({color: 0xff0000}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0x009e60}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0x0000ff}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0x00ff00}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0xffffff}))

        const group = new THREE.Mesh();
        for(let x = 0; x<3; x++){
            for(let y = 0; y<3; y++){
                for(let z = 0; z<3; z++){
                    const cubeGeometry = new THREE.BoxGeometry(2.9,2.9,2.9)
                    const cube = new THREE.Mesh(cubeGeometry, matArray)
                    cube.position.set(x*3,y*3,z*3)
                    group.add(cube)
                }
            }
        }

        
        scene.add(group)

        // // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target = group.position
        controls.update()

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
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
