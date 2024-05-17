import React from 'react';
import { PointerLockControls,} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { ThreeEvent } from '@react-three/fiber';

export default function FVP() {
    const { camera, gl } = useThree();

    return <PointerLockControls camera={camera} domElement={gl.domElement} />;
}
