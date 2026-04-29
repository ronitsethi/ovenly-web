import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'

import MenuPage from './pages/MenuPage'
import ProductPage from './pages/ProductPage'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
