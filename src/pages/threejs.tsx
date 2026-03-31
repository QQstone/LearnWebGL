import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Page() {
    const container = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (!container.current) return
        const scene = new THREE.Scene()
        // const camera = new THREE.PerspectiveCamera(60, 
        //     container.current.clientWidth/container.current.clientHeight,
        //     0.1,
        //     1000
        // )
        const camera = new THREE.OrthographicCamera(
            -20*container.current.clientWidth/container.current.clientHeight,
            20*container.current.clientWidth/container.current.clientHeight,
            20,
            -20,
            0.1,
            1000
        )
        camera.position.set(0,0,20)
        camera.lookAt(scene.position)

        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(new THREE.Color(0x000000))
        renderer.setSize(container.current.clientWidth, container.current.clientHeight)
        container.current.appendChild(renderer.domElement)
        
        
        // const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:true})
        const matArray = []
        matArray.push(new THREE.MeshBasicMaterial({color: 0xff0000}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0x009e60}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0x0000ff}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0xffee00}))
        matArray.push(new THREE.MeshBasicMaterial({color: 0xffffff}))

        const group = new THREE.Mesh();
        for(let x = 0; x<3; x++){
            for(let y = 0; y<3; y++){
                for(let z = 0; z<3; z++){
                    const cubeGeometry = new THREE.BoxGeometry(2.9,2.9,2.9)
                    const cube = new THREE.Mesh(cubeGeometry, matArray)
                    cube.position.set(x*3-3,y*3-3,z*3-3)
                    group.add(cube)
                }
            }
        }
        
        scene.add(group)

        // // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target = group.position
        controls.update()
        renderer.render(scene, camera);
        // gsap.to(group.position, {
        //     duration:1,
        //     delay:1,
        //     x:20
        // })
        // gsap.to(group.position, {
        //     duration:1,
        //     delay:2,
        //     x:0
        // })
        // // Render loop
        // // const clock = new THREE.Clock()
        // const animate = () => {
        // //     const t = clock.getElapsedTime()
        // //     group.rotation.y=0.5*Math.PI*t
        //      requestAnimationFrame(animate);
        //      renderer.render(scene, camera);
        // };

        // animate();
        // mouse rotate
        document.addEventListener('mousemove', (e)=>{
            if(!container.current) return
            const x = (e.x - container.current.offsetLeft)/container.current.clientWidth - 0.5;
            const y = -(e.x - container.current.offsetTop)/container.current.clientHeight + 0.5;
            camera.position.z = Math.cos(x*Math.PI*10)*20
            camera.position.x = Math.sin(x*Math.PI*10)*20
            camera.lookAt(scene.position)
            renderer.render(scene, camera)
        })
        // Cleanup on unmount
        return () => {
            container.current?.removeChild(renderer.domElement);
        };
    },[])
    
    return (
        <div ref={container} style={{width:"100%", height:"100vh", background:"red"}} />
    );
}
