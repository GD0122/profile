import { useBox } from "@react-three/cannon"
import { Html, PresentationControls, Text } from "@react-three/drei"
import { MutableRefObject, useEffect, useRef } from "react"
import { Mesh, MeshBasicMaterial } from "three"
import { extend, useFrame, useThree, } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import TextH from "./Text"
import * as THREE from 'three'
import { consumers } from "stream"
extend({ TextGeometry })


const LearningPath = (props:any) => {
     const {scene} = useThree()
    const [learn] = useBox(()=>{
        return {
         
            position:[props.position[0],props.position[1]+2,props.position[2]]
        }
    })
  
    const refLearn = learn as MutableRefObject<Mesh>
 
    // function LetterL(props:any) {
    //     // Tentukan kurva untuk jalur tabung
    //     const verticalPath = [
    //         new THREE.Vector3(0, 0, 0),
    //         new THREE.Vector3(0, 0, -props.verticalLength)
    //       ];
        
    //       // Tentukan titik-titik untuk jalur horizontal
    //       const horizontalPath = [
    //         new THREE.Vector3(0, 0, -props.verticalLength),
    //         new THREE.Vector3(-props.horizontalLength, 0, -props.verticalLength)
    //       ];
        
    //       // Gabungkan kedua jalur
    //       const path = new THREE.CatmullRomCurve3([...verticalPath, ...horizontalPath]);
      
    //     // Buat geometri tabung berdasarkan jalur yang ditentukan
    //     const geometry = new THREE.TubeGeometry(path, 64, 0.1, 16, false);
      
    //     // Buat material untuk tabung
    //     const material = new THREE.MeshBasicMaterial({ color: 'red' });
      
    //     return (
    //       <mesh geometry={geometry} material={material} position={props.position} {...props}>
    //         {/* Mesh untuk huruf L */}
    //       </mesh>
    //     );
    //   }
   const Lines = useRef<THREE.Group>(null)
   
    let currentIndex = 0;
    const lineCoordinates:[number, number, number][] = [
      [0.1,0,-2],
      [0.1,1,-2],
      [0.1, 1, 3],
      [0.1, 1, 3],
      [0.1,-1,3],
      [0.1, -1, 1],
      [0.1,0.1,1], 
      [0.1, 0,-2],
      [0.1,-2,-2]
      
    ];
    const lineCoor:[number,number,number][] = [
      [-24,3,-2],
      [-24,4,-2],
      [-24,4,3],
      [-24,2,3],
      [-24,2,1],
      [-24,3,1],
      [-24,3,-2],
      [-24,0,-2],
    ]
    
    let currentI = 0;
    useFrame((state,delta)=>{
    
    if(movingBox2.current){
      if(currentI < lineCoordinates.length){
       
        const currentPos = movingBox2.current.position
      
        const targetPosition = new THREE.Vector3().fromArray(lineCoor[currentI]);
        // console.log(targetPosition)
        currentPos.lerp(targetPosition,0.04)
        api2.position.set(currentPos.x,currentPos.y,currentPos.z)
      
        if (currentPos.distanceTo(targetPosition) < 0.01) {
          // Menambah indeks untuk mendapatkan posisi selanjutnya dari line
          currentI++;
          if (currentI === lineCoor.length) {
            currentI = 0;
          }
        }
      }
    }
 })
  
    const [boxJs] = useBox(()=>({
      mass:10,
      type:'Kinematic',
      args:[1.5,1,1],
      position:[props.position[0]-4,props.position[1]+1,props.position[2]+3],
      name:'boxJS',
      onCollide:(e)=>{
     
      },
      onCollideBegin(e) {
        if(e.body.name === "runningBox"){
          testCollide1("boxJs")
        }
      },
    }))
    const [boxCss] = useBox(()=>({
      mass:10,
      type:'Kinematic',
      args:[1.5,1,1],
      position: [props.position[0]-4,props.position[1]-1,props.position[2]+1],
      name:'boxCss',
      onCollide:(e)=>{
     
      },
      onCollideBegin(e) {
        if(e.body.name === "runningBox"){
          testCollide1("boxCss")
        }
      },
    }))
    const [boxHtml] = useBox(()=>({
      mass:10,
      type:'Kinematic',
      args:[1.5,1,1],
      position:[props.position[0]-4.2,props.position[1],props.position[2]-2],
      name:'boxHtml',
      onCollide:(e)=>{
     
      },
      onCollideBegin(e) {
        if(e.body.name === "runningBox"){
          testCollide1("boxHtml")
        }
      },
    }))

    const [movingBox2,api2] = useBox(()=>({
      position: [props.position[0]-4, props.position[1], props.position[2]],
      type:'Kinematic',
      mass:0,
      onCollideBegin(e) {
        
      },
      
    }))

   const testCollide1 = async(name:string)=>{
    if(name==="boxHtml"){
      const boxName = scene.getObjectByName(name) as Mesh
      if(boxName){
       
        const materials = boxName.material as THREE.MeshBasicMaterial
        if(materials.color.equals(new THREE.Color('blue'))){
         
          const light = new THREE.PointLight()
          light.color.set('white')
          light.intensity = 0.5; 
         
          boxName.add(light)
          return materials.color.set('green')
          
        } else{
          materials.color.set('blue')
        }
       
      }

    }else{
      const boxName = scene.getObjectByName(name) as Mesh
      const light = new THREE.PointLight()
      light.color.set('white')
      light.intensity = 0.5;  
        
      boxName.add(light)
      if(boxName ){
        const Materials = boxName.material as THREE.MeshBasicMaterial
        Materials.color.set('blue')
      }
    }
   
   }
   const [layer] = useBox(()=>({
    mass:0,
    type:'Kinematic',
    name:'layer',
    args:[1,2.7,5],
    position:[props.position[0]-4,props.position[1]-3,props.position[2]],
    onCollideBegin(e) {
      if(e.body.name === "runningBox"){
        changeColor()
      }
     
      
    },
    
   }))

 const changeColor = async()=>{

   if(boxJs.current && textRef.current){
  
    const jsBox = boxJs.current as Mesh
    const CssBox = boxCss.current as Mesh
    const htmlBox = boxHtml.current as Mesh
     if(jsBox && CssBox && htmlBox){ 
       
      const material = jsBox.material as THREE.MeshBasicMaterial;
      material.color.set('yellow');
      const material1 = CssBox.material as THREE.MeshBasicMaterial;
      material1.color.set('orange');
      const material2 = htmlBox.material as THREE.MeshBasicMaterial;
      material2.color.set('red');
      jsBox.children.forEach((child)=>{
        if(child instanceof THREE.PointLight){
          jsBox.remove(child)
        }
      
      })
      CssBox.children.forEach((child)=>{
        if(child instanceof THREE.PointLight){
          CssBox.remove(child)
        }
      })
      htmlBox.children.forEach((child)=>{
        if(child instanceof THREE.PointLight){
          htmlBox.remove(child)
        }
      })
     }
   }
 }
useEffect(()=>{
  changeColor()
},[])

const textRef  = useRef<Mesh>(null)
    return (
     <group>
      <mesh ref={refLearn} 
       >
        <Text children={"Learning Path"}  anchorY="bottom" position={[0, -1, 0]} fontSize={0.5}
        font="Tomatoes-O8L8.ttf" rotation={[0,Math.PI/2,0]}
        />
      </mesh>
      <mesh ref={boxJs as MutableRefObject<Mesh>}
      name="boxJs"
      >
      
       <boxGeometry/>
       <Text children={'JS'} 
         rotation={[0,1.57,0]}
         position={[1,0,-0.2]} fontSize={0.5}
       
         />
       <meshBasicMaterial color={'yellow'}/>
      </mesh>
      <mesh ref={boxCss as MutableRefObject<Mesh>} 
       name="boxCss"
       >
        <boxGeometry args={[1,1,1]}/>
        <Text children={'CSS'} 
         rotation={[0,1.57,0]}
         position={[1,0,0]} fontSize={0.5}/>
        <meshBasicMaterial color={'orange'} />
      </mesh>
      <mesh ref={boxHtml as MutableRefObject<Mesh>}
       name="boxHtml"
      >
        <Text children={'HTML'} 
         rotation={[0,1.57,0]}
         position={[1,0,0]} fontSize={0.5}/>
        <boxGeometry args={[1.5,1,1]}/>
        <meshBasicMaterial color={'blue'} />
      </mesh>
      <group name="line" ref={
        Lines
      }>
        <mesh position={[props.position[0]-4,props.position[1]-2,props.position[2]-2]}>
          <cylinderGeometry args={[0.1,0.1,6.18,16]} />
          <meshBasicMaterial color={'grey'}/>
        </mesh>
        <mesh position={[props.position[0]-4,props.position[1]-1,props.position[2]+2]} 
        rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.1,0.1,2,16]} />
          <meshBasicMaterial color={'grey'}/>
        </mesh>
        <mesh position={[props.position[0]-4, props.position[1]-0.3, props.position[2]+1]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} /> 
          <meshBasicMaterial color={'grey'} />
        </mesh>
        <mesh position={[props.position[0]-4, props.position[1], props.position[2]-0.5]}
        rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 2.8, 16]} /> 
          <meshBasicMaterial color={'grey'} />
        </mesh>
        <mesh position={[props.position[0]-4,props.position[1],props.position[2]+3]} 
        rotation={[0,0,0]}>
          <cylinderGeometry args={[0.1,0.1,2.2,16]} />
          
          <meshBasicMaterial color={'grey'}/>
        </mesh>
        <mesh position={[props.position[0]-4,props.position[1]+1,props.position[2]+0.5]} 
        rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.1,0.1,5,16]}  />
          <meshBasicMaterial color={'grey'}/>
        </mesh>
      </group>
     
         <mesh ref={layer as MutableRefObject<Mesh>}>
         <Text children={'Hello World'} 
         ref={textRef}
         rotation={[0,Math.PI/2,0]}
         position={[0.6,0,0]} fontSize={0.5}/>
           
          <boxGeometry args={[1,2.7,5]}/>
          <meshStandardMaterial color={'blue'}/>
         </mesh>
 
      {/* <group  position={[props.position[0]-4,props.position[1],props.position[2]]}
        name="movingA"  ref={movingBox as MutableRefObject<THREE.Group>}>
         <mesh name="box1"  >
           <boxGeometry args={[0.5,0.5,0.5]}/>
           <meshBasicMaterial color={'white'}/>
         </mesh>
      </group> */}
      
      <mesh ref={movingBox2 as MutableRefObject<Mesh>}
       name="runningBox"
     >
        <sphereGeometry args={[0.3]}/>
        <meshBasicMaterial color={'red'}/>
      </mesh>
    
     
      
      
     </group>
     
    
    )
}


export default LearningPath