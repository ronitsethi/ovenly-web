import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCustomer } from '../context/CustomerContext'
import './LoginPage.css'

export default function LoginPage() {
  const { login, isLoggedIn, isLoading, handleCallback } = useCustomer()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate('/account', { replace: true })
  }, [isLoggedIn, navigate])

  // Handle OAuth callback
  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    if (code && state) {
      handleCallback(code, state).then(() => navigate('/account', { replace: true })).catch(console.error)
    }
  }, [searchParams, handleCallback, navigate])

  if (isLoading) {
    return (
      <main className="page login-page">
        <div className="login-loading"><div className="login-spinner" /><p>Loading…</p></div>
      </main>
    )
  }

  return (
    <main className="page login-page" id="main-content">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src="/Logo.png" alt="Oven'ly" className="login-logo" />
            <h1 className="display-md login-title">Welcome to Oven'ly</h1>
            <p className="login-sub">Sign in to track orders, save favourites, and reorder your favourite treats.</p>
          </div>
          <button className="btn-primary login-shopify-btn" onClick={login} id="login-btn">
            Sign in with Shopify
          </button>
          <p className="login-note">
            You'll be redirected to Shopify's secure login page.
            <br />New customers can create an account there too.
          </p>
          <div className="login-divider"><span>or</span></div>
          <a href="tel:+919140223957" className="btn-outline login-call-btn">
            Call us to order
          </a>
        </div>
      </div>
      <footer className="footer"><div className="container"><img src="/Logo.png" alt="Oven'ly" className="footer-logo"/><p className="footer-copy">© 2026 Oven'ly</p></div></footer>
    </main>
  )
}
