import { Box, Html, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { MeshBasicMaterial } from "three"
import * as THREE from 'three'
import { projects } from "./projects"

const Boxs = (props)=>{

    const refBox = useRef()
    const {camera,scene} = useThree()
    const [err,setErr] = useState(false)
    const createBox = async()=>{
      try {
        const project = projects[props.ids];
        const mesh = refBox.current;
        
        while (mesh?.children.length) {
          mesh.remove(mesh.children[0]);
        }
    
        const textureLoads = new THREE.TextureLoader();
        const textures = await Promise.all(project.images.map(url => new Promise(resolve => textureLoads.load(url, resolve))));
        
        if (mesh) {
          const materials = textures.map(texture => new THREE.MeshStandardMaterial({ map: texture }));
          const box = new THREE.BoxGeometry(3, 3, 3);
          const boxMesh = new THREE.Mesh(box, materials);
          mesh.add(boxMesh);
        }
        
        setErr(false);
      } catch (error) {
      
        setErr(true);
      }
    }
  
   useEffect(()=>{
      createBox()
   },[props.ids])
   useFrame((state,delta)=>{
     if(refBox.current){
      refBox.current.rotation.y += 0.005 + delta;
     }
   })
  
    return (
      <>
      
      <mesh ref={refBox} {...props} rotation={[0,0,0]}>
        {/* <boxGeometry args={[3,3,3]}/>
        <meshBasicMaterial color={'blue'}/> */}
        <Html center style={{ color: '#3ca1c4',display:err?'block':'none' }}>
         <h2 >Sorry Something Wrong...</h2>
        </Html>
      </mesh>
      </>
   
    )
  }
export default Boxs