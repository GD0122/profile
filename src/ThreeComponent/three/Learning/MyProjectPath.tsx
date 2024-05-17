import { useBox, useCylinder } from "@react-three/cannon"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { Mesh, Vector3 } from "three"
import { Cylinder, Html, RoundedBox, Select, SpotLight, Text } from "@react-three/drei"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import {projects} from './projects'
import { FaDocker } from "react-icons/fa6";
import { FaGithub, FaPager } from "react-icons/fa";
import './projects.css'

interface Project{ name: string; images: string[]; about: string; github: string; docker: string; web: string; }
const MyProjectPath = (props:any)=>{
  const [selected,setSelected] = useState<Project | null>(null)
  


  const [ref] = useBox(()=>{
    return{
        ...props
    }
  })
  const {scene} = useThree()
  const [bottomProject] = useCylinder(()=>({
    position:[props.position[0]+2,props.position[1]-4,props.position[2]],
    mass:10,
    type:'Static',

  }))

 const refProject = ref as MutableRefObject<Mesh>
 const boxPro = useRef<Mesh>(null)
 const duration = 10000; // Durasi animasi dalam milidetik
 let startTime = useRef<number | null>(null);
 const refBox = useRef<THREE.Group>(null)


 const GetProjects = async (i:number) => {
 
  try {
    const project:Project = projects[i]

    const mesh = refBox.current;
    while (mesh?.children.length) {
      mesh.remove(mesh.children[0]);
    }
    const textures: THREE.Texture[] = await Promise.all([
      new Promise(resolve => new THREE.TextureLoader().load(project.images[0], resolve)) as Promise<THREE.Texture>,
      new Promise(resolve => new THREE.TextureLoader().load(project.images[1], resolve)) as Promise<THREE.Texture>,
      new Promise(resolve => new THREE.TextureLoader().load(project.images[2], resolve)) as Promise<THREE.Texture>,
      new Promise(resolve => new THREE.TextureLoader().load(project.images[3], resolve)) as Promise<THREE.Texture>,
      new Promise(resolve => new THREE.TextureLoader().load(project.images[4], resolve)) as Promise<THREE.Texture>,
      new Promise(resolve => new THREE.TextureLoader().load(project.images[5], resolve)) as Promise<THREE.Texture>
    ]);

    if (mesh) {
      const materials = textures.map(texture => new THREE.MeshStandardMaterial({ map: texture ,
       
      }));
      
      const box = new THREE.BoxGeometry(3,3,3);
      const boxMesh = new THREE.Mesh(box, materials);
      
      mesh.add(boxMesh);
      
    }
    setSelected(project)
  } catch (error) {
    // Tangani kesalahan di sini
    console.error('Terjadi kesalahan saat memuat tekstur:', error);
  }
};
 useEffect(()=>{
     GetProjects(0)
  },[])

  useFrame((state, delta) => {
    const distance = 3; // Jarak bola dari targetMesh
    const angle = Date.now() * 0.001; 
    if (refBox.current) {
      // Ganti refbox.current dengan ref yang sesuai dari objek yang akan dijadikan parent
      refBox.current.children.forEach(child => {
        // Periksa apakah anak saat ini adalah kotak (BoxGeometry)
        if (child instanceof THREE.Mesh) {
          // Rotasi anak kotak sepanjang sumbu y
          child.rotation.y += 0.2 * delta;
        }
      });
    }
    if( refBall.current && refBox.current){
      // refBall.current.position.z += 0.2 * delta
      const x = refBox.current.position.x + Math.cos(angle) * distance;
      const y = refBox.current.position.y + Math.sin(angle) * distance;

      // Atur posisi bola
      // refBall.current.position.set(x, y, refBox.current.position.z);
    }
  
    
});
const pointRef = useRef<THREE.PointLight>(null)
const refBall = useRef<THREE.Mesh>(null)

const box1 = useRef<THREE.Mesh>(null)

    return(
      <group>
        <mesh ref={refProject}>
            {/* <Text children={props.text || "Project"} 
            rotation={[0,-1.5,0]} position={[-3,0,0]}
            /> */}
        </mesh>
        
        <group>
          <mesh ref={bottomProject as MutableRefObject<Mesh>}>
            <cylinderGeometry args={[1,2,1,32]}/>
            <meshBasicMaterial color={'red'}/>
       
          </mesh>
          <group ref={refBox as MutableRefObject<THREE.Group>}
            position={[props.position[0]+2,props.position[1]-0.5,props.position[2]]}
            receiveShadow
         
           >
             <mesh>
              <boxGeometry/>
             </mesh>
          </group>
          <group position={[props.position[0],props.position[1]-1,props.position[2]+7]
            
           }>

          
       
            <mesh
             rotation={[0,Math.PI/2,0]}
             receiveShadow
             >
              <RoundedBox args={[3.5,4.5,0.1]} radius={0.20}/>
              <meshStandardMaterial emissive={'blue'} emissiveIntensity={1}/>
           
            </mesh>
            <Text 
             
               children={`Project ${selected?.name}`} fontSize={0.3}
               position={[-0.5,1.8,0]}
               rotation={[0,-1.5,0]}
               color={'blue'}
               whiteSpace="overflowWrap"
            />
            <Html transform  
             rotation={[0,-1.5,0]}
             onClick={(e)=>{return null}}
            >
            <div style={{fontSize:'10px'}}>
            <select defaultValue={0} onChange={(e)=>GetProjects(+e.target.value)} >
                <option value={0}>React Movie</option>
                <option value={1}>React Gamebor</option>
              </select>
            </div>
              <p style={{width:'100px',pointerEvents:'none',
              fontSize:'8px'  
            }}
               
              >Description: {selected?.about}</p>
             <div  style={{
              display:'flex',
              justifyContent:'space-around',
              alignItems:'center',
              flexDirection:'row',
              flexWrap:'nowrap',
              
             }} >
              <FaDocker className="info" 
               onClick={()=>{
                window.open(selected?.docker,'_blank')
               }}
               />
              <FaGithub className="info"
              onClick={()=>{
                window.open(selected?.github,'_blank')
               }}
              />
              <FaPager className="info"
              onClick={()=>{
                window.open(selected?.web,'_blank')
               }}
              />
             </div>
            </Html>
           
          </group>
          <group >
          <pointLight
           position={[20,3.5,0]}
           color={'white'}
           scale={1}
           intensity={0.5}
          />
          <pointLight
           position={[20,2,-1.5]}
           color={'blue'}
           scale={1}
           intensity={0.5}
          />
           
      
           
          </group>
        </group>
      </group>
       
    )
}

export default MyProjectPath