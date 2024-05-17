import { useBox } from "@react-three/cannon"
import { MutableRefObject } from "react";
import { Mesh } from "three";


const MyBox2 = (props:any) => {
    const [ref] = useBox(()=>({
        mass: 1,
        type:'Static',
        ...props
    }))
    const meshRef = ref as MutableRefObject<Mesh>;
    return (
        <mesh ref={meshRef} receiveShadow>
            <boxGeometry attach={'geometry'} args={[1, 1, 1]} />
            <meshBasicMaterial attach="material" color="blue" />
        </mesh>
    )
}
export default MyBox2;
