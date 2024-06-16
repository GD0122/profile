import React, { Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './ThreeComponent/Main';
import JoyStick from './ThreeComponent/three/JoyStick';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from 'express';
import ProjectCanvas from './ThreeComponent/three/Learning/ProjectCanvas';
import TestVr from './ThreeComponent/TestVr';
import TestScene from './ThreeComponent/TestScene';



function App() {

  const [dev,setDev] = useState(null);
  function handleOrientation(event : any) {
   setDev(event)
  }
  async function requestDeviceOrientation() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      //iOS 13+ devices
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission()
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation)
        } else {
          alert('Permission was denied')
        }
      } catch (error) {
        alert(error)
      }
    } else if ('DeviceOrientationEvent' in window) {
      //non iOS 13+ devices
      console.log("not iOS");
      window.addEventListener('deviceorientation', handleOrientation)
    } else {
      //not supported
      alert('nicht unterstützt')
    }
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <div style={{ minHeight: "100vh", minWidth: "100%", position: "relative" }}>
          <Suspense fallback={<div>Loading...</div>}>
          <Main/>
          <JoyStick/>
          </Suspense>
      </div>
       }/>
       <Route path='/test' element={<TestVr/>}/>
       <Route path='/tests' element={<TestScene/>}/>
       <Route path='/project/:ids' element={<ProjectCanvas/>}/>
       <Route path='/*' element={
        <div>
          <h1>Not Found</h1>
        </div>
       }/>
    </Routes>

    </BrowserRouter>
  
  );
}


export default App;
