import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCustomer } from '../context/CustomerContext'
import './AccountPage.css'

export default function AccountPage() {
  const { customer, isLoggedIn, isLoading, logout } = useCustomer()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) navigate('/login', { replace: true })
  }, [isLoading, isLoggedIn, navigate])

  if (isLoading || !customer) {
    return <main className="page account-page"><div className="account-loading"><div className="account-spinner"/><p>Loading your account…</p></div></main>
  }

  const orders = customer.orders?.edges?.map(e => e.node) || []

  return (
    <main className="page account-page" id="main-content">
      <div className="account-container">
        <div className="container">
          {/* Header */}
          <div className="account-header">
            <div className="account-avatar">{(customer.firstName?.[0] || customer.email?.[0] || '?').toUpperCase()}</div>
            <div>
              <h1 className="display-md account-name">
                {customer.firstName ? `${customer.firstName} ${customer.lastName || ''}` : 'My Account'}
              </h1>
              <p className="account-email">{customer.email}</p>
            </div>
            <button className="btn-outline account-logout" onClick={logout}>Logout</button>
          </div>

          {/* Orders */}
          <section className="account-section">
            <h2 className="account-section-title">Order History</h2>
            {orders.length === 0 ? (
              <div className="account-empty">

                <p>No orders yet — time to treat yourself!</p>
                <Link to="/menu" className="btn-primary">Browse Menu</Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-top">
                      <span className="order-name">{order.name}</span>
                      <span className="order-date">{new Date(order.processedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="order-bottom">
                      <span className="order-total">₹{parseFloat(order.totalPrice?.amount || 0).toLocaleString('en-IN')}</span>
                      <span className={`order-status ${(order.fulfillments?.nodes?.[0]?.status || 'pending').toLowerCase()}`}>
                        {order.fulfillments?.nodes?.[0]?.status || 'Processing'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <footer className="footer"><div className="container"><img src="/Logo.png" alt="Oven'ly" className="footer-logo"/><p className="footer-copy">© 2026 Oven'ly</p></div></footer>
    </main>
  )
}
