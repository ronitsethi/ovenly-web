import { useState, useRef } from 'react'
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
    updateNote,
    updateAttributes,
    checkout,
    totalQuantity,
  } = useCart()

  const [noteOpen, setNoteOpen] = useState(false)
  const [noteValue, setNoteValue] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [phone, setPhone] = useState('')
  const noteInitialized = useRef(false)

  // Minimum pickup date = today
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const handlePickupDateChange = (date) => {
    setPickupDate(date)
    if (date) {
      updateAttributes([{ key: 'Pickup Date', value: date }])
    }
  }

  const handlePhoneChange = (value) => {
    // Allow only digits
    const digits = value.replace(/\D/g, '').slice(0, 10)
    setPhone(digits)
  }

  const handlePhoneBlur = () => {
    if (phone.length === 10) {
      updateAttributes([{ key: 'Phone Number', value: `+91${phone}` }])
    }
  }

  const isPhoneValid = phone.length === 10

  // Sync note from cart on first load
  if (cart?.note && !noteInitialized.current) {
    setNoteValue(cart.note)
    noteInitialized.current = true
  }

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
            {/* Special Instructions */}
            <div className="cart-special-instructions">
              <button
                className="cart-si-toggle"
                onClick={() => setNoteOpen(!noteOpen)}
                aria-expanded={noteOpen}
              >
                <span>Special Instructions</span>
                <span className={`cart-si-chevron${noteOpen ? ' open' : ''}`}>+</span>
              </button>
              {noteOpen && (
                <div className="cart-si-body">
                  <textarea
                    className="cart-si-textarea"
                    placeholder="E.g. message on cake, allergies, delivery notes…"
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                    onBlur={() => updateNote(noteValue)}
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Pickup Date Selector */}
            <div className="cart-pickup-date">
              <label className="cart-pickup-label" htmlFor="pickup-date">
                <span className="cart-pickup-icon">📅</span>
                <span>Pickup Date</span>
              </label>
              <input
                type="date"
                id="pickup-date"
                className="cart-pickup-input"
                value={pickupDate}
                min={getMinDate()}
                onChange={(e) => handlePickupDateChange(e.target.value)}
              />
              {!pickupDate && (
                <p className="cart-pickup-hint">Please select a pickup date</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="cart-pickup-date">
              <label className="cart-pickup-label" htmlFor="cart-phone">
                <span className="cart-pickup-icon">📞</span>
                <span>Phone Number</span>
              </label>
              <div className="cart-phone-wrap">
                <span className="cart-phone-prefix">+91</span>
                <input
                  type="tel"
                  id="cart-phone"
                  className="cart-pickup-input cart-phone-input"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={handlePhoneBlur}
                  inputMode="numeric"
                />
              </div>
              {!isPhoneValid && (
                <p className="cart-pickup-hint">{phone.length === 0 ? 'Phone number is required' : 'Enter a valid 10-digit number'}</p>
              )}
            </div>

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
            <p className="cart-note">Taxes calculated at checkout</p>
            <button
              className="btn-primary cart-checkout-btn"
              onClick={checkout}
              disabled={isLoading || !pickupDate || !isPhoneValid}
            >
              {isLoading ? 'Processing…' : !pickupDate ? 'Select Pickup Date' : !isPhoneValid ? 'Enter Phone Number' : 'Checkout'}
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
