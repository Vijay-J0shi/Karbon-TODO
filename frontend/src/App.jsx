import React, { useContext } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import { userDataContext } from './Context/UserContext'
import Login  from './pages/Login'
import { Home } from './pages/Home'
import SignUp from './pages/SignUp'
const App = () => {
    let {userData} = useContext(userDataContext)
 
  return (
  <>
 
  <div className="sticky top-0 z-50">
    <Navbar user={userData} />
  </div>

  <div className="box-border min-h-screen w-full overflow-y-hidden overflow-x-hidden flex bg-gray-50 px-4 sm:px-6 md:px-8">
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </div>
</>

  )
}
export default App
