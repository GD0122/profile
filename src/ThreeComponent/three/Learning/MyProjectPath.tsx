import { useBox, useCylinder } from "@react-three/cannon"
import { MutableRefObject, Suspense, useEffect, useRef, useState } from "react"
import { Mesh, Vector3 } from "three"
import { Cylinder, Html, OrbitControls, RoundedBox, Select, SpotLight, Text, useGLTF } from "@react-three/drei"
import {  useFrame, useLoader, useThree } from "@react-three/fiber"
import * as THREE from 'three'
import {projects} from './projects'
import { FaDocker } from "react-icons/fa6";
import { FaGithub, FaPager } from "react-icons/fa";
import './projects.css'
import { ProjectModel } from "./projects"
import { ProjectBg } from "./projects"
import { Button } from "react-bootstrap"
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


//  const GetProjects = async (i:number) => {
 
//   try {
//     const project:Project = projects[i]

//     const mesh = refBox.current;
//     while (mesh?.children.length) {
//       mesh.remove(mesh.children[0]);
//     }
//     const textures: THREE.Texture[] = await Promise.all([
//       new Promise(resolve => new THREE.TextureLoader().load(project.images[0], resolve)) as Promise<THREE.Texture>,
//       new Promise(resolve => new THREE.TextureLoader().load(project.images[1], resolve)) as Promise<THREE.Texture>,
//       new Promise(resolve => new THREE.TextureLoader().load(project.images[2], resolve)) as Promise<THREE.Texture>,
//       new Promise(resolve => new THREE.TextureLoader().load(project.images[3], resolve)) as Promise<THREE.Texture>,
//       new Promise(resolve => new THREE.TextureLoader().load(project.images[4], resolve)) as Promise<THREE.Texture>,
//       new Promise(resolve => new THREE.TextureLoader().load(project.images[5], resolve)) as Promise<THREE.Texture>
//     ]);

//     if (mesh) {
//       const materials = textures.map(texture => new THREE.MeshStandardMaterial({ map: texture ,
       
//       }));
      
//       const box = new THREE.BoxGeometry(3,3,3);
//       const boxMesh = new THREE.Mesh(box, materials);
      
//       mesh.add(boxMesh);
      
//     }
//     setSelected(project)
//   } catch (error) {
//     // Tangani kesalahan di sini
//     console.error('Terjadi kesalahan saat memuat tekstur:', error);
//   }
// };
 useEffect(()=>{
   getProjecs(0)
  },[])

  useFrame((state, delta) => {
    const distance = 3; // Jarak bola dari targetMesh
    const angle = Date.now() * 0.001; 
    // if (refBox.current) {
    //   // Ganti refbox.current dengan ref yang sesuai dari objek yang akan dijadikan parent
    //   refBox.current.children.forEach(child => {
    //     // Periksa apakah anak saat ini adalah kotak (BoxGeometry)
    //     if (child instanceof THREE.Mesh) {
    //       // Rotasi anak kotak sepanjang sumbu y
    //       child.rotation.y += 0.2 * delta;
    //     }
    //   });
    // }
    // if( refBall.current && refBox.current){
  
    //   const x = refBox.current.position.x + Math.cos(angle) * distance;
    //   const y = refBox.current.position.y + Math.sin(angle) * distance;

    // }
  
    
});
const pointRef = useRef<THREE.PointLight>(null)
const refBall = useRef<THREE.Mesh>(null)

const box1 = useRef<THREE.Mesh>(null)

const [leftSc] = useBox(()=>({
  position:[props.position[0]+3,-1,props.position[2]+1],
  rotation:[0,4.7,0],
  args:[1,1,1],
  mass:100,
  type:'Static',
  
}),useRef(null))
const [rightSc] = useBox(()=>({
  position:[props.position[0]+3,-1,props.position[2]+5],
  rotation:[0,4.7,0],
  mass:100,
  type:'Static',
  args:[1,3,1]
  
}),useRef(null))
const leftMod = useGLTF(ProjectModel[0].path)
const rightMod = useGLTF(ProjectModel[1].path)

const [bg1,bg2] = useLoader(THREE.TextureLoader,[ProjectBg[0].path,ProjectBg[1].path])
const [shows,setShows] = useState(false)
const [projectI,setProjectI] = useState(0)
const ShowSelect = async()=>{
setShows(prev => !prev)
}

const getProjecs = async(i:number)=>{
  const project = await projects.filter((data,idx)=>idx === i)
  setSelected(project[0])
}
const selectProject = async(i:number)=>{
  setProjectI(i)
  getProjecs(i)

  setShows(false)
}
    return(
      <group>
        <mesh ref={refProject}>
          
        </mesh>
        
        {/* <group> */}
          {/* <mesh ref={bottomProject as MutableRefObject<Mesh>}>
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
          </group> */}
          {/* <group position={[props.position[0],props.position[1]-1,props.position[2]+7]
            
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
           
      
           
          </group> */}
        {/* </group> */}
   
        
          <mesh ref={rightSc as MutableRefObject<Mesh>}>
           <primitive object={rightMod.scene} scale={0.3}
           position={[0,0,0.1]}
           />
          </mesh>
       
          <mesh ref={leftSc as MutableRefObject<Mesh>}>
           <primitive object={leftMod.scene}
            position={[2.3,0,0]}
           scale={0.3}/>
          </mesh>

          <group>
         
            <mesh position={[props.position[0]+2.81,props.position[1]-0.5,props.position[2]+3.05]}
             rotation={[0,-Math.PI/2,0]}
            
            >
              <planeGeometry args={[4.1,5]}  />
              <meshStandardMaterial map={bg2} transparent />
             
              <Html transform 
                occlude
                castShadow 
                position={[0,0.2,0.01]}
                zIndexRange={[1]}
               >
                <div style={{width:'130px',height:'100px',margin:'0',position:'relative',
                  left:'2px',color:'#3ca1c4',
                }}>
                  <p style={{fontSize:'12px',margin:'0',marginTop:'15px'}}>Description : </p>
                  <p style={{fontSize:'8px',padding:'0px 1px',margin:0,}}>
                    {selected?.about}
                  </p>
                
                </div>
              
               </Html>
            </mesh>
            <mesh position={[props.position[0]+2.8,props.position[1]-2.5,props.position[2]+3]}
             rotation={[0,-Math.PI/2,0]}
            
              >
              <pointLight color={'blue'} intensity={10} position={[1,0.5,0]}/>
              <planeGeometry args={[3.8,1,]} />
              <meshStandardMaterial map={bg1} transparent/>
              <Html occlude transform 
               position={[0,0,0.05]}
              >
                <div className='bg1'>
                  <div className="bg1-container">
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
              <FaPager className="info " 
              onClick={()=>{
                window.open(selected?.web,'_blank')
               }}
              />  
             
                  </div>
              
                </div>
              </Html>
             
            </mesh>
          </group>
          <group position={[props.position[0]+3,props.position[1],props.position[2]-3]}
           rotation={[0,-Math.PI/2,0]}
          >
            <mesh>
            <pointLight color={'blue'} intensity={10} position={[0,0.5,0]}/>
              <planeGeometry args={[8,7,]}/>
              <meshStandardMaterial map={bg2} transparent/>
            <Html
            occlude transform
            position={[0,0.5,0.01]}
            >
              <div style={{width:'250px',height:'100px',display:'flex',flexDirection:'row',
                  color:'#3ca1c4'
               }}>
                <div style={{width:"45%",margin:0}}>
                  <p style={{margin:0,fontSize:'12px',marginTop:'5px'}}>Select : </p>
                  <button 
                   disabled={shows?true:false}
                   onClick={(e)=>{ShowSelect()}}
                  style={{background:'#3ca1c4',color:'white',border:'1px solid #3ca1c4'}}
                   >Selection</button>
                      <div className="showSelect" style={{position:'absolute',width:'200px',height:'100px',
                      left:'-80%',display:shows?'block':'none'
                       
                       }}>
                        <button onClick={()=>{ShowSelect()}} style={{marginLeft:'76%',background:'#3ca1c4',color:'white',
                         border:'2px solid #3ca1c4'
                         }}>X</button>
                        <p style={{margin:0,fontSize:'8px'}}>Choose Project : </p>
                        <div className="custom-scrollbar" style={{position:'relative',width:'190px',height:'60px',
                          left:'3%',
                          top:'2%',
                          display:'flex',
                          flexDirection:'row',
                          flexWrap:'wrap',
                          justifyContent:'center',
                          alignContent:'flex-start',
                          alignItems:'center',
                          flexGrow:'2',
                          // background:'red',
                          overflowY:'scroll',
                          fontSize:'10px'
                      }}>
                          {projects.map((data,i)=>{
                            return(
                              <p className="project-opts" key={data.name+i}
                              onClick={(e)=>{selectProject(i)}}
                              style={{ margin: '0',flexGrow: '1', flexBasis: '50%',
                              color:projectI===i?'white':'#3ca1c4'
                             }}>{data.name}</p>
                            )
                          })}
                        </div>
                      </div>
                </div>
             
                <div style={{width:'65%',}}>
                <iframe title="projectBox" src={`http://localhost:3000/project/${projectI}`} height={'100%'} width={'100%'}
                 frameBorder={0}
                />
                </div>
              </div>
               
          
            
           </Html>
            </mesh>
          </group>
         
      </group>
       
    )
}

export default MyProjectPath