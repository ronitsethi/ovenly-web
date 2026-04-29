import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCustomer } from '../context/CustomerContext'

/**
 * OAuth callback handler — exchanges authorization code for access token
 */
export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const { handleCallback } = useCustomer()
  const navigate = useNavigate()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    if (code && state) {
      handleCallback(code, state)
        .then(() => navigate('/account', { replace: true }))
        .catch((err) => {
          console.error('Auth callback failed:', err)
          navigate('/login', { replace: true })
        })
    } else {
      navigate('/login', { replace: true })
    }
  }, [searchParams, handleCallback, navigate])

  return (
    <main className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="product-spinner" style={{ margin: '0 auto 1rem', width: 28, height: 28, border: '3px solid #FFCCD4', borderTopColor: '#A51627', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        <p style={{ fontSize: '0.85rem', color: '#8a6a6a' }}>Signing you in…</p>
      </div>
    </main>
  )
}
