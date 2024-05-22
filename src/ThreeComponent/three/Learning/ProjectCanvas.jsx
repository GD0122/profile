import { Box, Html, OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import React, { Suspense, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { MeshBasicMaterial } from "three"
import * as THREE from 'three'
import { projects } from "./projects"

const LazyBox = React.lazy(()=>import('./Boxs'));
const ProjectCanvas = ()=>{

  const {ids} = useParams()
  
  
  const boxRef = useRef()
 



  
  return (
    
  <div style={{ minHeight: "100vh", minWidth: "100%", position: "relative",
  }}>
   <Canvas id='canvas-container' style={{ minWidth: "80%", minHeight: "80%",position:'absolute' }}
          
    
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: Soft shadows
          }}
    
          
          >
     
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls target={[0,0,1]} />
      <Suspense fallback={<Html center>Loading...</Html>}>
        <LazyBox position={[0,0,0]} ids={ids}/>
      </Suspense>
      

          </Canvas>
  </div>
        

  )
}
export default ProjectCanvas

