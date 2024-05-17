import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './ThreeComponent/Main';
import JoyStick from './ThreeComponent/three/JoyStick';


function App() {
  return (
    <div style={{ minHeight: "100vh", minWidth: "100%", position: "relative" }}>
    <Suspense fallback={<div>Loading...</div>}>
      
        <Main/>
        <JoyStick/>
      </Suspense>
    </div>
  );
}

export default App;
