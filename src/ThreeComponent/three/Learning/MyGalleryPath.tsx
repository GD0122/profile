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
import { ObjectLoader } from "three"
import { fadeIn,fadeOut } from "./efect/efect"
import { Imagess } from "./galeri"
import { Musik } from "./galeri"
// }
const MyGallery = (props:any)=>{
  const [ref] = useBox(()=>(
    {
      type:'Static',
        ...props,
    }
  ),)



  



  const textureLoader = new THREE.TextureLoader();
 



  const refGallery = ref as MutableRefObject<Mesh>
  const test = useRef<Mesh>(null)
 




 const gallery = useRef<THREE.Group>(null)

 const createGalleryMesh = async()=>{
  const textures = await Promise.all(Imagess.map(async (imgs: any) => {
    return textureLoader.load(imgs?.path[0])
  }));
  const depthTexture = await Promise.all(Imagess.map(async(imgs:any)=>{
    return textureLoader.load(imgs?.path[1])
  }))
  
Imagess.forEach(async (imgs: any, i: number) => {
 

const customMaterial = new THREE.MeshStandardMaterial({
    map: textures[i],
    displacementMap: depthTexture[i],
    displacementScale: -0.1,
    displacementBias: -0.01,
    transparent:true
});

customMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.fillColor = { value: new THREE.Color(0xffffff) };

  shader.vertexShader = `
    varying vec2 vUv;
    ${shader.vertexShader}
  `.replace(
    `#include <uv_vertex>`,
    `#include <uv_vertex>
     vUv = uv;`
  );

  shader.fragmentShader = `
    uniform sampler2D map;
    uniform vec3 fillColor;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(map, vUv);
      if (color.a < 0.5) {
        color = vec4(fillColor, 1.0);
      }
      gl_FragColor = color;
    }
  `;
};

const materials = [
    new THREE.MeshStandardMaterial(), // Right
    new THREE.MeshStandardMaterial(), // Left
    new THREE.MeshStandardMaterial(), // Top
    new THREE.MeshStandardMaterial(), // Bottom
    customMaterial, // Front with custom shader
    new THREE.MeshStandardMaterial()  // Back
];

    const geo = new THREE.BoxGeometry(1,2,0.1,200,200,1);
    const mesh = new THREE.Mesh(geo, materials);
    
    // Mengatur posisi gambar
    if (gallery.current) {
        const offsetX = i % 2 === 0 ? props.position[0] + i + 2 : props.position[0] - i - 1.5;
        mesh.position.set(offsetX, 1, -4.5);
        gallery.current.add(mesh)
    }
    

});

 }


const musiks = useRef<THREE.Group>(null)
 const createMusik = async()=>{
  const textures = await Promise.all(Musik.map(async (imgs: any) => {
    return textureLoader.load(imgs?.path)
  }));
  const material = new THREE.MeshStandardMaterial({map:textures[0],transparent:true,})
  const geo = new THREE.PlaneGeometry(5,5,120,120)
  const mesh = new THREE.Mesh(geo,material)

  if(musiks.current){
    musiks.current.add(mesh)
  }
  
 }
 useEffect(()=>{
  createGalleryMesh()
  createMusik()
},[Imagess])
  return(
    <group >
      <mesh ref={refGallery} >
        <Text children={"Galeri"}  anchorY="bottom" position={[0, -1, 0]} fontSize={1}
        font="Tomatoes-O8L8.ttf"
        />
      </mesh>

      <group ref={gallery} position={[props.position[0]+0.2,props.position[1]-3,props.position[2]+0.1]}>
        
      </group>
      <group ref={musiks} position={[props.position[0]-15,props.position[1],props.position[2]-4.1]}>

      </group>
    </group>
  
  )
}

export default MyGallery