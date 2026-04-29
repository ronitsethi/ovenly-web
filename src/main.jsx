import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { CustomerProvider } from './context/CustomerContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CustomerProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CustomerProvider>
    </BrowserRouter>
  </StrictMode>,
)
