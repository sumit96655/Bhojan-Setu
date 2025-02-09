import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/AuthSlice'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import DonorDashboard from './pages/DonorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import VolunteerDashboard from './pages/VolunteerDashboard'
import NGODashboard from './pages/NGODashboard'
import Admin from './pages/Admin'
import LogisticsHub from "./pages/LogisticsHub"

// Layouts
import AdminLayout from './Layouts/AdminLaouts'
import DonorLayout from './Layouts/DonorLayout'
import NGOLayout from './Layouts/NGOLayout'
import VolunteerLayout from './Layouts/VolunteerLayout'
import PublicLayout from './Layouts/PublicLayouts'

export default function App() {
  const user = useSelector((state) => state.Auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateUser())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='dashboard' element={<AdminDashboard />} />
          </Route>

          {/* Donor Routes */}
          <Route path='/donor' element={<DonorLayout />}>
            <Route index element={<DonorDashboard />} />
            <Route path='donations' element={<DonorDashboard />} />
          </Route>

          {/* NGO Routes */}
          <Route path='/ngo' element={<NGOLayout />}>
            <Route index element={<NGODashboard />} />
            <Route path='requests' element={<NGODashboard />} />
            <Route path="logistics" element={<LogisticsHub />} />
          </Route>

          {/* Volunteer Routes */}
          <Route path='/volunteer' element={<VolunteerLayout />}>
            <Route index element={<VolunteerDashboard />} />
            <Route path='deliveries' element={<VolunteerDashboard />} />
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
