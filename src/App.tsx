import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './ThreeComponent/Main';
import JoyStick from './ThreeComponent/three/JoyStick';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from 'express';
import ProjectCanvas from './ThreeComponent/three/Learning/ProjectCanvas';

function App() {
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
