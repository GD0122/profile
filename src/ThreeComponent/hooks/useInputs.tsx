import { JoystickManager } from 'nipplejs';
import React, { useEffect, useState } from 'react';
import nipplejs, { JoystickManager as Manager, JoystickManagerOptions } from "nipplejs";
type MoveActions = {
    moveForward: boolean;
    moveBackward: boolean;
    moveLeft: boolean;
    moveRight: boolean;
    jump: boolean;
    enter: boolean;
    shift: boolean;
};

const actionBykey = (key: keyof typeof keys): keyof MoveActions | undefined => {
    const keys:{ [key: string]: keyof MoveActions } = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyD: 'moveRight',
        KeyA: 'moveLeft',
        Space: 'jump',
        Enter: 'enter',
        ShiftLeft: 'shift',
    };
    return keys[key];
};

export default function useInput() {
   const [move, setMove] = useState<MoveActions>({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        enter: false,
        shift: false,
    });

    useEffect(() => {
        let joyManager: Manager | null = null;
        let shiftTimeout: NodeJS.Timeout | null = null;
        const joystickWrapper = document.getElementById("joystickWrapper1");

        if (joystickWrapper) {
            const options: JoystickManagerOptions = {
                zone: joystickWrapper,
                size: 120,
                multitouch: true,
                maxNumberOfNipples: 2,
                mode: "static",
                restJoystick: true,
                shape: "circle",
                position: { top: "50px", left: "50px" },
                dynamicPage: true,
            };

            joyManager = nipplejs.create(options);
            joyManager.on("start", () => {
            shiftTimeout = setTimeout(() => {
                    setMove((state)=>({...state,shift:true})) // Aktifkan shift setelah 3 detik
                }, 2000); 
            const doc = document.getElementById("joystickWrapper1")
            if(doc) {
                doc.style.opacity = "0.7"
            }
            });
            const handleMove = (evt: any, data: any) => {
           
                const angleInDegrees = data.angle.degree;

                // Tentukan arah gerakan berdasarkan sudut
                if(angleInDegrees >= 0 && angleInDegrees <= 10){
                    setMove((state) => ({ ...state, moveForward: false, moveBackward: false, moveLeft: false, moveRight: true}));
                }else if(angleInDegrees >=10 && angleInDegrees <= 45){
                    setMove((state) => ({ ...state, moveForward: true, moveBackward: false, moveLeft: false, moveRight: true}));
                }else if(angleInDegrees >=45 && angleInDegrees <= 110 ){
               
                   setMove((state) => ({ ...state, moveForward: true, moveBackward: false, moveLeft: false, moveRight: false}));
                }else if(angleInDegrees >=110 && angleInDegrees <= 150){
           
                    setMove((state) => ({ ...state, moveForward: true, moveBackward: false, moveLeft: true, moveRight: false}));
                }else if(angleInDegrees >=150 && angleInDegrees <= 200){
              
                    setMove((state) => ({ ...state, moveForward: false, moveBackward: false, moveLeft: true, moveRight: false}));
                }else if(angleInDegrees >=200 && angleInDegrees <= 230 ){
                   
                    setMove((state) => ({ ...state, moveForward: false, moveBackward: true, moveLeft: true, moveRight: false}));
                }else if(angleInDegrees >= 230 && angleInDegrees <= 310){
          
                    setMove((state) => ({ ...state, moveForward: false, moveBackward: true, moveLeft: false, moveRight: false}));
                }else if(angleInDegrees >= 310 && angleInDegrees <= 340){
                    setMove((state) => ({ ...state, moveForward: false, moveBackward: true, moveLeft: false, moveRight: true}));
                }else if(angleInDegrees >= 340){
                    setMove((state) => ({ ...state, moveForward: false, moveBackward: false, moveLeft: false, moveRight: true}));
                }else{
                    setMove((state) => ({ ...state, moveForward: false, moveBackward: false, moveLeft: false, moveRight: false}));
                }
           
                    // if (forward > 0 && turn > 0) {
                    //     setMove((state) => ({ ...state, moveForward: true, moveBackward: false, moveLeft: false, moveRight: true }));
                    // }else if (forward > 0 && turn < 0) {
                    //     setMove((state) => ({ ...state, moveForward: true, moveBackward: false, moveLeft: true, moveRight: false }));
                    
                    // }else if(forward < 0 && turn > 0){
                    //     setMove((state) => ({ ...state, moveForward: false, moveBackward: true, moveLeft: false, moveRight: true }));
                    // }else if(forward< 0 && turn < 0){
                    //     setMove((state) => ({ ...state, moveForward: false, moveBackward: true, moveLeft: true, moveRight: false }));
                    // }
                    // else{
                    //     setMove((state) => ({ ...state, moveForward: false, moveBackward: false ,moveLeft: false, moveRight: false}));
                    // }
                   
                
             

                // if (turn > 0) {
                //     setMove((state) => ({ ...state, moveLeft: false, moveRight: true,moveBackward:false,moveForward:false }));
                // } else if (turn < 0) {
                //     setMove((state) => ({ ...state, moveLeft: true, moveRight: false,moveBackward:false,moveForward:false }));
                // }
                //  else {
                //     setMove((state) => ({ ...state, moveLeft: false, moveRight: false }));
                // }
                
            };

            const handleEnd = (evt: any) => {
                setMove((state) => ({ ...state, moveForward: false, moveBackward: false, moveLeft: false, moveRight: false,shift:false }));
                if (shiftTimeout !== null) {
                    clearTimeout(shiftTimeout);
                }
                const doc = document.getElementById("joystickWrapper1")
                if(doc) {
                    doc.style.opacity = "0.1"
                }
            };

            joyManager.on("move", handleMove);
            joyManager.on("end", handleEnd);

            // Cleanup function to remove event listeners when component unmounts
            return () => {
                if (joyManager) {
                    joyManager.off("move", handleMove);
                    joyManager.off("end", handleEnd);
                }
            };
        }
    }, [setMove]);

    useEffect(() => {
        
        const handlerDown = (e: KeyboardEvent) => {
            e.preventDefault();
            const action = actionBykey(e.code as 'KeyS' | 'KeyW' | 'KeyD' | 'KeyA' | 'Space' | 'Enter' | 'ShiftLeft');

            if (action) {
                setMove((state) => ({ ...state, [action]: true }));
            }
        };

        const handlerUp = (e: KeyboardEvent) => {
            e.preventDefault();
            const action = actionBykey(e.code as 'KeyS' | 'KeyW' | 'KeyD' | 'KeyA' | 'Space' | 'Enter' | 'ShiftLeft');
            if (action) {
                setMove((state) => ({ ...state, [action]: false }));
            }
        };

        document.addEventListener('keydown', handlerDown);
        document.addEventListener('keyup', handlerUp);
       
        return () => {
            document.removeEventListener('keydown', handlerDown);
            document.removeEventListener('keyup', handlerUp);
        };
    }, []);

    return move;
}

