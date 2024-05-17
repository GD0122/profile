import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { Mesh } from "three";

function Bubble(props:any) {
    const bubbleRef = useRef<Mesh>(null);

  
  
    return (
      <mesh ref={bubbleRef } {...props} scale={5}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial color={0xffffff} attach={'material'} distort={1} speed={1} transparent opacity={0.5} />
      </mesh>
    );
}
  export default Bubble