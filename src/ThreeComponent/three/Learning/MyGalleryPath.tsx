import { useBox } from "@react-three/cannon"
import { MutableRefObject, useMemo } from "react"
import { Mesh, NumberKeyframeTrack } from "three"
import TextH from "./Text"
import {useRef,useEffect} from 'react'
import * as THREE from 'three'
import {Text, shaderMaterial} from '@react-three/drei'
import {useFrame, useLoader} from '@react-three/fiber'
import {useState} from 'react'
import { Vector3, Object3D } from 'three';
import { Images } from "./test"
import { ObjectLoader } from "three"
import { fadeIn,fadeOut } from "./efect/efect"

type CollisionEvent = { contact: { bi: { name: string }, bj: { name: string } } };

// function moveObject(object: Object3D, targetPosition: Vector3, duration: number): void {
//     const startPosition = object.position.clone();

//     const startTime = Date.now();

//     function animate(): void {
//         const timeElapsed = Date.now() - startTime;
//         const progress = Math.min(timeElapsed / duration, 1); // Progress animasi, maksimal 1

//         // Interpolasi posisi berdasarkan waktu
//         object.position.lerpVectors(startPosition, targetPosition, progress);

//         if (progress < 1) {
//             // Jika animasi belum selesai, lanjutkan animasi
//             requestAnimationFrame(animate);
//         }
//     }

//     // Mulai animasi
//     animate();
// }
const MyGallery = (props:any)=>{
  const [ref] = useBox(()=>(
    {
      type:'Static',
        ...props,
    }
  ),)


 const [viewBox,] = useBox(()=>({
   type:'Static',
   mass:10,
   position:[props.position[0],-1.49,props.position[2]+4],
   onCollide:(e)=>{
      
         if(e.contact.bi.name ==='user'|| e.contact.bj.name === 'user'){
          wireframeMaterial.color.set('green')
      
         }
        
     
   },
   onCollideEnd:(e)=>{
      wireframeMaterial.color.set('white')
      
      
    
   },
 }))
  // useFrame(()=>{

  // })


  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // warna kawat
    wireframe: true // mengaktifkan mode wireframe
  });
  
  // Bua t box geometry
  const boxGeometry = new THREE.BoxGeometry(1, 2, 1);
  
  // Buat mesh dengan box geometry dan material wireframe
  const boxMesh = new THREE.Mesh(boxGeometry, wireframeMaterial);
  useEffect(() => {
    if (viewBox.current) {
      viewBox.current.add(boxMesh);
    }
  }, [viewBox]);


  const createImagesMesh = async (img: any) => {
    const textureLoader = new THREE.TextureLoader();
    const textures = await Promise.all(img.map(async (imgs: any) => {
        return await textureLoader.load(imgs?.path);
    }));
 
    // Menentukan posisi awal
    img.forEach(async (imgs: any, i: number) => {
  
        const materials = [
            new THREE.MeshBasicMaterial(), // Right
            new THREE.MeshBasicMaterial(), // Left
            new THREE.MeshBasicMaterial(), // Top
            new THREE.MeshBasicMaterial(), // Bottom
            new THREE.MeshBasicMaterial({ map: textures[i], }), // Front
            new THREE.MeshBasicMaterial()  // Back
        ];

        const geo = new THREE.BoxGeometry(1.5, 2, 0.1);
        const mesh = new THREE.Mesh(geo, materials);
        
        // Mengatur posisi gambar
        if (test.current) {
            const offsetX = i % 2 === 0 ? test.current.position.x + i + 2 : test.current.position.x - i - 1.5;
            mesh.position.set(offsetX, 1, -4.5);
        }
        
        if (test3.current) {
            test3.current.add(mesh);
            
        }
    });
}



 useEffect(()=>{
    createImagesMesh(Images)
    
 },[Images])

  const refGallery = ref as MutableRefObject<Mesh>
  const test = useRef<Mesh>(null)
  const test3 = useRef<THREE.Group>(null)







  return(
    <group >
      <mesh ref={refGallery} >
        {/* <TextH text={props?.text || "TEST"} rotationY={props.rotationY}/> */}
        <Text children={"Galeri"}  anchorY="bottom" position={[0, -1, 0]} fontSize={1}
        font="Tomatoes-O8L8.ttf"
        />
      </mesh>
      <mesh ref={viewBox as MutableRefObject<Mesh>} />
      <mesh ref={test}  position={[props.position[0],1,props.position[2]+2]}>
        {/* <boxGeometry args={[1.5,2,0.1]} />
        <meshBasicMaterial color={'white'}/> */}
      </mesh>
    
     <group ref={test3} position={[props.position[0]+0.2,props.position[1]-3,props.position[2]]}>
     
     </group>
      <group>
       
      </group>
    </group>
  
  )
}

export default MyGallery