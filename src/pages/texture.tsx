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
            30,
            100
        )
        camera.position.set(0,0,100)
        camera.lookAt(scene.position)

        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(new THREE.Color(0x000000))
        renderer.setSize(container.current.clientWidth, container.current.clientHeight)
        container.current.appendChild(renderer.domElement)
        
        const loader = new THREE.TextureLoader()
        const texture = loader.load('./assets/images/texture/cover-22.webp',
            (txt)=>{
                console.log(txt)
            },
            ()=>{
                console.log('loading')
            },
            (e)=>{
                console.error(e)
            }
        )
        // 设置纹理在U轴（水平方向）和V轴（垂直方向）上的重复次数。
        texture.repeat.x = 2
        texture.repeat.y = 2
        // 设置纹理在U轴（S方向）和V轴（T方向）上的包裹模式（wrap mode）。
        // THREE.MirroredRepeatWrapping接缝处镜像翻转
        texture.wrapS = THREE.MirroredRepeatWrapping
        texture.wrapT = THREE.MirroredRepeatWrapping
        // texture.offset.x = 0.5
        texture.rotation = Math.PI * 0.5
        // texture.center.x = 1
        // texture.center.y = 1
        // texture.generateMipmaps = true
        // texture.magFilter = THREE.LinearFilter
        // texture.minFilter = THREE.LinearMipmapLinearFilter
        const cubeMaterial = new THREE.MeshDepthMaterial({
            // color: 0xff0000, 
            // wireframe:true
            map: texture
        })

        // cubeMaterial.transparent = true

        // const group = new THREE.Mesh();
        const count = 30
        for(let i = 0; i<count; i++){
            const size = Math.random() * 5
            const x = Math.random() * 50 - 25
            const y = Math.random() * 50 - 25
            const z = Math.random() * 50 - 25
            const cubeGeometry = new THREE.BoxGeometry(size, size, size)
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.position.set(x,y,z)
            scene.add(cube)
            // renderer.render(scene, camera);
        }

        // const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
        // const ball = new THREE.Mesh(sphereGeometry, cubeMaterial)
        // // uv in geometry
        // console.log('UV:', sphereGeometry.attributes.uv)
        // ball.position.set(0, 0, 0)
        // scene.add(ball)

        // // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement)
        // controls.target = ball.position
        controls.target = new THREE.Vector3(0, 0, 0)
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
        const animate = () => {
        //     const t = clock.getElapsedTime()
        //     group.rotation.y=0.5*Math.PI*t
             requestAnimationFrame(animate);
             renderer.render(scene, camera);
        };

        animate();
        // mouse rotate
        // document.addEventListener('mousemove', (e)=>{
        //     if(!container.current) return
        //     const x = (e.x - container.current.offsetLeft)/container.current.clientWidth - 0.5;
        //     const y = -(e.x - container.current.offsetTop)/container.current.clientHeight + 0.5;
        //     camera.position.z = Math.cos(x*Math.PI*10)*20
        //     camera.position.x = Math.sin(x*Math.PI*10)*20
        //     camera.lookAt(scene.position)
        //     renderer.render(scene, camera)
        // })
        // Cleanup on unmount
        return () => {
            container.current?.removeChild(renderer.domElement);
        };
    },[])
    
    return (
        <div ref={container} style={{width:"100%", height:"100vh", background:"red"}} />
    );
}
