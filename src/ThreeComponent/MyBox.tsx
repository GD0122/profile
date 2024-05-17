

const MyBox = (props:any)=>{
    return(
        <mesh {...props}>
            <boxGeometry args={[1,1,1]}/>
            <meshBasicMaterial color={'red'}/>
        </mesh>
    )
}

export default MyBox;

