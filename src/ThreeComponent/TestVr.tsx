// HandTrackingScene.js
import React from 'react';
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Box, Sphere, Plane } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';

function TestVr() {
  return (
    <div style={{ minHeight: "100vh", minWidth: "100%", position: "relative" }}>
    <ARButton/>
    
    <Canvas style={{ minWidth: "100%", minHeight: "100%",position:'absolute' }}>
        
      <XR>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </XR>
    </Canvas>
    </div>
  );
}

export default TestVr;
