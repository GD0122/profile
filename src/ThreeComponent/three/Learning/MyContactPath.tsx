import { useBox, useCylinder } from "@react-three/cannon"
import TextH from "./Text"
import { MutableRefObject } from "react"
import { Mesh, MeshBasicMaterial, TextureLoader } from "three"
import { Cylinder, Text } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import {contacts} from './contacts'
import * as THREE from 'three'
import { useNavigate } from "react-router-dom"

const MyContact = (props:any)=>{
    
    const [ref] = useBox(()=>{
        return{
            position:[props.position[0],props.position[1]+2.5,props.position[2]+2.3],
        }
    })
  
    const [IgNm,waNm,gitNm,gmNm] = useLoader(TextureLoader,[
        contacts[0].path,
        contacts[1].path,
        contacts[2].path,
        contacts[3].path
    ])
    
   
    const refContact = ref as MutableRefObject<Mesh>

    const [line] = useCylinder(()=>({
        mass:10,
        type:'Static',
        position:[props.position[0],props.position[1]-3,props.position[2]+3],


    }))
  
    return(
        <group>
         <mesh ref={refContact}>
            {/* <TextH text={props?.text || "TEST"} rotationY={props.rotationY}/> */}
          
            <Text children={"Information"}  anchorY="bottom" position={[0, -0.8, 0]} fontSize={0.5}
             font="Tomatoes-O8L8.ttf"
             rotation={[0,3.1,0]}
             color={'white'}
             />
            
         </mesh>
         {/* <mesh  position={[props.position[0],props.position[1]+2,props.position[2]+3]}
          rotation={[Math.PI/2,0,0]}
          >
          <cylinderGeometry 
           />
           <meshStandardMaterial color={'red'}/>
         </mesh> */}
         {/* <group>
            <mesh ref={line as MutableRefObject<Mesh>}>
                <cylinderGeometry args={[0.1,0.1,8,16]}/>
                <meshBasicMaterial color={'grey'}/>
            </mesh>
            <mesh position={[props.position[0], props.position[1] - 2, props.position[2] + 3]} rotation={[0, 0, Math.PI / 2]}>
                 <cylinderGeometry args={[0.1, 0.1, 1.5, 16]}  />
                 <meshBasicMaterial color={'grey'} />
            </mesh>
            <mesh position={[props.position[0],props.position[1],props.position[2]+3]}
             rotation={[0,0,Math.PI/2]}
            >
                <cylinderGeometry args={[0.1,0.1,1.5,16]}/>
                <meshBasicMaterial color={'grey'} />
            </mesh>
         </group> */}
         <group>
            <mesh position={[props.position[0]+1.5,props.position[1],props.position[2]+3]}
            rotation={[0, -Math.PI/2, Math.PI / 2]}
            onClick={(e) => {
                window.open('https://www.instagram.com/hudiindr13?igsh=Mnp6Ynl3cW9meHpu','_blank');
              }}
             >
                <cylinderGeometry args={[0.8,0.8,0.1,32,]}/>
                <meshStandardMaterial 
                  map={IgNm}
                  />
            </mesh>
            <mesh position={[props.position[0]+1.5,props.position[1]-2,props.position[2]+3]}
             rotation={[0, -Math.PI/2, Math.PI / 2]}
             onClick={(e)=>{
                window.open('https://github.com/kororo212', '_blank');
             }}
             >
                <cylinderGeometry args={[0.8,0.8,0.1,32]}/>
                <meshBasicMaterial 
                 map={gitNm}
                />
            </mesh>
            <mesh position={[props.position[0]-1.5,props.position[1],props.position[2]+3]}
              rotation={[0, -Math.PI/2, Math.PI / 2]}
             
              onClick={(e)=>{
                window.open( 'https://wa.me/+6285883584374', '_blank');
             }}
             >
                <cylinderGeometry args={[0.8,0.8,0.1,32]}/>
                <meshBasicMaterial 
                 map={waNm}
                />
            </mesh>
            <mesh position={[props.position[0]-1.5,props.position[1]-2,props.position[2]+3]}
              rotation={[0, -Math.PI/2, Math.PI / 2]}
              onClick={(e) => {
                window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hudiindrawan01@gmail.com','_blank');
              }}
             >
                <cylinderGeometry args={[0.8,0.8,0.1,32]}/>
                <meshBasicMaterial 
                 map={gmNm}
                />
            </mesh>
         </group>
        
        </group>
    
    )
}

export default MyContact

