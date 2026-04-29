/**
 * Customer Context — manages auth state via Shopify Customer Account API (OAuth PKCE flow).
 * For a client-side Vite app, this uses the authorization code flow with PKCE.
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CustomerContext = createContext(null)

const CLIENT_ID = import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID
const AUTH_URL = import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_URL
const REDIRECT_URI = `${window.location.origin}/auth/callback`

// PKCE helpers
function generateRandomString(length = 64) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('').slice(0, length)
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved token on mount
  useEffect(() => {
    const token = localStorage.getItem('ovenly_customer_token')
    if (token) {
      setAccessToken(token)
      fetchCustomerInfo(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchCustomerInfo = async (token) => {
    try {
      const res = await fetch(`${AUTH_URL}/account/customer/api/2026-04/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            query {
              customer {
                id
                firstName
                lastName
                email
                orders(first: 10) {
                  edges {
                    node {
                      id
                      name
                      processedAt
                      totalPrice { amount currencyCode }
                      fulfillments(first: 1) {
                        nodes {
                          status
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      })
      const data = await res.json()
      if (data?.data?.customer) {
        setCustomer(data.data.customer)
      }
    } catch (err) {
      console.error('Failed to fetch customer:', err)
      localStorage.removeItem('ovenly_customer_token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = useCallback(async () => {
    const state = generateRandomString(32)
    const codeVerifier = generateRandomString(64)
    const codeChallenge = await generateCodeChallenge(codeVerifier)

    // Save PKCE verifier and state for callback
    sessionStorage.setItem('ovenly_pkce_verifier', codeVerifier)
    sessionStorage.setItem('ovenly_oauth_state', state)

    const authorizationUrl = new URL(`${AUTH_URL}/oauth/authorize`)
    authorizationUrl.searchParams.set('client_id', CLIENT_ID)
    authorizationUrl.searchParams.set('response_type', 'code')
    authorizationUrl.searchParams.set('redirect_uri', REDIRECT_URI)
    authorizationUrl.searchParams.set('scope', 'openid email customer-account-api:full')
    authorizationUrl.searchParams.set('state', state)
    authorizationUrl.searchParams.set('code_challenge', codeChallenge)
    authorizationUrl.searchParams.set('code_challenge_method', 'S256')

    window.location.href = authorizationUrl.toString()
  }, [])

  const handleCallback = useCallback(async (code, state) => {
    const savedState = sessionStorage.getItem('ovenly_oauth_state')
    const codeVerifier = sessionStorage.getItem('ovenly_pkce_verifier')

    if (state !== savedState) {
      throw new Error('OAuth state mismatch')
    }

    try {
      const tokenRes = await fetch(`${AUTH_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          code,
          code_verifier: codeVerifier,
        }),
      })

      const tokenData = await tokenRes.json()
      if (tokenData.access_token) {
        localStorage.setItem('ovenly_customer_token', tokenData.access_token)
        setAccessToken(tokenData.access_token)
        await fetchCustomerInfo(tokenData.access_token)
      }
    } finally {
      sessionStorage.removeItem('ovenly_pkce_verifier')
      sessionStorage.removeItem('ovenly_oauth_state')
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ovenly_customer_token')
    setCustomer(null)
    setAccessToken(null)
    // Optionally redirect to Shopify logout
    window.location.href = `${AUTH_URL}/logout?id_token_hint=${accessToken}&post_logout_redirect_uri=${window.location.origin}`
  }, [accessToken])

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoggedIn: !!customer,
        isLoading,
        login,
        logout,
        handleCallback,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  const ctx = useContext(CustomerContext)
  if (!ctx) throw new Error('useCustomer must be used within a CustomerProvider')
  return ctx
}
