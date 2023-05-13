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
      <Routes>
        <Route path='/' element={<HomeEssence/>}/>
        <Route path='/dashboard' element={<DashboardEssence/>}/>
      </Routes>
     
    </div>
  )
}

export default App
