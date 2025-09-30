import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './pages/Navbar'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import { useSelector } from 'react-redux'


function App() {
 let {userData} = useSelector(state=> state.auth)

  return (
    <div>
      
      <Routes>
        <Route path='/' element={userData ? <Home/> : <Login/>}/>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/login' element={ userData ? <Home/> : <Login/>} />
        <Route path='/dashboard' element={<DashBoard/>} />
      </Routes>
   </div>
  )
}

export default App
