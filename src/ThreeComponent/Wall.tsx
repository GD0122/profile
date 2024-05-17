import { useBox } from "@react-three/cannon";
import { MutableRefObject } from "react";
import { Mesh } from "three";


const Wall = (props:any)=>{
    const [ref,] = useBox(() => ({
        ...props,
        position:props.position || [0,0,0],
        mass:1,
    
    }));

    const refRef = ref as MutableRefObject<Mesh>
     

    
//    />
    return (
        <mesh ref={refRef} name={props.names || "wall"}  >
            <boxGeometry attach={'geometry'} args={props.args || [1,1,1]}/>
            <meshStandardMaterial opacity={1} color={props.color || "grey"}/>
        </mesh>
    )
}

export default Wall