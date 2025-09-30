import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../main'
import { setUserData } from '../redux/authSlice'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    let {userData} = useSelector(state=> state.auth)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const handleLogout = async ()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`,
            {withCredentials:true}
        );
            dispatch(setUserData(null))
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link  className="text-2xl font-bold text-white hover:text-yellow-200 transition">
              MyDashboard
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-yellow-200 transition">Home</Link>
            {userData && <Link to="/dashboard" className="text-white hover:text-yellow-200 transition">Dashboard</Link>}
            {!userData ? (
              <>
                <Link to="/login" className="text-white hover:text-yellow-200 transition">Login</Link>
                <Link to="/signup" className="text-white hover:text-yellow-200 transition">Signup</Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar
