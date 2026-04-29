import { useCart } from '../context/CartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    isLoading,
    updateQuantity,
    removeItem,
    checkout,
    totalQuantity,
  } = useCart()

  const lines = cart?.lines || []
  const subtotal = cart?.cost?.subtotalAmount
  const total = cart?.cost?.totalAmount

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop${isCartOpen ? ' open' : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${isCartOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
      >
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">

            Your Cart
            {totalQuantity > 0 && (
              <span className="cart-count-badge">{totalQuantity}</span>
            )}
          </h2>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {lines.length === 0 ? (
            <div className="cart-empty">

              <p className="cart-empty-title">Your cart is empty</p>
              <p className="cart-empty-sub">
                Add some delicious treats from our menu!
              </p>
              <button
                className="btn-primary cart-empty-btn"
                onClick={() => setIsCartOpen(false)}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="cart-items">
              {lines.map(line => (
                <li key={line.id} className="cart-item">
                  <div className="cart-item-info">
                    <p className="cart-item-name">{line.productTitle}</p>
                    {line.variantTitle !== 'Default Title' && (
                      <p className="cart-item-variant">{line.variantTitle}</p>
                    )}
                    <p className="cart-item-price">
                      ₹{parseFloat(line.price?.amount || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-qty-controls">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        disabled={isLoading}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-qty-value">{line.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      aria-label={`Remove ${line.productTitle}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only show if items exist */}
        {lines.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              {subtotal && (
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>₹{parseFloat(subtotal.amount).toLocaleString('en-IN')}</span>
                </div>
              )}
              {total && (
                <div className="cart-total-row cart-total-final">
                  <span>Total</span>
                  <span>₹{parseFloat(total.amount).toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
            <p className="cart-note">Shipping & taxes calculated at checkout</p>
            <button
              className="btn-primary cart-checkout-btn"
              onClick={checkout}
              disabled={isLoading}
            >
              {isLoading ? 'Processing…' : 'Checkout'}
            </button>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="cart-loading">
            <div className="cart-spinner" />
          </div>
        )}
      </aside>
    </>
  )
}
