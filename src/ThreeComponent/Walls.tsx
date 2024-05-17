import { useBox } from "@react-three/cannon"
import Wall from "./Wall"
import { useRef } from "react"
import { Group } from "three"


const Walls = (props:any)=>{


   const walls = useRef<Group>(null)

    return(
        <group ref={walls} name="walls">
      <Wall position={[0,0,-25]} args={[51,15,1]}
        type={'Kinematic'} names={"wall1"} 
        />
      <Wall position={[25,0,0]} args={[1,15,51]}
       type={'Kinematic'}  names={'wall2'}
       />
         <Wall position={[0,0,25]} args={[51,15,1]}
          type={'Kinematic'} names={"wall3"} 
       />
      
        <Wall position={[-25,0,0]} args={[1,15,51]}
          type={'Kinematic'}   names={'wall4'}
           />
   
        </group>
    )
}

export default Walls