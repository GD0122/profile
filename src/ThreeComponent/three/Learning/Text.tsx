import { useBox } from "@react-three/cannon"
import { Html } from "@react-three/drei"
import { MutableRefObject } from "react"
import { Mesh } from "three"



const TextH=(props:any)=>{
    
    const [ref] = useBox(()=>{
       return{
         type:'Static',
        ...props,
       }
    })
    const refText = ref as MutableRefObject<Mesh>
    return(
        <mesh ref={refText} >
           <Html  wrapperClass="learn"
                
              
                transform
                zIndexRange={[0, 0]} prepend 
                rotation-y={props.rotationY ||Math.PI / 2}
               >
                  <h1 style={{color:'blue',backgroundColor:'red',padding:'10px',
                   border:'1px solid black',
                   borderRadius:'20px',
                   
                  }}>{props.text || "TEST"}</h1>
           </Html>
           <meshBasicMaterial transparent={true} depthTest={false}/>
        </mesh>
    )
}

export default TextH