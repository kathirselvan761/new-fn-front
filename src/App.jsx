import React, { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'

// Layout
import Header from './components/Header'
import Footer from './components/Footer'

// Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import OtpScreen from './screens/Otpscreen.jsx'
import OrderDetailScreen from './screens/OrderDetailScreen.jsx'


// Admin Screens
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import AdminDashboardScreen from './screens/AdminDashboardScreen'
import DailyReportScreen from './screens/DailyReportScreen'
import MonthlyReportScreen from './screens/MonthlyReportScreen'
import StockListScreen from './screens/StockListScreen'

// Custom Components
import AdminRoute from './components/adminroute'

import GlitterStars from './components/animations/GlitterStars'


const AppContent = () => {
 
  const [darkMode] = useState(false)
  const headerRef = useRef() // Header Ref

 

  // Dark mode body class - unchanged behaviour
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  // Scroll Event to Close Navbar (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && typeof headerRef.current.closeMenu === 'function') {
        headerRef.current.closeMenu()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <>
      <GlitterStars />
      <Header ref={headerRef} /> {/* Header with ref */}
      <main className='app-main'>
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/changepassword' element={<ChangePasswordScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/orderhistory' element={<OrderHistoryScreen />} />
            <Route path='/otp' element={<OtpScreen />} />
            <Route path="/order/:id" element={<OrderDetailScreen />} />

            {/* Admin Protected Routes */}
            <Route element={<AdminRoute />}>
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route path='/admin/productlist' element={<ProductListScreen />} />
              <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
              <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route path='/admin/dashboard' element={<AdminDashboardScreen />} />
              <Route path='/admin/reports' element={<Navigate to='/admin/reports/daily' replace />} />
              <Route path='/admin/reports/daily' element={<DailyReportScreen />} />
              <Route path='/admin/reports/monthly' element={<MonthlyReportScreen />} />
              <Route path="/admin/stocklist" element={<StockListScreen />} />

            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  )
}

const App = () => {
  // Top-level just mounts Router and the in-router content
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
