import { useBox } from "@react-three/cannon"
import { Html, PresentationControls } from "@react-three/drei"
import { MutableRefObject } from "react"
import { Mesh } from "three"
import './video.css'

const VideoView = (props:any) => {
    const [vid] = useBox(()=>({
      mass:1,
       ...props,
    }))
   const redref = vid as MutableRefObject<Mesh>
    return (
        <group>
         
         
          <PresentationControls 
          //  global 
          // polar={[-0.4,0.2]} 
          // azimuth={[-0.4,0.2]}
          >
         
          <Html  wrapperClass="screen"  position={[0,5,-10]} transform rotation-x={0.10}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/TCUVXEC1B44?si=473iYE1f3Nb3P0fE" 
            title="YouTube video player"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // allowFullScreen
            />
          </Html>
          </PresentationControls>
        
        </group>
       
    )
}

export default VideoView