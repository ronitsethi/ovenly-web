import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import AuthCallback from './pages/AuthCallback'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </>
  )
}

export default App
