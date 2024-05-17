import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MyBox from "./MyBox";
import MyPlane from "./MyPlane";
import { Physics } from "@react-three/cannon";
import { Suspense } from "react";
import MyBox2 from "./MyBox2";
import Wall from "./Wall";
import VideoView from "./three/VideoModal";
import LearningPath from "./three/Learning/LearningPath";
import MyProjectPath from "./three/Learning/MyProjectPath";
import MyGallery from "./three/Learning/MyGalleryPath";
import MyContact from "./three/Learning/MyContactPath";
import FVP from "./three/FVP";

import * as THREE from 'three'
import { Char1 } from "./three/Char1";

import Walls from "./Walls";
import Bubble from "./Bubble";






const Main = ()=>{
    return(
        <Canvas id='canvas-container' style={{ minWidth: "100%", minHeight: "100%",position:'absolute' }}
          
    
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: Soft shadows
        }}
  
        
        >
           
            <Suspense fallback={null}>
          
            <ambientLight intensity={0.5} />
            <directionalLight position={[0,15,0]} intensity={0.2}/>
            <Physics 
            // gravity={[0,-30,0]}
            broadphase="SAP"
            gravity={[0,-30,0]}
            >
                {/* <MyBox position={[0, 0, 0]} /> */}
                {/* <FVP/> */}
                
                <Walls />
               
                {/* <VideoView position={[-10,0,-10]}  type={'Kinematic'}
                  args={[1,1,1]}
                  
                /> */}
                <LearningPath type={'Kinematic'}
                position={[-20,3,0]}
                text='Pembelajaran'
                />
                <MyProjectPath 
                 position={[20,3,0]}
                 rotationY={4.8}
                 text='Project'
                />
                <MyGallery
                 position={[0,3,-20]}
                 rotationY={Math.PI/32}
                 text='Galeri'
                />
                <MyContact
                 position={[0,3,20]}
                 text='Info Kontak'
                />
                {/* <User position={[0,0,0]} sa/> */}
                {/* <Bubble position={[0,5,0]}/> */}
                <Char1 position={[20,0,20]} />
        
                <MyPlane position={[0,-1,0]} />
            
                <MyBox2 position={[-3,0,0]} args={[1,1,1]} mass={10} color="blue" />
                <gridHelper position={[0,-1,0]} />
                <gridHelper position={[0,-1,-6]} rotation={[Math.PI/2,0,0]} />
                <axesHelper position={[-3,2,1]} rotation={[0,0,0]}/>
            </Physics>
            </Suspense>
        </Canvas>
    )
}

export default Main;

