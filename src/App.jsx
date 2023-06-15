import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import HomeEssence from './Components/HomeEssence';
import DashboardEssence from './Components/DashboardEssence';

import './App.css'

function App() {
  return (
    <div className='App h-[100vh]'>
      <div className="app2 hidden"><h1>This application is essentially created desktop and laptops. Switch to its initial frame to make it functional</h1></div>
      <Routes>
        <Route path='/' element={<HomeEssence/>}/>
        <Route path='/dashboard' element={<DashboardEssence/>}/>
      </Routes>
     
    </div>
  )
}

export default App
