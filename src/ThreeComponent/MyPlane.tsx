import { usePlane } from "@react-three/cannon"
import { useRef,MutableRefObject } from "react"
import { Mesh, RepeatWrapping, TextureLoader } from "three";
import img from '../assets/grass.jpg'
import { useTexture } from "@react-three/drei";



const MyPlane = (props: any) => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        type:'Static',
        mass: 0,
        ...props
    })); // Explicitly type the ref as Mesh
    const typedRef = ref as MutableRefObject<Mesh>;
    const texture = new TextureLoader().load(img);
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(50, 50)

    return (
        <mesh ref={typedRef} receiveShadow name="plane">
            <planeGeometry attach={'geometry'} args={[50, 50]} name="plane-geo" />
            <meshStandardMaterial map={texture} attach="material" />
        </mesh>
    );
}

export default MyPlane;





 
 
